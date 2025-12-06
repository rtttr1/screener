export type SortField =
    | 'marketValue' // 시가총액
    | 'fluctuationsRatio' // 등락률 (기본 -> desc -> asc)
    | 'quantTop' // 거래량상위
    | 'priceTop' // 거래대금상위

export type SortOrder = 'none' | 'asc' | 'desc'
