import RegionTabList from '@/pages/stockScreenerPage/components/Tab/RegionTabList'
import WorldstockMarketTabList from '@/pages/stockScreenerPage/components/Tab/WorldstockMarketTabList'
import {REGIONS, type RegionType} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'
import {WORLDSTOCK_MARKETS, type WorldstockMarketType} from '@/pages/stockScreenerPage/constants/worldstockMarket'

interface StockMarketSelectionSectionProps {
    searchParams: URLSearchParams
    setSearchParams: (newSearchParams: URLSearchParams) => void
}

const StockMarketSelectionSection = ({searchParams, setSearchParams}: StockMarketSelectionSectionProps) => {
    const currentRegion = (searchParams.get(URL_QUERIES.REGION) || REGIONS.DOMESTIC) as RegionType
    const currentWorldstockMarket = (searchParams.get(URL_QUERIES.WORLDSTOCK_MARKET) ||
        WORLDSTOCK_MARKETS.NASDAQ) as WorldstockMarketType

    const handleRegionTabClick = (region: RegionType) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(URL_QUERIES.REGION, region)

        if (region === REGIONS.DOMESTIC) {
            // 국내로 전환할 때 해외 시장 쿼리 삭제
            newSearchParams.delete(URL_QUERIES.WORLDSTOCK_MARKET)
        } else if (region === REGIONS.WORLDSTOCK) {
            // 해외로 전환할 때 해외 시장이 없으면 기본값 설정
            if (!newSearchParams.get(URL_QUERIES.WORLDSTOCK_MARKET)) {
                newSearchParams.set(URL_QUERIES.WORLDSTOCK_MARKET, WORLDSTOCK_MARKETS.NASDAQ)
            }
        }

        setSearchParams(newSearchParams)
    }

    const handleWorldstockMarketTabClick = (market: WorldstockMarketType) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(URL_QUERIES.WORLDSTOCK_MARKET, market)
        setSearchParams(newSearchParams)
    }

    return (
        <section aria-label="국내/해외 주식시장 선택" className="flex items-center gap-4 p-4">
            <RegionTabList currentRegion={currentRegion} onRegionTabClick={handleRegionTabClick} />
            {currentRegion === REGIONS.WORLDSTOCK && (
                <WorldstockMarketTabList
                    currentWorldstockMarket={currentWorldstockMarket}
                    onWorldstockMarketTabClick={handleWorldstockMarketTabClick}
                />
            )}
        </section>
    )
}

export default StockMarketSelectionSection
