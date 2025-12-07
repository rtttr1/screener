import {Suspense} from 'react'

import {useSearchParams} from 'react-router-dom'

import type {Stock} from '@/pages/stockScreenerPage/types/api'

import FilterSection from '@/pages/stockScreenerPage/components/Filter/FilterSection'
import DomesticStockTable from '@/pages/stockScreenerPage/components/Table/DomesticStockTable'
import FavoriteStockTable from '@/pages/stockScreenerPage/components/Table/FavoriteStockTable'
import OverseasStockTable from '@/pages/stockScreenerPage/components/Table/OverseasStockTable'
import StockMarketSelectionSection from '@/pages/stockScreenerPage/components/Table/StockMarketSelectionSection'
import StockTableSkeleton from '@/pages/stockScreenerPage/components/Table/StockTableSkeleton'
import {REGIONS} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'
import {useFavoriteStocks} from '@/pages/stockScreenerPage/hooks/useFavoriteStocks'

const StockScreenerPage = () => {
    const [searchParams] = useSearchParams()
    const currentRegion = searchParams.get(URL_QUERIES.REGION) || REGIONS.DOMESTIC

    const {favoriteStocks, toggleFavorite} = useFavoriteStocks()

    const handleFavoriteToggle = (stock: Stock) => {
        toggleFavorite(stock)
    }

    const isDomestic = currentRegion === REGIONS.DOMESTIC

    return (
        <main className="px-8 py-4">
            <div className="flex justify-between">
                <StockMarketSelectionSection />
                <FilterSection />
            </div>

            <div className="flex gap-4">
                <Suspense fallback={<StockTableSkeleton />}>
                    {isDomestic ? (
                        <DomesticStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
                    ) : (
                        <OverseasStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
                    )}
                </Suspense>
                {favoriteStocks.length > 0 && (
                    <FavoriteStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
                )}
            </div>
        </main>
    )
}

export default StockScreenerPage
