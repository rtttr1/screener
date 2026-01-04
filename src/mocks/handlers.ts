import {http, HttpResponse, type HttpHandler} from 'msw'

let errorCount = 0

// 실시간 시세 모킹 데이터 저장소
const realTimeStockData: Record<
    string,
    {
        closePrice: number
        compareToPreviousClosePrice: number
        fluctuationsRatio: number
        accumulatedTradingVolume: number
        accumulatedTradingValue: number
    }
> = {}

// 실시간 시세 데이터 초기화
function initializeRealTimeData(reutersCodes: string[]) {
    reutersCodes.forEach((code) => {
        if (!realTimeStockData[code]) {
            realTimeStockData[code] = {
                closePrice: 10000 + Math.random() * 5000,
                compareToPreviousClosePrice: (Math.random() - 0.5) * 1000,
                fluctuationsRatio: (Math.random() - 0.5) * 10,
                accumulatedTradingVolume: 1000000 + Math.random() * 1000000,
                accumulatedTradingValue: 100000000 + Math.random() * 100000000,
            }
        }
    })
}

// 실시간 시세 데이터 업데이트 (값 변경 시뮬레이션)
function updateRealTimeData(reutersCodes: string[]) {
    reutersCodes.forEach((code) => {
        if (realTimeStockData[code]) {
            const data = realTimeStockData[code]
            // 가격 변동 시뮬레이션 (-5% ~ +5%)
            const priceChange = (Math.random() - 0.5) * 0.1
            const newPrice = data.closePrice * (1 + priceChange)
            const priceDiff = newPrice - data.closePrice
            const changeRate = (priceDiff / data.closePrice) * 100

            data.closePrice = Math.max(1000, newPrice) // 최소 가격 보장
            data.compareToPreviousClosePrice = priceDiff
            data.fluctuationsRatio = changeRate
            data.accumulatedTradingVolume += Math.floor(Math.random() * 10000)
            data.accumulatedTradingValue += Math.floor(Math.random() * 1000000)
        }
    })
}

export const handlers: HttpHandler[] = [
    http.get('*/stock/domestic/stockList', ({request}) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') || '1')
        errorCount++
        // 초기 요청에서만 에러 발생
        if (errorCount < 4) {
            return HttpResponse.json({message: '서버 오류가 발생했습니다.'}, {status: 500})
        }
        // 정상 응답
        const pageSize = Number(url.searchParams.get('pageSize') || '20')
        const mockStocks = Array.from({length: pageSize}, (_, i) => ({
            stockType: 'domestic' as const,
            stockEndType: 'STOCK',
            itemCode: `TEST${page}${String(i + 1).padStart(3, '0')}`,
            stockName: `테스트 종목 ${page}-${i + 1}`,
            closePrice: String((10000 + i * 100) * page),
            compareToPreviousClosePrice: String(i * 10),
            fluctuationsRatio: String((i * 0.1).toFixed(2)),
            compareToPreviousPrice: {
                name: (i % 5 === 0 ? 'RISING' : i % 5 === 1 ? 'FALLING' : 'UNCHANGED') as
                    | 'RISING'
                    | 'FALLING'
                    | 'UNCHANGED',
            },
            accumulatedTradingVolume: String(1000000 + i * 10000),
            accumulatedTradingValue: String(100000000 + i * 1000000),
            marketValue: String(1000000000 + i * 10000000),
            marketValueHangeul: '1조원',
            currencyType: {
                code: 'KRW',
                name: '원',
            },
            stockExchangeName: 'KRX',
        }))
        return HttpResponse.json({
            isSuccess: true,
            result: {
                stocks: mockStocks,
                page,
                pageSize,
                totalCount: 100, // 총 100개라고 가정 (5페이지까지 가능)
                stockListSortType: url.searchParams.get('sortType') || 'marketValue',
            },
        })
    }),

    // 실시간 시세 API 모킹
    http.post('*/m-stock/realTime/stock', async ({request}) => {
        const url = new URL(request.url)
        const type = url.searchParams.get('type') || 'domestic'
        const body = (await request.json()) as {reutersCodes: string[]}
        const {reutersCodes} = body

        // 초기 데이터 설정
        initializeRealTimeData(reutersCodes)

        // 데이터 업데이트 (값 변경 시뮬레이션)
        updateRealTimeData(reutersCodes)

        // 응답 데이터 생성
        const items: Record<
            string,
            {
                itemCode: string
                stockName: string
                closePrice: string
                compareToPreviousClosePrice: string
                fluctuationsRatio: string
                compareToPreviousPrice: {
                    name: 'UPPER_LIMIT' | 'RISING' | 'FALLING' | 'UNCHANGED' | 'LOWER_LIMIT'
                }
                accumulatedTradingVolume: string
                accumulatedTradingValue: string
                currencyType: {
                    code: string
                    name: string
                }
                stockExchangeName: string
                marketStatus: 'OPEN' | 'CLOSE'
            }
        > = {}
        reutersCodes.forEach((code) => {
            const data = realTimeStockData[code]
            if (data) {
                const changeStatus =
                    data.compareToPreviousClosePrice > 0
                        ? data.fluctuationsRatio > 5
                            ? 'UPPER_LIMIT'
                            : 'RISING'
                        : data.compareToPreviousClosePrice < 0
                          ? data.fluctuationsRatio < -5
                              ? 'LOWER_LIMIT'
                              : 'FALLING'
                          : 'UNCHANGED'

                items[code] = {
                    itemCode: code,
                    stockName: `테스트 종목 ${code}`,
                    closePrice: String(Math.round(data.closePrice)),
                    compareToPreviousClosePrice: String(Math.round(data.compareToPreviousClosePrice)),
                    fluctuationsRatio: String(data.fluctuationsRatio.toFixed(2)),
                    compareToPreviousPrice: {
                        name: changeStatus,
                    },
                    accumulatedTradingVolume: String(Math.round(data.accumulatedTradingVolume)),
                    accumulatedTradingValue: String(Math.round(data.accumulatedTradingValue)),
                    currencyType: {
                        code: type === 'domestic' ? 'KRW' : 'USD',
                        name: type === 'domestic' ? '원' : '달러',
                    },
                    stockExchangeName: type === 'domestic' ? 'KRX' : 'NASDAQ',
                    marketStatus: 'OPEN',
                }
            }
        })

        return HttpResponse.json({
            isSuccess: true,
            result: {
                items,
                pollingInterval: 3000, // 3초마다 폴링
            },
        })
    }),
]
