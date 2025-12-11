import {useMemo} from 'react'

import {useAtomValue} from 'jotai'

import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {domesticStockCodesAtom, worldstockStockCodesAtom} from '@/pages/stockScreenerPage/atoms/stockCodesAtom'
import {REGIONS} from '@/pages/stockScreenerPage/constants/region'
import {useRealtimeStockSubscription} from '@/pages/stockScreenerPage/sharedWorker/useRealtimeStockSubscription'

interface UseSendRealTimeStockCodesParams {
    favoriteStocks?: Stock[]
}

export const useSendRealTimeStockCodes = ({favoriteStocks = []}: UseSendRealTimeStockCodesParams = {}) => {
    const domesticItemCodes = useAtomValue(domesticStockCodesAtom)
    const worldstockItemCodes = useAtomValue(worldstockStockCodesAtom)

    const {domesticFavoriteCodes, worldstockFavoriteCodes} = useMemo(() => {
        const domestic: string[] = []
        const worldstock: string[] = []

        favoriteStocks.forEach((stock) => {
            if (stock.stockType === 'domestic') {
                domestic.push(stock.itemCode)
            } else if (stock.stockType === 'worldstock') {
                worldstock.push(stock.itemCode)
            }
        })

        return {
            domesticFavoriteCodes: domestic,
            worldstockFavoriteCodes: worldstock,
        }
    }, [favoriteStocks])

    const allDomesticCodes = useMemo(() => {
        const combined = [...domesticItemCodes, ...domesticFavoriteCodes]

        return Array.from(new Set(combined))
    }, [domesticItemCodes, domesticFavoriteCodes])

    const allWorldstockCodes = useMemo(() => {
        const combined = [...worldstockItemCodes, ...worldstockFavoriteCodes]

        return Array.from(new Set(combined))
    }, [worldstockItemCodes, worldstockFavoriteCodes])

    useRealtimeStockSubscription({region: REGIONS.DOMESTIC, codes: allDomesticCodes})
    useRealtimeStockSubscription({region: REGIONS.WORLDSTOCK, codes: allWorldstockCodes})
}
