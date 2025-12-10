export const WORLDSTOCK_MARKETS = {
    NASDAQ: 'NASDAQ',
    NYSE: 'NYSE',
    AMEX: 'AMEX',
} as const

export type WorldstockMarketType = (typeof WORLDSTOCK_MARKETS)[keyof typeof WORLDSTOCK_MARKETS]

export const WORLDSTOCK_MARKET_LABEL: Record<WorldstockMarketType, string> = {
    [WORLDSTOCK_MARKETS.NASDAQ]: '나스닥',
    [WORLDSTOCK_MARKETS.NYSE]: '뉴욕',
    [WORLDSTOCK_MARKETS.AMEX]: '아멕스',
} as const

export const WORLDSTOCK_MARKET_ITEMS = Object.values(WORLDSTOCK_MARKETS).map((market) => ({
    value: market,
    label: WORLDSTOCK_MARKET_LABEL[market],
}))
