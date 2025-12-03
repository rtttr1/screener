export const EXCHANGES = {
    KOSPI: 'kospi', // 코스피
    KOSDAQ: 'kosdaq', // 코스닥
} as const

export type ExchangeType = (typeof EXCHANGES)[keyof typeof EXCHANGES]

export const EXCHANGE_LABEL: Record<ExchangeType, string> = {
    [EXCHANGES.KOSPI]: '코스피',
    [EXCHANGES.KOSDAQ]: '코스닥',
} as const

export const EXCHANGE_OPTIONS = Object.values(EXCHANGES).map((value) => ({
    value,
    label: EXCHANGE_LABEL[value],
}))

