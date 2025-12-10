/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {POLLING_INTERVAL, SHARED_WORKER_MESSAGE_TYPES, type Region} from './constants'

// 연결된 탭의 port 보관 (WeakRef 사용으로 메모리 누수 방지)
const ports = new Set<WeakRef<MessagePort>>()

// 구독한 종목 코드 보관
const stockCodes: Record<Region, Set<string>> = {
    domestic: new Set(),
    worldstock: new Set(),
}

// 가비지 컬렉션된 포트 정리 함수
function cleanupDeadPorts() {
    const deadPorts: WeakRef<MessagePort>[] = []

    ports.forEach((portRef) => {
        const port = portRef.deref()
        if (!port) {
            deadPorts.push(portRef)
        }
    })

    deadPorts.forEach((deadPort) => {
        ports.delete(deadPort)
    })

    if (deadPorts.length > 0) {
        console.log(`[SharedWorker] Cleaned up ${deadPorts.length} dead port(s)`)
    }
}

async function getRealTimeStockData(region: Region) {
    const codes = Array.from(stockCodes[region])
    if (codes.length === 0) {
        return
    }

    try {
        const res = await fetch(`/m-stock/realTime/stock?type=${region}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reutersCodes: codes,
            }),
        })

        if (!res.ok) {
            console.error('[SharedWorker] fetch failed:', region, res.status, res.statusText)
            return
        }

        const data = await res.json()

        // 가비지 컬렉션된 포트 정리
        cleanupDeadPorts()

        ports.forEach((portRef) => {
            const port = portRef.deref()
            if (port) {
                try {
                    port.postMessage({
                        type: SHARED_WORKER_MESSAGE_TYPES.REALTIME_STOCK_DATA_UPDATE,
                        region,
                        payload: data,
                    })
                } catch (e) {
                    console.error('[SharedWorker] Failed to post message to port:', e)
                }
            }
        })
    } catch (e) {
        console.error('[SharedWorker] fetch error:', region, e)
    }
}

// 실시간 데이터 폴링
setInterval(() => {
    getRealTimeStockData('domestic')
    getRealTimeStockData('worldstock')
}, POLLING_INTERVAL)

onconnect = (event: MessageEvent) => {
    const port = event.ports[0]

    const portRef = new WeakRef(port)
    ports.add(portRef)

    port.onmessage = (e: MessageEvent) => {
        const msg = e.data

        if (msg.type === SHARED_WORKER_MESSAGE_TYPES.SUBSCRIBE_STOCK_CODE) {
            const {region, codes} = msg
            codes.forEach((code: string) => stockCodes[region as Region].add(code))
        } else if (msg.type === SHARED_WORKER_MESSAGE_TYPES.UNSUBSCRIBE_STOCK_CODE) {
            const {region, codes} = msg
            codes.forEach((code: string) => stockCodes[region as Region].delete(code))
        }
    }

    port.start()

    console.log(`[SharedWorker] New port connected. Total ports: ${ports.size}`)
}
