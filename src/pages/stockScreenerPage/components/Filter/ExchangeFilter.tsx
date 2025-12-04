import {useAtom} from 'jotai'

import type {ExchangeType} from '@/pages/stockScreenerPage/constants/exchange'

import Filter from '@/common/components/Filter'
import {exchangeFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
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
