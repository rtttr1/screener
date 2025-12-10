import {useAtomValue} from 'jotai'

import {domesticStockCodesAtom, overseasStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import {useRealtimeStockSubscription} from '@/pages/stockScreenerPage/sharedWorker/useRealtimeStockSubscription'

export const useRealTimeStockData = () => {
    const domesticItemCodes = useAtomValue(domesticStockCodesAtom)
    const overseasItemCodes = useAtomValue(overseasStockCodesAtom)

    useRealtimeStockSubscription({region: 'domestic', codes: domesticItemCodes})
    useRealtimeStockSubscription({region: 'worldstock', codes: overseasItemCodes})
}
