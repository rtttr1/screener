import {useQuery} from '@tanstack/react-query'

import type {GetDomesticStockListRequest} from '@/pages/stockScreenerPage/types/api'

import {getDomesticStockList} from '@/pages/stockScreenerPage/api/api'

export const useDomesticStockList = (params: GetDomesticStockListRequest) => {
    return useQuery({
        queryKey: ['domesticStockList', params],
        queryFn: () => getDomesticStockList(params),
        enabled: !!params.sortType,
    })
}
