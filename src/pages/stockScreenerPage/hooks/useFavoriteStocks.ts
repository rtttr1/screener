import {useCallback, useEffect, useState} from 'react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {toast} from '@/common/components/toast'
import {safeLocalStorage} from '@/common/utils/localStorage'

const MAX_FAVORITE_STOCKS_COUNT = 20
const FAVORITE_STOCKS_STORAGE_KEY = 'favoriteStocks'

const loadFavoriteStocksFromStorage = (): Stock[] => {
    const stored = safeLocalStorage.getItem(FAVORITE_STOCKS_STORAGE_KEY)

    return stored ? (JSON.parse(stored) as Stock[]) : []
}

const saveFavoriteStocksToStorage = (stocks: Stock[]): void => {
    safeLocalStorage.setItem(FAVORITE_STOCKS_STORAGE_KEY, JSON.stringify(stocks))
}

/**
 * 관심종목 상태를 로컬스토리지와 함께 관리하는 커스텀 훅
 * @returns 관심종목 배열과 토글 핸들러
 * @example
 * const {favoriteStocks, toggleFavorite} = useFavoriteStocks()
 *
 * const handleToggle = (stock: Stock) => {
 *     toggleFavorite(stock)
 * }
 */
export const useFavoriteStocks = () => {
    // 추후 관심종목 최대 길이가 늘어날 경우, Map을 사용하여 중복 체크 최적화 가능
    // 현재는 최대 길이가 20개이므로 편하게 배열로 관리
    const [favoriteStocks, setFavoriteStocks] = useState<Stock[]>(() => loadFavoriteStocksFromStorage())

    useEffect(() => {
        saveFavoriteStocksToStorage(favoriteStocks)
    }, [favoriteStocks])

    const handleFavoriteToggle = useCallback((target: Stock) => {
        setFavoriteStocks((prev) => {
            const isExist = prev.some((stock) => stock.itemCode === target.itemCode)

            if (isExist) {
                return prev.filter((stock) => stock.itemCode !== target.itemCode)
            }

            if (prev.length >= MAX_FAVORITE_STOCKS_COUNT) {
                toast({
                    title: '관심종목은 20개까지만 등록할 수 있습니다.',
                })
                return prev
            }

            return [...prev, target]
        })
    }, [])

    const updateFavoriteStocks = useCallback((stocks: Stock[]) => {
        setFavoriteStocks(stocks)
    }, [])

    return {
        favoriteStocks,
        handleFavoriteToggle,
        updateFavoriteStocks,
    }
}
