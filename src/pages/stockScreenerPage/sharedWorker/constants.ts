import type {GetRealTimeStockResponse} from '@/pages/stockScreenerPage/types/api'

export const SHARED_WORKER_MESSAGE_TYPES = {
    SUBSCRIBE_STOCK_CODE: 'SUBSCRIBE_STOCK_CODE',
    UNSUBSCRIBE_STOCK_CODE: 'UNSUBSCRIBE_STOCK_CODE',
    REALTIME_STOCK_DATA_UPDATE: 'REALTIME_STOCK_DATA_UPDATE',
} as const

export type SharedWorkerMessageType = (typeof SHARED_WORKER_MESSAGE_TYPES)[keyof typeof SHARED_WORKER_MESSAGE_TYPES]

export type Region = 'domestic' | 'worldstock'

export interface SubscribeStockCodeMessage {
    type: typeof SHARED_WORKER_MESSAGE_TYPES.SUBSCRIBE_STOCK_CODE
    region: Region
    codes: string[]
}

export interface UnsubscribeStockCodeMessage {
    type: typeof SHARED_WORKER_MESSAGE_TYPES.UNSUBSCRIBE_STOCK_CODE
    region: Region
    codes: string[]
}

export interface RealtimeStockDataUpdateMessage {
    type: typeof SHARED_WORKER_MESSAGE_TYPES.REALTIME_STOCK_DATA_UPDATE
    region: Region
    payload: GetRealTimeStockResponse
}

export type SharedWorkerMessage =
    | SubscribeStockCodeMessage
    | UnsubscribeStockCodeMessage
    | RealtimeStockDataUpdateMessage

// 폴링 간격 상수
export const DEFAULT_POLLING_INTERVAL = 7000
