import {useEffect} from 'react'

import {initSharedWorker} from './client'
import {SHARED_WORKER_MESSAGE_TYPES, type Region} from './constants'

interface UseRealtimeSubscriptionParams {
    region: Region
    codes: string[]
}

// 실시간 시세 추적할 종목 코드 구독 관리 커스텀훅
export function useRealtimeStockSubscription({region, codes}: UseRealtimeSubscriptionParams) {
    useEffect(() => {
        const port = initSharedWorker()

        if (!codes.length) {
            return
        }

        const message = {
            type: SHARED_WORKER_MESSAGE_TYPES.SUBSCRIBE_STOCK_CODE,
            region,
            codes,
        }

        port.postMessage(message)

        return () => {
            const unsubscribeMessage = {
                type: SHARED_WORKER_MESSAGE_TYPES.UNSUBSCRIBE_STOCK_CODE,
                region,
                codes,
            }
            port.postMessage(unsubscribeMessage)
        }
    }, [region, codes])
}
