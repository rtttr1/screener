import TabList from '@/common/components/TabList'
import {REGION_ITEMS, type RegionType} from '@/pages/stockScreenerPage/constants/region'

interface RegionTabListProps {
    currentRegion: RegionType
    onRegionTabClick: (region: RegionType) => void
}

const RegionTabList = ({currentRegion, onRegionTabClick}: RegionTabListProps) => {
    return <TabList items={REGION_ITEMS} currentItem={currentRegion} onItemClick={onRegionTabClick} />
}

export default RegionTabList
