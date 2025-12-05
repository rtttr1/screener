import {useInfiniteQuery} from '@tanstack/react-query'

import type {
    GetDomesticStockListRequest,
    GetDomesticStockListResponse,
    GetOverseasStockListRequest,
    GetOverseasStockListResponse,
} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList, getOverseasStockList} from '@/pages/stockScreenerPage/api/api'
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
    return useInfiniteQuery({
        queryKey: ['domesticStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getDomesticStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
        select: filters ? applyFiltersToInfiniteDomesticData(filters) : undefined,
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

function applyFiltersToInfiniteDomesticData(filters: StockFilters) {
    return (data: InfiniteDomesticData): InfiniteDomesticData => ({
        ...data,
        pages: data.pages.map((page) => ({
            ...page,
            result: {...page.result, stocks: filterStocks(page.result.stocks, filters)},
        })),
    })
}

export const useInfiniteOverseasStockList = (params: GetOverseasStockListRequest, filters?: StockFilters) => {
    return useInfiniteQuery({
        queryKey: ['overseasStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getOverseasStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
        select: filters ? applyFiltersToInfiniteOverseasData(filters) : undefined,
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

function applyFiltersToInfiniteOverseasData(filters: StockFilters) {
    return (data: InfiniteOverseasData): InfiniteOverseasData => ({
        ...data,
        pages: data.pages.map((page) => ({...page, stocks: filterStocks(page.stocks, filters)})),
    })
}
