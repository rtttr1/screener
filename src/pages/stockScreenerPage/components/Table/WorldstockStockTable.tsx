import {useEffect} from 'react'

import {useAtomValue, useSetAtom} from 'jotai'
import {useSearchParams} from 'react-router-dom'

import type {WorldstockMarketType} from '@/pages/stockScreenerPage/constants/worldstockMarket'
import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/sort'

import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import {useInfiniteWorldstockStockList} from '@/pages/stockScreenerPage/api/query'
import {priceChangeFilterAtom, priceChangeRateFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import {worldstockStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import TableErrorView from '@/pages/stockScreenerPage/components/Table/TableErrorView'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'
import {toWorldstockApiSortType} from '@/pages/stockScreenerPage/utils/sortMapper'

interface WorldstockStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const WorldstockStockTable = ({favoriteStocks, onFavoriteToggle}: WorldstockStockTableProps) => {
    const [searchParams] = useSearchParams()
    const currentWorldstockMarket = searchParams.get(URL_QUERIES.WORLDSTOCK_MARKET) as WorldstockMarketType

    const priceChangeFilter = useAtomValue(priceChangeFilterAtom)
    const priceChangeRateFilter = useAtomValue(priceChangeRateFilterAtom)

    const {sortState, handleSort} = useTableSort<SortField>()
    const sortType = toWorldstockApiSortType(sortState)

    const {
        data: stocks,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteWorldstockStockList(
        {
            stockExchangeType: currentWorldstockMarket,
            sortType,
        },
        {
            priceChange: priceChangeFilter,
            priceChangeRate: priceChangeRateFilter,
        },
    )

    // stocks 변경 시 종목 코드만 atom에 업데이트
    const setWorldstockStockCodes = useSetAtom(worldstockStockCodesAtom)
    useEffect(() => {
        const codes = stocks.map((stock) => stock.itemCode)
        setWorldstockStockCodes(codes)
    }, [stocks, setWorldstockStockCodes])

    const isPaginationError = isError && stocks && stocks.length > 0
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

            {isPaginationError && (
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

export default WorldstockStockTable
