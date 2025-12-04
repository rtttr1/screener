import {useInfiniteQuery} from '@tanstack/react-query'

import type {GetDomesticStockListRequest, GetOverseasStockListRequest} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList, getOverseasStockList} from '@/pages/stockScreenerPage/api/api'

const DEFAULT_PAGE_SIZE = 20

export const useInfiniteDomesticStockList = (params: GetDomesticStockListRequest) => {
    return useInfiniteQuery({
        queryKey: ['domesticStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getDomesticStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
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

export const useInfiniteOverseasStockList = (params: GetOverseasStockListRequest) => {
    return useInfiniteQuery({
        queryKey: ['overseasStockList', 'infinite', params],
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            getOverseasStockList({
                ...params,
                page: pageParam,
                pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE,
            }),
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
