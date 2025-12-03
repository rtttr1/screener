export const getChangeStatusColor = (status: string) => {
    if (status === 'FALLING' || status === '하락' || status === '하한') {
        return 'text-blue-600'
    }
    if (status === 'RISING' || status === '상승' || status === '상한') {
        return 'text-red-600'
    }
    return 'text-gray-900'
}

export const getChangeStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
        RISING: '상승',
        FALLING: '하락',
        UNCHANGED: '보합',
    }
    return labels[status] || status
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
    const labels: Record<string, string> = {
        KOSPI: '코스피',
        KOSDAQ: '코스닥',
    }
    return labels[exchange] || exchange
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
