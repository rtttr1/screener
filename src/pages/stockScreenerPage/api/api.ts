import type {
    GetDomesticStockListRequest,
    GetDomesticStockListResponse,
    GetWorldstockStockListRequest,
    GetWorldstockStockListResponse,
    GetRealTimeStockRequest,
    GetRealTimeStockResponse,
    WorldstockStockListApiResponse,
} from '@/pages/stockScreenerPage/types/api'

import {apiStockClient, mStockClient} from '@/common/lib/ky'
import {buildSearchParams} from '@/common/utils/buildSearchParams'
import {mapWorldstockStockToStock} from '@/pages/stockScreenerPage/utils/stockMapper'

export const getDomesticStockList = async (
    params: GetDomesticStockListRequest,
): Promise<GetDomesticStockListResponse> => {
    return mStockClient
        .get('stock/domestic/stockList', {searchParams: buildSearchParams(params)})
        .json<GetDomesticStockListResponse>()
}

export const getWorldstockStockList = async (
    params: GetWorldstockStockListRequest,
): Promise<GetWorldstockStockListResponse> => {
    const searchParams = buildSearchParams({
        page: params.page,
        pageSize: params.pageSize,
    })

    const response = await apiStockClient
        .get(`exchange/${params.stockExchangeType}/${params.sortType}`, {searchParams})
        .json<WorldstockStockListApiResponse>()

    // 해외 주식 응답을 국내 형식에 맞게 변환
    return {
        ...response,
        stocks: response.stocks.map(mapWorldstockStockToStock),
    }
}

export const getRealTimeStock = async (params: GetRealTimeStockRequest): Promise<GetRealTimeStockResponse> => {
    const searchParams = buildSearchParams({
        type: params.type,
    })

    return mStockClient
        .post('realTime/stock', {
            searchParams,
            json: {
                reutersCodes: params.reutersCodes,
            },
        })
        .json<GetRealTimeStockResponse>()
}
