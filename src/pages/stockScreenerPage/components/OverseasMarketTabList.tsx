import TabList from '@/common/components/TabList'
import {OVERSEAS_MARKET_ITEMS, type OverseasMarketType} from '@/pages/stockScreenerPage/constants/overseasMarket'

interface OverseasMarketTabListProps {
    currentOverseasMarket: OverseasMarketType
    onOverseasMarketTabClick: (market: OverseasMarketType) => void
}

const OverseasMarketTabList = ({currentOverseasMarket, onOverseasMarketTabClick}: OverseasMarketTabListProps) => {
    return (
        <TabList
            items={OVERSEAS_MARKET_ITEMS}
            currentItem={currentOverseasMarket}
            onItemClick={onOverseasMarketTabClick}
        />
    )
}

export default OverseasMarketTabList
