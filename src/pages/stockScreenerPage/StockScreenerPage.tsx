import FilterSection from '@/pages/stockScreenerPage/components/FilterSection'
import StockMarketSelectionSection from '@/pages/stockScreenerPage/components/StockMarketSelectionSection'

const StockScreenerPage = () => {
    return (
        <main className="px-8 py-4">
            <div className="flex justify-between">
                <StockMarketSelectionSection />
                <FilterSection />
            </div>
            {/* Stock Screener Table */}
        </main>
    )
}

export default StockScreenerPage
