import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField} from '@/pages/stockScreenerPage/types/tableSort'

import FilterSection from '@/pages/stockScreenerPage/components/FilterSection'
import StockMarketSelectionSection from '@/pages/stockScreenerPage/components/StockMarketSelectionSection'
import StockTable from '@/pages/stockScreenerPage/components/StockTable'
import {useTableSort} from '@/pages/stockScreenerPage/hooks/useTableSort'

const StockScreenerPage = () => {
    const {sortState, handleSort} = useTableSort<SortField>()

    const favoriteStocks: Stock[] = []

    const handleFavoriteToggle = () => {
        // TODO: 즐겨찾기 토글 로직 구현
    }

    return (
        <main className="px-8 py-4">
            <div className="flex justify-between">
                <StockMarketSelectionSection />
                <FilterSection />
            </div>

            <StockTable
                favoriteStocks={favoriteStocks}
                onFavoriteToggle={handleFavoriteToggle}
                currentSortField={sortState.field}
                currentSortOrder={sortState.order}
                onSort={handleSort}
            />
        </main>
    )
}

export default StockScreenerPage
