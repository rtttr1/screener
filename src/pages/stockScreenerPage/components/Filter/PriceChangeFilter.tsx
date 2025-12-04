import {useAtom} from 'jotai'

import type {PriceChangeType} from '@/pages/stockScreenerPage/constants/priceChange'

import MultiSelectFilter from '@/common/components/MultiSelectFilter'
import {priceChangeFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import {PRICE_CHANGE_OPTIONS} from '@/pages/stockScreenerPage/constants/priceChange'

const PriceChangeFilter = () => {
    const [selectedPriceChanges, setSelectedPriceChanges] = useAtom(priceChangeFilterAtom)

    const handleConfirm = (values: PriceChangeType[]) => {
        setSelectedPriceChanges(values)
    }

    const handleReset = () => {
        setSelectedPriceChanges([])
    }

    return (
        <MultiSelectFilter
            title="등락"
            options={PRICE_CHANGE_OPTIONS}
            selectedValues={selectedPriceChanges}
            onConfirm={handleConfirm}
            onReset={handleReset}
        />
    )
}

export default PriceChangeFilter
