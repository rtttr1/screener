import type {WorldstockStock, Stock} from '@/pages/stockScreenerPage/types/api'

/**
 * 해외 주식 응답을 국내 주식 형식에 맞게 변환
 * @param worldstockStock 해외 주식 API 응답
 * @returns 국내 주식 형식에 맞춘 Stock 타입
 */
export const mapWorldstockStockToStock = (worldstockStock: WorldstockStock): Stock => {
    const {reutersCode, marketValueKrwHangeul, stockExchangeType, ...rest} = worldstockStock

    return {
        ...rest,
        stockType: 'worldstock',
        itemCode: reutersCode, // reutersCode → itemCode
        marketValueHangeul: marketValueKrwHangeul, // marketValueKrwHangeul → marketValueHangeul
        stockExchangeName: stockExchangeType.name, // stockExchangeType.name → stockExchangeName
    }
}
