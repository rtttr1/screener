import {type HttpHandler} from 'msw'

// const errorCount = 0

export const handlers: HttpHandler[] = [
    // http.get('*/stock/domestic/stockList', ({request}) => {
    //     const url = new URL(request.url)
    //     const page = Number(url.searchParams.get('page') || '1')
    //     errorCount++
    //     // 초기 요청 또는 3번째 페이지(page=3)에서 에러 발생
    //     if (errorCount < 4 || page === 3) {
    //         return HttpResponse.json({message: '서버 오류가 발생했습니다.'}, {status: 500})
    //     }
    //     // 정상 응답 (page=2, page>=4)
    //     const pageSize = Number(url.searchParams.get('pageSize') || '20')
    //     const mockStocks = Array.from({length: pageSize}, (_, i) => ({
    //         stockType: 'domestic' as const,
    //         stockEndType: 'STOCK',
    //         itemCode: `TEST${page}${String(i + 1).padStart(3, '0')}`,
    //         stockName: `테스트 종목 ${page}-${i + 1}`,
    //         closePrice: String((10000 + i * 100) * page),
    //         compareToPreviousClosePrice: String(i * 10),
    //         fluctuationsRatio: String((i * 0.1).toFixed(2)),
    //         compareToPreviousPrice: {
    //             name: (i % 5 === 0 ? 'RISING' : i % 5 === 1 ? 'FALLING' : 'UNCHANGED') as
    //                 | 'RISING'
    //                 | 'FALLING'
    //                 | 'UNCHANGED',
    //         },
    //         accumulatedTradingVolume: String(1000000 + i * 10000),
    //         accumulatedTradingValue: String(100000000 + i * 1000000),
    //         marketValue: String(1000000000 + i * 10000000),
    //         marketValueHangeul: '1조원',
    //         currencyType: {
    //             code: 'KRW',
    //             name: '원',
    //         },
    //         stockExchangeName: 'KRX',
    //     }))
    //     return HttpResponse.json({
    //         isSuccess: true,
    //         result: {
    //             stocks: mockStocks,
    //             page,
    //             pageSize,
    //             totalCount: 100, // 총 100개라고 가정 (5페이지까지 가능)
    //             stockListSortType: url.searchParams.get('sortType') || 'marketValue',
    //         },
    //     })
    // }),
    // http.get('*/stock/domestic/stockList', ({request}) => {
    //     const url = new URL(request.url)
    //     const page = Number(url.searchParams.get('page') || '1')
    //     // 3번째 페이지(page=3)에서만 500 에러 발생
    //     if (page >= 3) {
    //         return HttpResponse.json({message: '서버 오류가 발생했습니다.'}, {status: 500})
    //     }
    //     const pageSize = Number(url.searchParams.get('pageSize') || '20')
    //     const mockStocks = Array.from({length: pageSize}, (_, i) => ({
    //         stockType: 'domestic' as const,
    //         stockEndType: 'STOCK',
    //         itemCode: `TEST${page}${String(i + 1).padStart(3, '0')}`,
    //         stockName: `테스트 종목 ${page}-${i + 1}`,
    //         closePrice: String((10000 + i * 100) * page),
    //         compareToPreviousClosePrice: String(i * 10),
    //         fluctuationsRatio: String((i * 0.1).toFixed(2)),
    //         compareToPreviousPrice: {
    //             name: (i % 5 === 0 ? 'RISING' : i % 5 === 1 ? 'FALLING' : 'UNCHANGED') as
    //                 | 'RISING'
    //                 | 'FALLING'
    //                 | 'UNCHANGED',
    //         },
    //         accumulatedTradingVolume: String(1000000 + i * 10000),
    //         accumulatedTradingValue: String(100000000 + i * 1000000),
    //         marketValue: String(1000000000 + i * 10000000),
    //         marketValueHangeul: '1조원',
    //         currencyType: {
    //             code: 'KRW',
    //             name: '원',
    //         },
    //         stockExchangeName: 'KRX',
    //     }))
    //     return HttpResponse.json({
    //         isSuccess: true,
    //         result: {
    //             stocks: mockStocks,
    //             page,
    //             pageSize,
    //             totalCount: 100,
    //             stockListSortType: url.searchParams.get('sortType') || 'marketValue',
    //         },
    //     })
    // }),
]
