export const PRICE_CHANGE = {
    UPPER_LIMIT: 'UPPER_LIMIT', // 상한
    RISING: 'RISING', // 상승
    UNCHANGED: 'UNCHANGED', // 보합
    FALLING: 'FALLING', // 하락
    LOWER_LIMIT: 'LOWER_LIMIT', // 하한
} as const

export type PriceChangeType = (typeof PRICE_CHANGE)[keyof typeof PRICE_CHANGE]

export const PRICE_CHANGE_LABEL: Record<PriceChangeType, string> = {
    [PRICE_CHANGE.UPPER_LIMIT]: '상한',
    [PRICE_CHANGE.RISING]: '상승',
    [PRICE_CHANGE.UNCHANGED]: '보합',
    [PRICE_CHANGE.FALLING]: '하락',
    [PRICE_CHANGE.LOWER_LIMIT]: '하한',
} as const

export const PRICE_CHANGE_OPTIONS = Object.values(PRICE_CHANGE).map((value) => ({
    value,
    label: PRICE_CHANGE_LABEL[value],
}))
