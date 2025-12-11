/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {DEFAULT_POLLING_INTERVAL, SHARED_WORKER_MESSAGE_TYPES, type Region} from './constants'

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
}

async function getRealTimeStockData(region: Region): Promise<number | null> {
    const codes = Array.from(stockCodes[region])
    if (codes.length === 0) {
        return null
    }

    // 가비지 컬렉션된 포트 정리
    cleanupDeadPorts()

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
            return null
        }

        const data = await res.json()

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

        return data?.result?.pollingInterval ?? null
    } catch {
        return null
    }
}

// setTimeout 기반 polling
const pollingTimers: Record<Region, ReturnType<typeof setTimeout> | null> = {
    domestic: null,
    worldstock: null,
}

function startPolling(region: Region, initialInterval) {
    // 기존 타이머가 있으면 정리
    if (pollingTimers[region]) {
        clearTimeout(pollingTimers[region])
    }

    pollingTimers[region] = setTimeout(async () => {
        const pollingInterval = await getRealTimeStockData(region)

        // 다음 polling 예약
        startPolling(region, pollingInterval || initialInterval)
    }, initialInterval)
}

onconnect = (event: MessageEvent) => {
    const port = event.ports[0]

    const portRef = new WeakRef(port)
    ports.add(portRef)

    // 첫 연결 시 각 region별로 폴링 시작
    if (ports.size === 1) {
        startPolling('domestic', DEFAULT_POLLING_INTERVAL)
        startPolling('worldstock', DEFAULT_POLLING_INTERVAL)
    }

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
}
