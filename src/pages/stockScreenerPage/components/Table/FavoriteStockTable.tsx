import {Star} from 'lucide-react'

import type {RealTimeStockItem, Stock} from '@/pages/stockScreenerPage/types/api'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import {mergeRealTimeStockData} from '@/pages/stockScreenerPage/utils/mergeRealTimeStockData'
import {formatPriceWithCurrency, getChangeRateColor} from '@/pages/stockScreenerPage/utils/stockTable'

interface FavoriteStockMiniTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
    realTimeData?: Record<string, RealTimeStockItem>
}

const FavoriteStockTable = ({favoriteStocks, onFavoriteToggle, realTimeData}: FavoriteStockMiniTableProps) => {
    const stocksWithRealTime = mergeRealTimeStockData(favoriteStocks, realTimeData)

    return (
        <section aria-label="관심종목 테이블" className="sticky top-4 h-fit w-[500px] rounded-lg border bg-white">
            <h2 className="border-b rounded-t-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">관심종목</h2>

            <Table className="table-fixed">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[28px]" />
                        <TableHead className="w-[40px]" />
                        <TableHead className="w-[60px] text-xs">심볼</TableHead>
                        <TableHead className="w-[140px] text-xs">종목명</TableHead>
                        <TableHead className="w-[80px] text-right text-xs">가격</TableHead>
                        <TableHead className="w-[80px] text-right text-xs">등락값</TableHead>
                        <TableHead className="w-[70px] text-right text-xs">등락률</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stocksWithRealTime.map((stock) => (
                        <TableRow key={stock.itemCode}>
                            <TableCell className="w-[28px]">
                                <button
                                    type="button"
                                    onClick={() => onFavoriteToggle(stock)}
                                    className="flex h-full w-full items-center justify-center"
                                >
                                    <Star
                                        className={cn('size-3 transition-colors', 'fill-yellow-400 text-yellow-400')}
                                    />
                                </button>
                            </TableCell>
                            <TableCell className="w-[40px]">
                                <img
                                    src={`https://ssl.pstatic.net/imgstock/fn/stage/logo/stock/Stock${stock.itemCode}.svg`}
                                    alt={`${stock.stockName} 로고`}
                                    width={36}
                                    height={36}
                                    className="rounded-full object-contain"
                                    onError={(event) => {
                                        event.currentTarget.onerror = null
                                        event.currentTarget.src =
                                            'https://ssl.pstatic.net/imgstock/fn/stage/logo/common/CompanyLogoCommon.svg'
                                    }}
                                />
                            </TableCell>
                            <TableCell className="w-[60px] text-xs text-gray-500">{stock.itemCode}</TableCell>
                            <TableCell className="w-[140px] truncate text-xs font-medium">{stock.stockName}</TableCell>
                            <TableCell className="w-[80px] text-right text-xs">
                                {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                            </TableCell>
                            <TableCell className="w-[80px] text-right text-xs">
                                {formatPriceWithCurrency(stock.compareToPreviousClosePrice, stock.currencyType.code)}
                            </TableCell>
                            <TableCell
                                className={cn(
                                    'w-[70px] text-right text-xs',
                                    getChangeRateColor(stock.fluctuationsRatio),
                                )}
                            >
                                {stock.fluctuationsRatio}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}

export default FavoriteStockTable
