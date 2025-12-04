import {useSearchParams} from 'react-router-dom'

import type {Stock} from '@/pages/stockScreenerPage/types/api'

import FilterSection from '@/pages/stockScreenerPage/components/Filter/FilterSection'
import DomesticStockTable from '@/pages/stockScreenerPage/components/Table/DomesticStockTable'
import OverseasStockTable from '@/pages/stockScreenerPage/components/Table/OverseasStockTable'
import StockMarketSelectionSection from '@/pages/stockScreenerPage/components/Table/StockMarketSelectionSection'
import {REGIONS} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'

const StockScreenerPage = () => {
    const [searchParams] = useSearchParams()
    const currentRegion = searchParams.get(URL_QUERIES.REGION) || REGIONS.DOMESTIC

    const favoriteStocks: Stock[] = []

    const handleFavoriteToggle = (stock: Stock) => {
        // TODO: 즐겨찾기 토글 로직 구현
        console.log('Toggle favorite:', stock)
    }

    const isDomestic = currentRegion === REGIONS.DOMESTIC

    return (
        <main className="px-8 py-4">
            <div className="flex justify-between">
                <StockMarketSelectionSection />
                <FilterSection />
            </div>

            {isDomestic ? (
                <DomesticStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
            ) : (
                <OverseasStockTable favoriteStocks={favoriteStocks} onFavoriteToggle={handleFavoriteToggle} />
            )}
        </main>
    )
}

export default StockScreenerPage
