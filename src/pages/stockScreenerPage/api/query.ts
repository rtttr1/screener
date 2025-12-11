import {useSuspenseInfiniteQuery} from '@tanstack/react-query'

import type {
    GetDomesticStockListRequest,
    GetDomesticStockListResponse,
    GetWorldstockStockListRequest,
    GetWorldstockStockListResponse,
} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList, getWorldstockStockList} from '@/pages/stockScreenerPage/api/api'
import {filterStocks, type StockFilters} from '@/pages/stockScreenerPage/utils/stockFilters'

const DEFAULT_PAGE_SIZE = 20

interface InfiniteDomesticData {
    pages: GetDomesticStockListResponse[]
    pageParams: unknown[]
}

interface InfiniteWorldstockData {
    pages: GetWorldstockStockListResponse[]
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

export const useInfiniteWorldstockStockList = (params: GetWorldstockStockListRequest, filters?: StockFilters) => {
    return useSuspenseInfiniteQuery({
        queryKey: ['worldstockStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getWorldstockStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
        select: (data) => {
            const filteredPages = applyFiltersToInfiniteWorldstockData(data.pages, filters)
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

function applyFiltersToInfiniteWorldstockData(pages: InfiniteWorldstockData['pages'], filters?: StockFilters) {
    if (!filters) {
        return pages
    }
    return pages.map((page) => ({
        ...page,
        stocks: filterStocks(page.stocks, filters),
    }))
}
