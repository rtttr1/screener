import {useSearchParams} from 'react-router-dom'

import OverseasMarketTabList from '@/pages/stockScreenerPage/components/Tab/OverseasMarketTabList'
import RegionTabList from '@/pages/stockScreenerPage/components/Tab/RegionTabList'
import {OVERSEAS_MARKETS, type OverseasMarketType} from '@/pages/stockScreenerPage/constants/overseasMarket'
import {REGIONS, type RegionType} from '@/pages/stockScreenerPage/constants/region'
import {URL_QUERIES} from '@/pages/stockScreenerPage/constants/urlQueries'

const StockMarketSelectionSection = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        [URL_QUERIES.REGION]: REGIONS.DOMESTIC,
    })

    const isOverseas = searchParams.get(URL_QUERIES.REGION) === REGIONS.OVERSEAS
    const currentRegion = searchParams.get(URL_QUERIES.REGION) as RegionType
    const currentOverseasMarket = searchParams.get(URL_QUERIES.OVERSEAS_MARKET) as OverseasMarketType

    const handleRegionTabClick = (region: RegionType) => {
        if (region === REGIONS.OVERSEAS) {
            setSearchParams({[URL_QUERIES.REGION]: region, [URL_QUERIES.OVERSEAS_MARKET]: OVERSEAS_MARKETS.NASDAQ})
        } else {
            setSearchParams({[URL_QUERIES.REGION]: region})
        }
    }

    const handleOverseasMarketTabClick = (market: OverseasMarketType) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set(URL_QUERIES.OVERSEAS_MARKET, market)
            return newParams
        })
    }

    return (
        <section aria-label="국내/해외 주식시장 선택" className="flex items-center gap-3">
            <RegionTabList currentRegion={currentRegion} onRegionTabClick={handleRegionTabClick} />

            {isOverseas && (
                <>
                    <div className="w-px h-8 bg-gray-200" />
                    <OverseasMarketTabList
                        currentOverseasMarket={currentOverseasMarket}
                        onOverseasMarketTabClick={handleOverseasMarketTabClick}
                    />
                </>
            )}
        </section>
    )
}

export default StockMarketSelectionSection
