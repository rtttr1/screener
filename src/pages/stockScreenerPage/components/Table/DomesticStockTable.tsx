import {useAtomValue} from 'jotai'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import {useDomesticStockList} from '@/pages/stockScreenerPage/api/query'
import {exchangeFilterAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'
import StockTable from '@/pages/stockScreenerPage/components/Table/StockTable'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'

interface DomesticStockTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const DomesticStockTable = ({favoriteStocks, onFavoriteToggle}: DomesticStockTableProps) => {
    const exchangeFilter = useAtomValue(exchangeFilterAtom)
    const category = exchangeFilter || 'all'

    const {sortState, handleSort} = useTableSort<SortField>()

    const {data: domesticStockList} = useDomesticStockList({
        sortType: 'marketValue',
        category,
    })

    const stocks = domesticStockList?.result?.stocks || []

    return (
        <StockTable
            stocks={stocks}
            favoriteStocks={favoriteStocks}
            onFavoriteToggle={onFavoriteToggle}
            currentSortField={sortState.field}
            currentSortOrder={sortState.order}
            onSort={handleSort}
        />
    )
}

export default DomesticStockTable
