import TabList from '@/common/components/TabList'
import {WORLDSTOCK_MARKET_ITEMS, type WorldstockMarketType} from '@/pages/stockScreenerPage/constants/worldstockMarket'

interface WorldstockMarketTabListProps {
    currentWorldstockMarket: WorldstockMarketType
    onWorldstockMarketTabClick: (market: WorldstockMarketType) => void
}

const WorldstockMarketTabList = ({
    currentWorldstockMarket,
    onWorldstockMarketTabClick,
}: WorldstockMarketTabListProps) => {
    return (
        <TabList
            items={WORLDSTOCK_MARKET_ITEMS}
            currentItem={currentWorldstockMarket}
            onItemClick={onWorldstockMarketTabClick}
        />
    )
}

export default WorldstockMarketTabList
