import {useAtomValue} from 'jotai'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import {useInfiniteDomesticStockList} from '@/pages/stockScreenerPage/api/query'
import {exchangeFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'

interface DomesticStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const DomesticStockTable = ({favoriteStocks, onFavoriteToggle}: DomesticStockTableProps) => {
    const exchangeFilter = useAtomValue(exchangeFilterAtom)
    const category = exchangeFilter || 'all'

    const {sortState, handleSort} = useTableSort<SortField>()

    const {
        data: domesticStockList,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteDomesticStockList({
        sortType: 'marketValue',
        category,
    })

    const stocks = domesticStockList?.pages.flatMap((page) => page.result.stocks) || []

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

export default DomesticStockTable
