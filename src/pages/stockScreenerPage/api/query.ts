import {useQuery, useSuspenseInfiniteQuery} from '@tanstack/react-query'

import type {
    GetDomesticStockListRequest,
    GetDomesticStockListResponse,
    GetOverseasStockListRequest,
    GetOverseasStockListResponse,
} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList, getOverseasStockList, getRealTimeStock} from '@/pages/stockScreenerPage/api/api'
import {filterStocks, type StockFilters} from '@/pages/stockScreenerPage/utils/stockFilters'

const DEFAULT_PAGE_SIZE = 20

interface InfiniteDomesticData {
    pages: GetDomesticStockListResponse[]
    pageParams: unknown[]
}

interface InfiniteOverseasData {
    pages: GetOverseasStockListResponse[]
    pageParams: unknown[]
}

export const useInfiniteDomesticStockList = (params: GetDomesticStockListRequest, filters?: StockFilters) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['domesticStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getDomesticStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
        select: (data) => {
            const filteredPages = applyFiltersToInfiniteDomesticData(data.pages, filters)
            return filteredPages.flatMap((page) => page.result.stocks)
        },
        getNextPageParam: (lastPage) => {
            const {page, pageSize, totalCount} = lastPage.result
            const nextPage = page + 1

            if (page * pageSize < totalCount) {
                return nextPage
            }

            return undefined
        },
    })
}

function applyFiltersToInfiniteDomesticData(pages: InfiniteDomesticData['pages'], filters?: StockFilters) {
    if (!filters) {
        return pages
    }
    return pages.map((page) => ({
        ...page,
        result: {...page.result, stocks: filterStocks(page.result.stocks, filters)},
    }))
}

export const useInfiniteOverseasStockList = (params: GetOverseasStockListRequest, filters?: StockFilters) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['overseasStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getOverseasStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
        select: (data) => {
            const filteredPages = applyFiltersToInfiniteOverseasData(data.pages, filters)
            return filteredPages.flatMap((page) => page.stocks)
        },
        getNextPageParam: (lastPage) => {
            const {page, pageSize, totalCount} = lastPage
            const nextPage = page + 1

            if (page * pageSize < totalCount) {
                return nextPage
            }

            return undefined
        },
    })
}

function applyFiltersToInfiniteOverseasData(pages: InfiniteOverseasData['pages'], filters?: StockFilters) {
    if (!filters) {
        return pages
    }
    return pages.map((page) => ({
        ...page,
        stocks: filterStocks(page.stocks, filters),
    }))
}

export const useRealTimeStock = (type: 'domestic' | 'worldstock', reutersCodes: string[]) => {
    return useQuery({
        queryKey: ['realtime', type],
        queryFn: () =>
            getRealTimeStock({
                type,
                reutersCodes,
            }),
        refetchInterval: (query) => query.state.data?.result.pollingInterval,
        enabled: reutersCodes.length > 0,
        staleTime: 0,
    })
}
