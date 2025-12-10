import ExchangeFilter from '@/pages/stockScreenerPage/components/Filter/ExchangeFilter'
import FilterResetAllButton from '@/pages/stockScreenerPage/components/Filter/FilterResetAllButton'
import PriceChangeFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeFilter'
import PriceChangeRateFilter from '@/pages/stockScreenerPage/components/Filter/PriceChangeRateFilter'

interface FilterSectionProps {
    isDomestic: boolean
}
const FilterSection = ({isDomestic}: FilterSectionProps) => {
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
