/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {POLLING_INTERVAL, SHARED_WORKER_MESSAGE_TYPES, type Region} from './constants'

// 연결된 탭의 port 보관
const ports: MessagePort[] = []

// 구독한 종목 코드 보관
const stockCodes: Record<Region, Set<string>> = {
    domestic: new Set(),
    worldstock: new Set(),
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

        ports.forEach((port) => {
            port.postMessage({
                type: SHARED_WORKER_MESSAGE_TYPES.REALTIME_STOCK_DATA_UPDATE,
                region,
                payload: data,
            })
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
    ports.push(port)

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
