import type {RealTimeStockItem, Stock} from '@/pages/stockScreenerPage/types/api'

/**
 * 실시간 시세 데이터를 기존 Stock 데이터와 병합
 * @param stocks 기존 주식 목록
 * @param realTimeData 실시간 시세 데이터 (itemCode를 키로 하는 객체)
 * @returns 실시간 시세가 반영된 주식 목록
 */
export const mergeRealTimeStockData = (
    stocks: Stock[],
    realTimeData: Record<string, RealTimeStockItem> | undefined,
): Stock[] => {
    if (!realTimeData || Object.keys(realTimeData).length === 0) {
        return stocks
    }

    return stocks.map((stock) => {
        const realTimeItem = realTimeData[stock.itemCode]

        if (!realTimeItem) {
            return stock
        }

        // 실시간 시세 데이터로 업데이트
        return {
            ...stock,
            // 실시간으로 업데이트되는 필드들
            closePrice: realTimeItem.closePrice,
            compareToPreviousClosePrice: realTimeItem.compareToPreviousClosePrice,
            fluctuationsRatio: realTimeItem.fluctuationsRatio,
            compareToPreviousPrice: realTimeItem.compareToPreviousPrice,
        }
    })
}
