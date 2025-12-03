import {useAtom} from 'jotai'

import {hasActiveFiltersAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import ExchangeFilter from '@/pages/stockScreenerPage/components/ExchangeFilter'
import FilterResetAllButton from '@/pages/stockScreenerPage/components/FilterResetAllButton'
import PriceChangeFilter from '@/pages/stockScreenerPage/components/PriceChangeFilter'
import PriceChangeRateFilter from '@/pages/stockScreenerPage/components/PriceChangeRateFilter'

const FilterSection = () => {
    const [hasActiveFilters] = useAtom(hasActiveFiltersAtom)

    return (
        <section aria-label="필터 섹션" className="flex items-center justify-end gap-2 p-4">
            <PriceChangeFilter />
            <PriceChangeRateFilter />
            <ExchangeFilter />
            {hasActiveFilters && <FilterResetAllButton />}
        </section>
    )
}

export default FilterSection
