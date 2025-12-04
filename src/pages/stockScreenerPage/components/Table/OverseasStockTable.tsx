import {useSearchParams} from 'react-router-dom'

import type {OverseasMarketType} from '@/pages/stockScreenerPage/constants/overseasMarket'
import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import {useInfiniteOverseasStockList} from '@/pages/stockScreenerPage/api/query'
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

    const {
        data: overseasStockList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteOverseasStockList({
        stockExchangeType: currentOverseasMarket,
        sortType: 'marketValue',
    })

    const stocks = overseasStockList?.pages.flatMap((page) => page.stocks) || []

    const canFetchNext = Boolean(hasNextPage && !isFetchingNextPage)
    const loadMoreRef = useIntersectionObserver(fetchNextPage, canFetchNext)

    return (
        <>
            <StockTable
                stocks={stocks}
                favoriteStocks={favoriteStocks}
                onFavoriteToggle={onFavoriteToggle}
                currentSortField={sortState.field}
                currentSortOrder={sortState.order}
                onSort={handleSort}
            />
            <div ref={loadMoreRef} className="h-8" />

            {isFetchingNextPage && (
                <div className="mt-2 flex justify-center py-4">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                </div>
            )}
        </>
    )
}

export default OverseasStockTable
