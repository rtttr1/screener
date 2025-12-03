export const OVERSEAS_MARKETS = {
    NASDAQ: 'nasdaq',
    NYSE: 'nyse',
    AMEX: 'amex',
} as const

export type OverseasMarketType = (typeof OVERSEAS_MARKETS)[keyof typeof OVERSEAS_MARKETS]

export const OVERSEAS_MARKET_LABEL: Record<OverseasMarketType, string> = {
    [OVERSEAS_MARKETS.NASDAQ]: '나스닥',
    [OVERSEAS_MARKETS.NYSE]: '뉴욕',
    [OVERSEAS_MARKETS.AMEX]: '아멕스',
} as const

export const OVERSEAS_MARKET_ITEMS = Object.values(OVERSEAS_MARKETS).map((market) => ({
    value: market,
    label: OVERSEAS_MARKET_LABEL[market],
}))
