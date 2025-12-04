import type {GetDomesticStockListRequest, GetDomesticStockListResponse} from '@/pages/stockScreenerPage/types/api'

import {mStockClient} from '@/common/lib/ky'
import {buildSearchParams} from '@/common/utils/buildSearchParams'

export const getDomesticStockList = async (
    params: GetDomesticStockListRequest,
): Promise<GetDomesticStockListResponse> => {
    return mStockClient
        .get('domestic/stockList', {searchParams: buildSearchParams(params)})
        .json<GetDomesticStockListResponse>()
}
