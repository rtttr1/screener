export type StockType = 'domestic' | 'overseas'

export type StockEndType = 'stock' | 'etf' | string

export type PriceChangeStatus = 'RISING' | 'FALLING' | 'UNCHANGED'

export interface CurrencyType {
    code: string
    name: string
}

export interface CompareToPreviousPrice {
    name: PriceChangeStatus
}

export interface Stock {
    stockType: StockType
    stockEndType: StockEndType
    itemCode: string
    stockName: string
    closePrice: string
    compareToPreviousClosePrice: string
    fluctuationsRatio: string
    compareToPreviousPrice: CompareToPreviousPrice
    accumulatedTradingVolume: string
    accumulatedTradingValue: string
    marketValue: string
    marketValueHangeul: string
    currencyType: CurrencyType
    stockExchangeName: string
    logoUrl?: string
}
