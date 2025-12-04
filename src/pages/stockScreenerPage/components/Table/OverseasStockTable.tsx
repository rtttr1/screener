import {useSearchParams} from 'react-router-dom'

import type {OverseasStockExchangeType} from '@/pages/stockScreenerPage/types/api'
import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import {useOverseasStockList} from '@/pages/stockScreenerPage/api/query'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import {OVERSEAS_MARKETS} from '@/pages/stockScreenerPage/constants/overseasMarket'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'

interface OverseasStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const OVERSEAS_MARKET_TO_EXCHANGE_TYPE: Record<string, OverseasStockExchangeType> = {
    [OVERSEAS_MARKETS.NASDAQ]: 'NASDAQ',
    [OVERSEAS_MARKETS.NYSE]: 'NYSE',
    [OVERSEAS_MARKETS.AMEX]: 'AMEX',
} as const

const OverseasStockTable = ({favoriteStocks, onFavoriteToggle}: OverseasStockTableProps) => {
    const [searchParams] = useSearchParams()
    const currentOverseasMarket = searchParams.get(URL_QUERIES.OVERSEAS_MARKET) || OVERSEAS_MARKETS.NASDAQ

    const {sortState, handleSort} = useTableSort<SortField>()

    const stockExchangeType = OVERSEAS_MARKET_TO_EXCHANGE_TYPE[currentOverseasMarket] || 'NASDAQ'

    const {data: overseasStockList} = useOverseasStockList({
        stockExchangeType,
        sortType: 'marketValue',
    })

    const stocks = overseasStockList?.stocks || []

    return (
        <StockTable
            stocks={stocks}
            favoriteStocks={favoriteStocks}
            onFavoriteToggle={onFavoriteToggle}
            currentSortField={sortState.field}
            currentSortOrder={sortState.order}
            onSort={handleSort}
        />
    )
}

export default OverseasStockTable
