export interface Stock {
    stockType: 'domestic' | 'overseas'
    stockEndType: string
    itemCode: string
    stockName: string
    closePrice: string
    compareToPreviousClosePrice: string
    fluctuationsRatio: string
    compareToPreviousPrice: {name: 'RISING' | 'FALLING' | 'UNCHANGED'}
    accumulatedTradingVolume: string
    accumulatedTradingValue: string
    marketValue: string
    marketValueHangeul: string
    currencyType: {
        code: string
        name: string
    }
    stockExchangeName: string
    logoUrl?: string
}

export type SortType =
    | 'marketValue'
    | 'up'
    | 'down'
    | 'quantTop'
    | 'priceTop'
    | 'searchTop'
    | 'newStock'
    | 'management'
    | 'high52week'
    | 'low52week'
    | 'dividend'
    | 'etf'
    | 'etn'
    | 'konex'

export type Category = 'all' | 'KOSPI' | 'KOSDAQ'

export interface GetDomesticStockListRequest {
    sortType: SortType
    category?: Category
    page?: number
    pageSize?: number
    domesticStockExchangeType?: 'KRX' | 'NXT'
}

export interface GetDomesticStockListResponse {
    isSuccess: boolean
    result: {
        stocks: Stock[]
        page: number
        pageSize: number
        totalCount: number
        stockListSortType: string
    }
}

// 해외 주식 거래소 타입
export type OverseasStockExchangeType =
    | 'NASDAQ'
    | 'NYSE'
    | 'AMEX'
    | 'TOKYO'
    | 'HONG_KONG'
    | 'SHANGHAI'
    | 'SHENZHEN'
    | 'HOCHIMINH'
    | 'HANOI'

// 해외 주식 정렬 타입
export type OverseasSortType = 'marketValue' | 'up' | 'down' | 'top' | 'priceTop'

// 해외 주식 응답 타입
export interface OverseasStock {
    stockType: 'worldstock'
    stockEndType: string
    reutersCode: string
    symbolCode: string
    stockName: string
    stockNameEng: string
    closePrice: string
    compareToPreviousClosePrice: string
    fluctuationsRatio: string
    compareToPreviousPrice: {name: 'RISING' | 'FALLING' | 'UNCHANGED'}
    accumulatedTradingVolume: string
    accumulatedTradingValue: string
    marketValue: string
    marketValueKrwHangeul: string
    currencyType: {
        code: string
        name: string
    }
    stockExchangeType: {
        name: OverseasStockExchangeType
    }
    nationType: string
    dividend: string
    logoUrl?: string
}

// 해외 주식 리스트 요청 타입
export interface GetOverseasStockListRequest {
    stockExchangeType: OverseasStockExchangeType
    sortType: OverseasSortType
    page?: number
    pageSize?: number
}

// 해외 주식 리스트 원본 API 응답 타입
export interface OverseasStockListApiResponse {
    stocks: OverseasStock[]
    page: number
    pageSize: number
    totalCount: number
    stockListSortType: string
}

// 해외 주식 리스트 응답 타입 (변환된 Stock[] 반환)
export interface GetOverseasStockListResponse {
    stocks: Stock[]
    page: number
    pageSize: number
    totalCount: number
    stockListSortType: string
}
