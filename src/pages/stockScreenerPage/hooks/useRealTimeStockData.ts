import {useAtomValue} from 'jotai'

import {domesticStockCodesAtom, overseasStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import {useRealtimeStockSubscription} from '@/pages/stockScreenerPage/sharedWorker/useRealtimeStockSubscription'

// 실시간 시세 조회 국내 / 해외 쿼리 구독 및 데이터 필터링 수행 커스텀훅
export const useRealTimeStockData = () => {
    const domesticItemCodes = useAtomValue(domesticStockCodesAtom)
    const overseasItemCodes = useAtomValue(overseasStockCodesAtom)

    useRealtimeStockSubscription({region: 'domestic', codes: domesticItemCodes})
    useRealtimeStockSubscription({region: 'worldstock', codes: overseasItemCodes})
}

// function filterItemsByCodes(
//     items: Record<string, RealTimeStockItem> | undefined,
//     codes: string[],
// ): Record<string, RealTimeStockItem> | undefined {
//     if (!items) {
//         return undefined
//     }

//     const result: Record<string, RealTimeStockItem> = {}

//     codes.forEach((code) => {
//         if (items[code]) {
//             result[code] = items[code]
//         }
//     })

//     return result
// }
