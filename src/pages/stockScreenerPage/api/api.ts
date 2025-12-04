import type {
    GetDomesticStockListRequest,
    GetDomesticStockListResponse,
    GetOverseasStockListRequest,
    GetOverseasStockListResponse,
    OverseasStockListApiResponse,
} from '@/pages/stockScreenerPage/types/api'

import {apiStockClient, mStockClient} from '@/common/lib/ky'
import {buildSearchParams} from '@/common/utils/buildSearchParams'
import {mapOverseasStockToStock} from '@/pages/stockScreenerPage/utils/stockMapper'

export const getDomesticStockList = async (
    params: GetDomesticStockListRequest,
): Promise<GetDomesticStockListResponse> => {
    return mStockClient
        .get('domestic/stockList', {searchParams: buildSearchParams(params)})
        .json<GetDomesticStockListResponse>()
}

export const getOverseasStockList = async (
    params: GetOverseasStockListRequest,
): Promise<GetOverseasStockListResponse> => {
    const searchParams = buildSearchParams({
        page: params.page,
        pageSize: params.pageSize,
    })

    const response = await apiStockClient
        .get(`exchange/${params.stockExchangeType}/${params.sortType}`, {searchParams})
        .json<OverseasStockListApiResponse>()

    // 해외 주식 응답을 국내 형식에 맞게 변환
    return {
        ...response,
        stocks: response.stocks.map(mapOverseasStockToStock),
    }
}
