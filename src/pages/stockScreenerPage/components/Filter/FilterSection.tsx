import {useSearchParams} from 'react-router-dom'

import ExchangeFilter from '@/pages/stockScreenerPage/components/Filter/ExchangeFilter'
import FilterResetAllButton from '@/pages/stockScreenerPage/components/Filter/FilterResetAllButton'
import PriceChangeFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeFilter'
import PriceChangeRateFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeRateFilter'
import {REGIONS} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'

const FilterSection = () => {
    const [searchParams] = useSearchParams()
    const isDomestic = searchParams.get(URL_QUERIES.REGION) === REGIONS.DOMESTIC

    return (
        <section aria-label="스크리너 필터" className="flex items-center justify-end gap-2 p-4">
            <PriceChangeFilter />
            <PriceChangeRateFilter />
            {isDomestic && <ExchangeFilter />}
            <FilterResetAllButton />
        </section>
    )
}

export default FilterSection
