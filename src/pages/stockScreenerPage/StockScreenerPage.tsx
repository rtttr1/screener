import {useSearchParams} from 'react-router-dom'

import FilterSection from '@/pages/stockScreenerPage/components/Filter/FilterSection'
import StockMarketSelectionSection from '@/pages/stockScreenerPage/components/Tab/StockMarketSelectionSection'
import TableSection from '@/pages/stockScreenerPage/components/Table/TableSection'
import {REGIONS} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'

const StockScreenerPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentRegion = searchParams.get(URL_QUERIES.REGION) || REGIONS.DOMESTIC
    const isDomestic = currentRegion === REGIONS.DOMESTIC

    return (
        <main className="px-8 py-4">
            <div className="flex justify-between">
                <StockMarketSelectionSection searchParams={searchParams} setSearchParams={setSearchParams} />
                <FilterSection isDomestic={isDomestic} />
            </div>

            <TableSection isDomestic={isDomestic} />
        </main>
    )
}

export default StockScreenerPage
