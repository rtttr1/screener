import {useEffect} from 'react'

import {useAtomValue} from 'jotai'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/sort'

import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import {useInfiniteDomesticStockList} from '@/pages/stockScreenerPage/api/query'
import {
    exchangeFilterAtom,
    priceChangeFilterAtom,
    priceChangeRateFilterAtom,
} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import TableErrorView from '@/pages/stockScreenerPage/components/Table/TableErrorView'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'
import {toDomesticApiSortType} from '@/pages/stockScreenerPage/utils/sortMapper'

interface DomesticStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
    onStockCodesChange: (codes: string[]) => void
}

const DomesticStockTable = ({favoriteStocks, onFavoriteToggle, onStockCodesChange}: DomesticStockTableProps) => {
    const priceChangeFilter = useAtomValue(priceChangeFilterAtom)
    const priceChangeRateFilter = useAtomValue(priceChangeRateFilterAtom)
    const exchangeFilter = useAtomValue(exchangeFilterAtom)
    const category = exchangeFilter || 'all'

    const {sortState, handleSort} = useTableSort<SortField>()
    const sortType = toDomesticApiSortType(sortState)

    const {
        data: stocks,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteDomesticStockList(
        {
            sortType,
            category,
        },
        {
            priceChange: priceChangeFilter,
            priceChangeRate: priceChangeRateFilter,
        },
    )

    useEffect(() => {
        if (stocks) {
            const codes = stocks.map((stock) => stock.itemCode)
            onStockCodesChange(codes)
        }
    }, [stocks, onStockCodesChange])

    const isPaginationError = isError && stocks?.length > 0
    const canFetchNext = Boolean(hasNextPage && !isFetchingNextPage && !isPaginationError)
    const loadMoreRef = useIntersectionObserver(fetchNextPage, canFetchNext)

    return (
        <div className="w-full rounded-lg border overflow-auto max-h-[calc(100vh-200px)]">
            <StockTable
                stocks={stocks}
                favoriteStocks={favoriteStocks}
                onFavoriteToggle={onFavoriteToggle}
                currentSortField={sortState.field}
                currentSortOrder={sortState.order}
                onSort={handleSort}
            />
            <div ref={loadMoreRef} className="h-1" />

            {!isFetchingNextPage && isPaginationError && (
                <div className="mt-2 px-4">
                    <TableErrorView
                        message="추가 데이터를 불러오는 중 오류가 발생했습니다."
                        onRetry={() => fetchNextPage()}
                    />
                </div>
            )}

            {isFetchingNextPage && (
                <div className="mt-2 flex justify-center items-center py-4 h-20">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                </div>
            )}
        </div>
    )
}

export default DomesticStockTable
