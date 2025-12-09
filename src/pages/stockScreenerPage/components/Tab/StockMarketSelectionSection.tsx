import {useSearchParams} from 'react-router-dom'

import OverseasMarketTabList from '@/pages/stockScreenerPage/components/Tab/OverseasMarketTabList'
import RegionTabList from '@/pages/stockScreenerPage/components/Tab/RegionTabList'
import {OVERSEAS_MARKETS, type OverseasMarketType} from '@/pages/stockScreenerPage/constants/overseasMarket'
import {REGIONS, type RegionType} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'

const StockMarketSelectionSection = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentRegion = (searchParams.get(URL_QUERIES.REGION) || REGIONS.DOMESTIC) as RegionType
    const currentOverseasMarket = (searchParams.get(URL_QUERIES.OVERSEAS_MARKET) ||
        OVERSEAS_MARKETS.NASDAQ) as OverseasMarketType

    const handleRegionTabClick = (region: RegionType) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(URL_QUERIES.REGION, region)

        // 해외로 전환할 때 해외 시장이 없으면 기본값 설정
        if (region === REGIONS.OVERSEAS && !newSearchParams.get(URL_QUERIES.OVERSEAS_MARKET)) {
            newSearchParams.set(URL_QUERIES.OVERSEAS_MARKET, OVERSEAS_MARKETS.NASDAQ)
        }

        setSearchParams(newSearchParams)
    }

    const handleOverseasMarketTabClick = (market: OverseasMarketType) => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set(URL_QUERIES.OVERSEAS_MARKET, market)
        setSearchParams(newSearchParams)
    }

    return (
        <section aria-label="국내/해외 주식시장 선택" className="flex items-center gap-4 p-4">
            <RegionTabList currentRegion={currentRegion} onRegionTabClick={handleRegionTabClick} />
            {currentRegion === REGIONS.OVERSEAS && (
                <OverseasMarketTabList
                    currentOverseasMarket={currentOverseasMarket}
                    onOverseasMarketTabClick={handleOverseasMarketTabClick}
                />
            )}
        </section>
    )
}

export default StockMarketSelectionSection
