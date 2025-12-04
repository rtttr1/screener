import {useSearchParams} from 'react-router-dom'

import type {OverseasMarketType} from '@/pages/stockScreenerPage/constants/overseasMarket'
import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import {useOverseasStockList} from '@/pages/stockScreenerPage/api/query'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'

interface OverseasStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const OverseasStockTable = ({favoriteStocks, onFavoriteToggle}: OverseasStockTableProps) => {
    const [searchParams] = useSearchParams()
    const currentOverseasMarket = searchParams.get(URL_QUERIES.OVERSEAS_MARKET) as OverseasMarketType

    const {sortState, handleSort} = useTableSort<SortField>()

    const {data: overseasStockList} = useOverseasStockList({
        stockExchangeType: currentOverseasMarket,
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
