export const PRICE_CHANGE = {
    UPPER_LIMIT: 'upper_limit', // 상한
    RISE: 'rise', // 상승
    UNCHANGED: 'unchanged', // 보합
    FALL: 'fall', // 하락
    LOWER_LIMIT: 'lower_limit', // 하한
} as const

export type PriceChangeType = (typeof PRICE_CHANGE)[keyof typeof PRICE_CHANGE]

export const PRICE_CHANGE_LABEL: Record<PriceChangeType, string> = {
    [PRICE_CHANGE.UPPER_LIMIT]: '상한',
    [PRICE_CHANGE.RISE]: '상승',
    [PRICE_CHANGE.UNCHANGED]: '보합',
    [PRICE_CHANGE.FALL]: '하락',
    [PRICE_CHANGE.LOWER_LIMIT]: '하한',
} as const

export const PRICE_CHANGE_OPTIONS = Object.values(PRICE_CHANGE).map((value) => ({
    value,
    label: PRICE_CHANGE_LABEL[value],
}))
