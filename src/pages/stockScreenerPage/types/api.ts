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
