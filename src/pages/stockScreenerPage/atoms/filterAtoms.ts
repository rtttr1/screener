import {atom} from 'jotai'

import type {ExchangeType} from '@/pages/stockScreenerPage/constants/exchange'
import type {PriceChangeType} from '@/pages/stockScreenerPage/constants/priceChange'
import type {PriceChangeRateType} from '@/pages/stockScreenerPage/constants/priceChangeRate'

// 등락 필터 상태
export const priceChangeFilterAtom = atom<PriceChangeType[]>([])

// 등락률 필터 상태
export const priceChangeRateFilterAtom = atom<PriceChangeRateType | null>(null)

// 거래소 필터 상태
export const exchangeFilterAtom = atom<ExchangeType | null>(null)

// 전체 필터 초기화 액션
export const resetAllFiltersAtom = atom(null, (_get, set) => {
    set(priceChangeFilterAtom, [])
    set(priceChangeRateFilterAtom, null)
    set(exchangeFilterAtom, null)
})
