import {useAtom} from 'jotai'

import {hasActiveFiltersAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import ExchangeFilter from '@/pages/stockScreenerPage/components/Filter/ExchangeFilter'
import FilterResetAllButton from '@/pages/stockScreenerPage/components/Filter/FilterResetAllButton'
import PriceChangeFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeFilter'
import PriceChangeRateFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeRateFilter'

const FilterSection = () => {
    const [hasActiveFilters] = useAtom(hasActiveFiltersAtom)

    return (
        <section aria-label="스크리너 필터" className="flex items-center justify-end gap-2 p-4">
            <PriceChangeFilter />
            <PriceChangeRateFilter />
            <ExchangeFilter />
            {hasActiveFilters && <FilterResetAllButton />}
        </section>
    )
}

export default FilterSection
