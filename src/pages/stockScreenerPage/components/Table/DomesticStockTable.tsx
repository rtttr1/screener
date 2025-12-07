import {useEffect, useMemo} from 'react'

import {useAtomValue, useSetAtom} from 'jotai'

import type {RealTimeStockItem, Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/sort'

import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import {useInfiniteDomesticStockList} from '@/pages/stockScreenerPage/api/query'
import {
    exchangeFilterAtom,
    priceChangeFilterAtom,
    priceChangeRateFilterAtom,
} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import {domesticStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'
import {mergeRealTimeStockData} from '@/pages/stockScreenerPage/utils/mergeRealTimeStockData'
import {toDomesticApiSortType} from '@/pages/stockScreenerPage/utils/sortMapper'

interface DomesticStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
    realTimeData?: Record<string, RealTimeStockItem>
}

const DomesticStockTable = ({favoriteStocks, onFavoriteToggle, realTimeData}: DomesticStockTableProps) => {
    const priceChangeFilter = useAtomValue(priceChangeFilterAtom)
    const priceChangeRateFilter = useAtomValue(priceChangeRateFilterAtom)
    const exchangeFilter = useAtomValue(exchangeFilterAtom)
    const category = exchangeFilter || 'all'

    const {sortState, handleSort} = useTableSort<SortField>()
    const sortType = toDomesticApiSortType(sortState)

    const {
        data: stocks,
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

    // stocks 변경 시 종목 코드만 atom에 업데이트
    const setDomesticStockCodes = useSetAtom(domesticStockCodesAtom)

    useEffect(() => {
        const codes = stocks.map((stock) => stock.itemCode)
        setDomesticStockCodes(codes)
    }, [stocks, setDomesticStockCodes])

    const stocksWithRealTime = useMemo(() => mergeRealTimeStockData(stocks, realTimeData), [stocks, realTimeData])

    const canFetchNext = Boolean(hasNextPage && !isFetchingNextPage)
    const loadMoreRef = useIntersectionObserver(fetchNextPage, canFetchNext)

    return (
        <div className="w-full rounded-lg border overflow-auto max-h-[calc(100vh-200px)]">
            <StockTable
                stocks={stocksWithRealTime}
                favoriteStocks={favoriteStocks}
                onFavoriteToggle={onFavoriteToggle}
                currentSortField={sortState.field}
                currentSortOrder={sortState.order}
                onSort={handleSort}
            />
            <div ref={loadMoreRef} className="h-1" />

            {isFetchingNextPage && (
                <div className="mt-2 flex justify-center items-center py-4 h-20">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                </div>
            )}
        </div>
    )
}

export default DomesticStockTable
