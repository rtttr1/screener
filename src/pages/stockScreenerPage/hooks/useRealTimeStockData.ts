import {useAtomValue} from 'jotai'

import {domesticStockCodesAtom, worldstockStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import {useRealtimeStockSubscription} from '@/pages/stockScreenerPage/sharedWorker/useRealtimeStockSubscription'

export const useSendRealTimeStockCodes = () => {
    const domesticItemCodes = useAtomValue(domesticStockCodesAtom)
    const worldstockItemCodes = useAtomValue(worldstockStockCodesAtom)

    useRealtimeStockSubscription({region: 'domestic', codes: domesticItemCodes})
    useRealtimeStockSubscription({region: 'worldstock', codes: worldstockItemCodes})
}
