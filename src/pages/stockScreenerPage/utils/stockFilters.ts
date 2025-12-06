import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {getSafeNumberFromString} from '@/common/utils/number'
import {PRICE_CHANGE, type PriceChangeType} from '@/pages/stockScreenerPage/constants/priceChange'
import {PRICE_CHANGE_RATE, type PriceChangeRateType} from '@/pages/stockScreenerPage/constants/priceChangeRate'

export interface StockFilters {
    priceChange: PriceChangeType[]
    priceChangeRate: PriceChangeRateType | null
}

export const filterStocks = (stocks: Stock[], filters: StockFilters): Stock[] => {
    let filtered = stocks

    if (filters.priceChange.length > 0) {
        filtered = filtered.filter((stock) => matchesPriceChangeFilter(stock, filters.priceChange))
    }

    if (filters.priceChangeRate !== null) {
        filtered = filtered.filter((stock) =>
            matchesPriceChangeRateFilter(stock, filters.priceChangeRate as PriceChangeRateType),
        )
    }

    return filtered
}

function matchesPriceChangeFilter(stock: Stock, conditions: PriceChangeType[]): boolean {
    const ratio = getSafeNumberFromString(stock.fluctuationsRatio)

    return conditions.some((condition) => {
        switch (condition) {
            case PRICE_CHANGE.UPPER_LIMIT:
                return ratio !== null && ratio >= 30
            case PRICE_CHANGE.RISING:
                return stock.compareToPreviousPrice.name === PRICE_CHANGE.RISING
            case PRICE_CHANGE.UNCHANGED:
                return stock.compareToPreviousPrice.name === PRICE_CHANGE.UNCHANGED
            case PRICE_CHANGE.FALLING:
                return stock.compareToPreviousPrice.name === PRICE_CHANGE.FALLING
            case PRICE_CHANGE.LOWER_LIMIT:
                return ratio !== null && ratio <= -30
            default:
                return false
        }
    })
}

function matchesPriceChangeRateFilter(stock: Stock, condition: PriceChangeRateType): boolean {
    const ratio = getSafeNumberFromString(stock.fluctuationsRatio)
    if (ratio === null) {
        return false
    }

    switch (condition) {
        case PRICE_CHANGE_RATE.MINUS_30_TO_MINUS_15:
            return ratio >= -30 && ratio < -15
        case PRICE_CHANGE_RATE.MINUS_15_TO_ZERO:
            return ratio >= -15 && ratio < 0
        case PRICE_CHANGE_RATE.ZERO_TO_15:
            return ratio >= 0 && ratio < 15
        case PRICE_CHANGE_RATE.PLUS_15_TO_30:
            return ratio >= 15 && ratio < 30
        default:
            return false
    }
}
