import {useAtom} from 'jotai'

import type {PriceChangeRateType} from '@/pages/stockScreenerPage/constants/priceChangeRate'

import {priceChangeRateFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import Filter from '@/pages/stockScreenerPage/components/Filter'
import {PRICE_CHANGE_RATE_OPTIONS} from '@/pages/stockScreenerPage/constants/priceChangeRate'

const PriceChangeRateFilter = () => {
    const [selectedPriceChangeRate, setSelectedPriceChangeRate] = useAtom(priceChangeRateFilterAtom)

    const handleConfirm = (value: PriceChangeRateType | null) => {
        setSelectedPriceChangeRate(value)
    }

    const handleReset = () => {
        setSelectedPriceChangeRate(null)
    }

    return (
        <Filter
            title="등락률"
            options={PRICE_CHANGE_RATE_OPTIONS}
            selectedValue={selectedPriceChangeRate}
            onConfirm={handleConfirm}
            onReset={handleReset}
        />
    )
}

export default PriceChangeRateFilter
