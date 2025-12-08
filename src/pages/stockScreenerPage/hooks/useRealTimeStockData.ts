import {useMemo} from 'react'

import {useAtomValue} from 'jotai'

import type {RealTimeStockItem, Stock} from '@/pages/stockScreenerPage/types/api'

import {useRealTimeStockQuery} from '@/pages/stockScreenerPage/api/query'
import {domesticStockCodesAtom, overseasStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'

// 실시간 시세 조회 국내 / 해외 쿼리 구독 및 데이터 필터링 수행 커스텀훅
export const useRealTimeStockData = (favoriteStocks: Stock[]) => {
    const domesticItemCodes = useAtomValue(domesticStockCodesAtom)
    const overseasItemCodes = useAtomValue(overseasStockCodesAtom)

    // 관심종목 코드 추출
    const favoriteDomesticCodes = useMemo(
        () => favoriteStocks.filter((stock) => stock.stockType === 'domestic').map((stock) => stock.itemCode),
        [favoriteStocks],
    )
    const favoriteOverseasCodes = useMemo(
        () => favoriteStocks.filter((stock) => stock.stockType === 'overseas').map((stock) => stock.itemCode),
        [favoriteStocks],
    )

    // 실시간 시세 조회 (메인 테이블 + 관심종목 테이블 통합)
    const allDomesticItemCodes = [...new Set([...domesticItemCodes, ...favoriteDomesticCodes])]
    const allOverseasItemCodes = [...new Set([...overseasItemCodes, ...favoriteOverseasCodes])]

    const {data: domesticData} = useRealTimeStockQuery('domestic', allDomesticItemCodes)
    const {data: overseasData} = useRealTimeStockQuery('worldstock', allOverseasItemCodes)

    const domesticItems = domesticData?.result.items
    const overseasItems = overseasData?.result.items

    // 각 테이블에 전달할 데이터 필터링
    const domesticRealTimeItems = useMemo(
        () => filterItemsByCodes(domesticItems, domesticItemCodes),
        [domesticItems, domesticItemCodes],
    )
    const overseasRealTimeItems = useMemo(
        () => filterItemsByCodes(overseasItems, overseasItemCodes),
        [overseasItems, overseasItemCodes],
    )
    const favoriteRealTimeItems = useMemo(
        () =>
            filterItemsByCodes({...domesticItems, ...overseasItems}, [
                ...favoriteDomesticCodes,
                ...favoriteOverseasCodes,
            ]),
        [domesticItems, overseasItems, favoriteDomesticCodes, favoriteOverseasCodes],
    )

    return {domesticRealTimeItems, overseasRealTimeItems, favoriteRealTimeItems}
}

function filterItemsByCodes(
    items: Record<string, RealTimeStockItem> | undefined,
    codes: string[],
): Record<string, RealTimeStockItem> | undefined {
    if (!items) {
        return undefined
    }

    const result: Record<string, RealTimeStockItem> = {}

    codes.forEach((code) => {
        if (items[code]) {
            result[code] = items[code]
        }
    })

    return result
}
