import {useMemo} from 'react'

import {useAtomValue} from 'jotai'

import type {RealTimeStockItem, Stock} from '@/pages/stockScreenerPage/types/api'

import {useRealTimeStock} from '@/pages/stockScreenerPage/api/query'
import {domesticStockCodesAtom, overseasStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'

export const useRealTimeStockData = (favoriteStocks: Stock[]) => {
    // 각 테이블의 종목 코드를 atom에서 가져오기
    const domesticCodes = useAtomValue(domesticStockCodesAtom)
    const overseasCodes = useAtomValue(overseasStockCodesAtom)
    const favoriteDomesticCodes = useMemo(
        () => favoriteStocks.filter((stock) => stock.stockType === 'domestic').map((stock) => stock.itemCode),
        [favoriteStocks],
    )
    const favoriteOverseasCodes = useMemo(
        () => favoriteStocks.filter((stock) => stock.stockType === 'overseas').map((stock) => stock.itemCode),
        [favoriteStocks],
    )

    // 국내/해외 종목 코드 통합 (중복 제거)
    const allDomesticCodes = useMemo(
        () => [...new Set([...domesticCodes, ...favoriteDomesticCodes])],
        [domesticCodes, favoriteDomesticCodes],
    )
    const allOverseasCodes = useMemo(
        () => [...new Set([...overseasCodes, ...favoriteOverseasCodes])],
        [overseasCodes, favoriteOverseasCodes],
    )

    // 실시간 시세 조회 (해당 타입의 종목 코드가 있을 때만 활성화)
    const {data: domesticRealTimeData} = useRealTimeStock('domestic', allDomesticCodes)
    const {data: overseasRealTimeData} = useRealTimeStock('worldstock', allOverseasCodes)

    // 실시간 시세 데이터
    const allDomesticRealTimeItems = domesticRealTimeData?.result.items
    const allOverseasRealTimeItems = overseasRealTimeData?.result.items

    // 각 테이블에 전달할 실시간 시세 데이터 필터링
    const domesticRealTimeItems = useMemo(() => {
        if (!allDomesticRealTimeItems) {
            return undefined
        }
        return Object.fromEntries(
            Object.entries(allDomesticRealTimeItems).filter(([code]) => domesticCodes.includes(code)),
        ) as Record<string, RealTimeStockItem>
    }, [allDomesticRealTimeItems, domesticCodes])

    const overseasRealTimeItems = useMemo(() => {
        if (!allOverseasRealTimeItems) {
            return undefined
        }
        return Object.fromEntries(
            Object.entries(allOverseasRealTimeItems).filter(([code]) => overseasCodes.includes(code)),
        ) as Record<string, RealTimeStockItem>
    }, [allOverseasRealTimeItems, overseasCodes])

    const favoriteRealTimeItems = useMemo(() => {
        const allItems = {...allDomesticRealTimeItems, ...allOverseasRealTimeItems}
        if (!Object.keys(allItems).length) {
            return undefined
        }

        const favoriteCodes = [...favoriteDomesticCodes, ...favoriteOverseasCodes]
        return Object.fromEntries(Object.entries(allItems).filter(([code]) => favoriteCodes.includes(code))) as Record<
            string,
            RealTimeStockItem
        >
    }, [allDomesticRealTimeItems, allOverseasRealTimeItems, favoriteDomesticCodes, favoriteOverseasCodes])

    return {
        domesticRealTimeItems,
        overseasRealTimeItems,
        favoriteRealTimeItems,
    }
}
