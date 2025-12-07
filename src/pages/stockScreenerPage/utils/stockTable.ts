import {PRICE_CHANGE} from '@/pages/stockScreenerPage/constants/priceChange'

export const getChangeStatusColor = (status: string) => {
    switch (status) {
        case PRICE_CHANGE.UPPER_LIMIT:
            return 'text-red-900'
        case PRICE_CHANGE.RISING:
            return 'text-red-600'
        case PRICE_CHANGE.UNCHANGED:
            return 'text-gray-900'
        case PRICE_CHANGE.FALLING:
            return 'text-blue-600'
        case PRICE_CHANGE.LOWER_LIMIT:
            return 'text-blue-900'
        default:
            return 'text-gray-900'
    }
}

export const getChangeStatusLabel = (status: string) => {
    switch (status) {
        case PRICE_CHANGE.UPPER_LIMIT:
            return '상한'
        case PRICE_CHANGE.RISING:
            return '상승'
        case PRICE_CHANGE.UNCHANGED:
            return '보합'
        case PRICE_CHANGE.FALLING:
            return '하락'
        case PRICE_CHANGE.LOWER_LIMIT:
            return '하한'
        default:
            return ''
    }
}

export const getChangeRateColor = (changeRate: string) => {
    const num = parseFloat(changeRate)
    if (num < 0) {
        return 'text-blue-600'
    }
    if (num > 0) {
        return 'text-red-600'
    }
    return 'text-gray-900'
}

export const getExchangeLabel = (exchange: string) => {
    if (exchange === 'KOSPI') {
        return '코스피'
    }
    if (exchange === 'KOSDAQ') {
        return '코스닥'
    }
    return exchange
}

export const formatPriceWithCurrency = (price: string, currencyCode: string) => {
    switch (currencyCode) {
        case 'KRW':
            return `${price} 원`
        case 'USD':
            return `$${price}`
        default:
            return `${price} ${currencyCode}`
    }
}
