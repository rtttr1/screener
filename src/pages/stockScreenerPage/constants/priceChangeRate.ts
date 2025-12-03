export const PRICE_CHANGE_RATE = {
    MINUS_30_TO_MINUS_15: 'minus_30_to_minus_15',
    MINUS_15_TO_ZERO: 'minus_15_to_zero',
    ZERO_TO_15: 'zero_to_15',
    PLUS_15_TO_30: 'plus_15_to_30',
} as const

export type PriceChangeRateType = (typeof PRICE_CHANGE_RATE)[keyof typeof PRICE_CHANGE_RATE]

export const PRICE_CHANGE_RATE_LABEL: Record<PriceChangeRateType, string> = {
    [PRICE_CHANGE_RATE.MINUS_30_TO_MINUS_15]: '-30% ~ -15%',
    [PRICE_CHANGE_RATE.MINUS_15_TO_ZERO]: '-15% ~ 0%',
    [PRICE_CHANGE_RATE.ZERO_TO_15]: '0% ~ 15%',
    [PRICE_CHANGE_RATE.PLUS_15_TO_30]: '15% ~ 30%',
} as const

export const PRICE_CHANGE_RATE_OPTIONS = Object.values(PRICE_CHANGE_RATE).map((value) => ({
    value,
    label: PRICE_CHANGE_RATE_LABEL[value],
}))

