import {useQuery} from '@tanstack/react-query'

import type {GetDomesticStockListRequest, GetOverseasStockListRequest} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList, getOverseasStockList} from '@/pages/stockScreenerPage/api/api'

export const useDomesticStockList = (params: GetDomesticStockListRequest) => {
    return useQuery({
        queryKey: ['domesticStockList', params],
        queryFn: () => getDomesticStockList(params),
        enabled: !!params.sortType,
    })
}

export const useOverseasStockList = (params: GetOverseasStockListRequest) => {
    return useQuery({
        queryKey: ['overseasStockList', params],
        queryFn: () => getOverseasStockList(params),
        enabled: !!params.stockExchangeType && !!params.sortType,
    })
}
