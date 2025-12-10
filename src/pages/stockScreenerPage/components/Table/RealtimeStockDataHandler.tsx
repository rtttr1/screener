import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {useSendRealTimeStockCodes} from '@/pages/stockScreenerPage/hooks/useRealTimeStockData'
import {useUpdateStockListData} from '@/pages/stockScreenerPage/sharedWorker/useUpdateStockListData'

interface RealtimeStockDataHandlerProps {
    favoriteStocks: Stock[]
    updateFavoriteStocks: (stocks: Stock[]) => void
}

const RealtimeStockDataHandler = ({favoriteStocks, updateFavoriteStocks}: RealtimeStockDataHandlerProps) => {
    useSendRealTimeStockCodes()
    useUpdateStockListData({
        updateFavoriteStocks,
        favoriteStocks,
    })

    return null
}

export default RealtimeStockDataHandler
