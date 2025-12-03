import {useAtom} from 'jotai'

import type {ExchangeType} from '@/pages/stockScreenerPage/constants/exchange'

import {exchangeFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import Filter from '@/pages/stockScreenerPage/components/Filter'
import {EXCHANGE_OPTIONS} from '@/pages/stockScreenerPage/constants/exchange'

const ExchangeFilter = () => {
    const [selectedExchange, setSelectedExchange] = useAtom(exchangeFilterAtom)

    const handleConfirm = (value: ExchangeType | null) => {
        setSelectedExchange(value)
    }

    const handleReset = () => {
        setSelectedExchange(null)
    }

    return (
        <Filter
            title="거래소"
            options={EXCHANGE_OPTIONS}
            selectedValue={selectedExchange}
            onConfirm={handleConfirm}
            onReset={handleReset}
        />
    )
}

export default ExchangeFilter
