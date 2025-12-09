import {useEffect} from 'react'

import {useQueryClient} from '@tanstack/react-query'

import {initSharedWorker} from './client'
import {SHARED_WORKER_MESSAGE_TYPES, type RealtimeStockDataUpdateMessage} from './constants'

import type {
    GetDomesticStockListResponse,
    GetOverseasStockListResponse,
    RealTimeStockItem,
} from '@/pages/stockScreenerPage/types/api'

export const useUpdateStockListQuery = () => {
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
        }

        port.addEventListener('message', handleMessage)

        return () => {
            port.removeEventListener('message', handleMessage)
        }
    }, [queryClient])
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
                            closePrice: updated.closePrice,
                            compareToPreviousClosePrice: updated.compareToPreviousClosePrice,
                            fluctuationsRatio: updated.fluctuationsRatio,
                            compareToPreviousPrice: updated.compareToPreviousPrice,
                            accumulatedTradingVolume: updated.accumulatedTradingVolume,
                            accumulatedTradingValue: updated.accumulatedTradingValue,
                            ...(updated.stockExchangeName && {
                                stockExchangeName: updated.stockExchangeName,
                            }),
                            currencyType: updated.currencyType,
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
                            closePrice: updated.closePrice,
                            compareToPreviousClosePrice: updated.compareToPreviousClosePrice,
                            fluctuationsRatio: updated.fluctuationsRatio,
                            compareToPreviousPrice: updated.compareToPreviousPrice,
                            accumulatedTradingVolume: updated.accumulatedTradingVolume,
                            accumulatedTradingValue: updated.accumulatedTradingValue,
                            currencyType: updated.currencyType,
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
