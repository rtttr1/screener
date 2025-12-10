import {Suspense} from 'react'

import {QueryRetryErrorBoundary} from '@/common/components/QueryRetryErrorBoundary'
import DomesticStockTable from '@/pages/stockScreenerPage/components/Table/DomesticStockTable'
import FavoriteStockTable from '@/pages/stockScreenerPage/components/Table/FavoriteStockTable'
import OverseasStockTable from '@/pages/stockScreenerPage/components/Table/OverseasStockTable'
import StockTableSkeleton from '@/pages/stockScreenerPage/components/Table/StockTableSkeleton'
import TableErrorView from '@/pages/stockScreenerPage/components/Table/TableErrorView'
import {useFavoriteStocks} from '@/pages/stockScreenerPage/hooks/useFavoriteStocks'
import {useRealTimeStockData} from '@/pages/stockScreenerPage/hooks/useRealTimeStockData'
import {useUpdateStockListData} from '@/pages/stockScreenerPage/sharedWorker/useUpdateStockListData'

interface TableSectionProps {
    isDomestic: boolean
}

const TableSection = ({isDomestic}: TableSectionProps) => {
    const {favoriteStocks, handleFavoriteToggle, updateFavoriteStocks} = useFavoriteStocks()

    useRealTimeStockData()
    useUpdateStockListData({
        updateFavoriteStocks,
        favoriteStocks,
    })

    return (
        <div className="flex gap-4">
            <QueryRetryErrorBoundary
                FallbackComponent={({resetErrorBoundary}) => (
                    <div className="w-full rounded-lg border">
                        <TableErrorView resetErrorBoundary={resetErrorBoundary} />
                    </div>
                )}
            >
                <Suspense fallback={<StockTableSkeleton />}>
                    {isDomestic ? (
                        <DomesticStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
                    ) : (
                        <OverseasStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
                    )}
                </Suspense>
            </QueryRetryErrorBoundary>
            {favoriteStocks.length > 0 && (
                <FavoriteStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
            )}
        </div>
    )
}

export default TableSection
