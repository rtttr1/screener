import {useEffect} from 'react'

import {useQueryClient} from '@tanstack/react-query'

import {initSharedWorker} from './client'
import {SHARED_WORKER_MESSAGE_TYPES, type RealtimeStockDataUpdateMessage} from './constants'

import type {
    GetDomesticStockListResponse,
    GetOverseasStockListResponse,
    RealTimeStockItem,
    Stock,
} from '@/pages/stockScreenerPage/types/api'

interface UseUpdateStockListQueryParams {
    updateFavoriteStocks?: (stocks: Stock[]) => void
    favoriteStocks?: Stock[]
}

export const useUpdateStockListData = ({
    updateFavoriteStocks,
    favoriteStocks = [],
}: UseUpdateStockListQueryParams = {}) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const port = initSharedWorker()
        if (!port) {
            return
        }

        const handleMessage = (event: MessageEvent<RealtimeStockDataUpdateMessage>) => {
            const {type, region, payload} = event.data

            if (type !== SHARED_WORKER_MESSAGE_TYPES.REALTIME_STOCK_DATA_UPDATE) {
                return
            }
            if (!payload?.result?.items) {
                return
            }

            const itemsByCode = payload.result.items

            if (region === 'domestic') {
                updateDomesticStockListCache(queryClient, itemsByCode)
            } else if (region === 'worldstock') {
                updateOverseasStockListCache(queryClient, itemsByCode)
            }

            // 관심종목 업데이트
            if (updateFavoriteStocks && favoriteStocks.length > 0) {
                updateFavoriteStocksWithRealtimeData(favoriteStocks, itemsByCode, updateFavoriteStocks)
            }
        }

        port.addEventListener('message', handleMessage)

        return () => {
            port.removeEventListener('message', handleMessage)
        }
    }, [queryClient, updateFavoriteStocks, favoriteStocks])
}

// 관심종목에 실시간 시세 데이터 반영
function updateFavoriteStocksWithRealtimeData(
    favoriteStocks: Stock[],
    realtimeItems: Record<string, RealTimeStockItem>,
    updateFavoriteStocks: (stocks: Stock[]) => void,
) {
    const updatedStocks = favoriteStocks.map((stock) => {
        const updated = realtimeItems[stock.itemCode]
        if (!updated) {
            return stock
        }

        return {
            ...stock,
            ...updated,
        }
    })

    updateFavoriteStocks(updatedStocks)
}

// 국내 주식 리스트 캐시 업데이트
function updateDomesticStockListCache(
    queryClient: ReturnType<typeof useQueryClient>,
    realtimeItems: Record<string, RealTimeStockItem>,
): void {
    // 국내 주식 리스트 쿼리 키 패턴: ['domesticStockList', 'infinite', params]
    const queries = queryClient.getQueryCache().findAll({
        predicate: (query) => {
            const key = query.queryKey
            return Array.isArray(key) && key[0] === 'domesticStockList' && key[1] === 'infinite'
        },
    })

    queries.forEach((query) => {
        queryClient.setQueryData(
            query.queryKey,
            (oldData: {pages: GetDomesticStockListResponse[]; pageParams: unknown[]} | undefined) => {
                if (!oldData) {
                    return oldData
                }

                // 국내: 각 page는 GetDomesticStockListResponse 구조 (result.stocks에 배열)
                const newPages = oldData.pages.map((page) => {
                    const updatedStocks = page.result.stocks.map((stock) => {
                        const updated = realtimeItems[stock.itemCode]
                        if (!updated) {
                            return stock
                        }

                        return {
                            ...stock,
                            ...updated,
                        }
                    })

                    return {
                        ...page,
                        result: {
                            ...page.result,
                            stocks: updatedStocks,
                        },
                    }
                })

                return {
                    ...oldData,
                    pages: newPages,
                }
            },
        )
    })
}

// 해외 주식 리스트 캐시 업데이트
function updateOverseasStockListCache(
    queryClient: ReturnType<typeof useQueryClient>,
    realtimeItems: Record<string, RealTimeStockItem>,
): void {
    // 해외 주식 리스트 쿼리 키 패턴: ['overseasStockList', 'infinite', params]
    const queries = queryClient.getQueryCache().findAll({
        predicate: (query) => {
            const key = query.queryKey
            return Array.isArray(key) && key[0] === 'overseasStockList' && key[1] === 'infinite'
        },
    })

    queries.forEach((query) => {
        queryClient.setQueryData(
            query.queryKey,
            (oldData: {pages: GetOverseasStockListResponse[]; pageParams: unknown[]} | undefined) => {
                if (!oldData) {
                    return oldData
                }

                // 해외: 각 page는 GetOverseasStockListResponse 구조 (stocks에 직접 배열)
                const newPages = oldData.pages.map((page) => {
                    const updatedStocks = page.stocks.map((stock) => {
                        // 해외도 Stock 타입으로 변환되어 itemCode를 사용
                        const updated = realtimeItems[stock.itemCode]
                        if (!updated) {
                            return stock
                        }

                        return {
                            ...stock,
                            ...updated,
                        }
                    })

                    return {
                        ...page,
                        stocks: updatedStocks,
                    }
                })

                return {
                    ...oldData,
                    pages: newPages,
                }
            },
        )
    })
}
