import type {PriceChangeStatus} from '@/pages/stockScreenerPage/types/stock'

export const getChangeStatusColor = (status: PriceChangeStatus) => {
    if (status === 'FALLING') {
        return 'text-blue-600'
    }
    if (status === 'RISING') {
        return 'text-red-600'
    }
    return 'text-gray-900'
}

export const getChangeStatusLabel = (status: PriceChangeStatus) => {
    if (status === 'FALLING') {
        return '하락'
    }
    if (status === 'RISING') {
        return '상승'
    }
    if (status === 'UNCHANGED') {
        return '보합'
    }
    return status
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
