import {ArrowUpDown, Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/stock'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import {
    formatPriceWithCurrency,
    getChangeStatusColor,
    getChangeStatusLabel,
    getChangeRateColor,
    getExchangeLabel,
} from '@/pages/stockScreenerPage/utils/stockTable'

interface StockTableProps {
    stocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const StockTable = ({stocks, onFavoriteToggle}: StockTableProps) => {
    const handleFavoriteToggle = (stock: Stock) => {
        onFavoriteToggle(stock)
    }

    return (
        <div className="mt-4 rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]" />
                        <TableHead className="w-[48px]" />
                        <TableHead className="w-[100px]">심볼</TableHead>
                        <TableHead className="w-[200px]">종목명</TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                가격
                                <ArrowUpDown className="size-4 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="text-center">등락</TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                등락값
                                <ArrowUpDown className="size-4 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                등락률
                                <ArrowUpDown className="size-4 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="text-center">거래소</TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                거래량
                                <ArrowUpDown className="size-4 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                거래대금
                                <ArrowUpDown className="size-4 text-gray-400" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {stocks.map((stock) => (
                        <TableRow key={stock.itemCode}>
                            <TableCell>
                                <button
                                    type="button"
                                    onClick={() => handleFavoriteToggle(stock)}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <Star
                                        className={cn('size-3 transition-colors', 'fill-yellow-400 text-yellow-400')}
                                    />
                                </button>
                            </TableCell>
                            <TableCell>
                                {stock.logoUrl ? (
                                    <img
                                        src={stock.logoUrl}
                                        alt={`${stock.stockName} 로고`}
                                        className="size-8 rounded-full object-contain"
                                    />
                                ) : (
                                    <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                        {stock.stockName.charAt(0)}
                                    </div>
                                )}
                            </TableCell>
                            <TableCell>
                                <span className="text-xs text-gray-500">{stock.itemCode}</span>
                            </TableCell>
                            <TableCell className="font-medium">{stock.stockName}</TableCell>
                            <TableCell className="text-right">
                                {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                            </TableCell>
                            <TableCell
                                className={cn('text-center', getChangeStatusColor(stock.compareToPreviousPrice.name))}
                            >
                                {getChangeStatusLabel(stock.compareToPreviousPrice.name)}
                            </TableCell>
                            <TableCell className="text-right">
                                {formatPriceWithCurrency(stock.compareToPreviousClosePrice, stock.currencyType.code)}
                            </TableCell>
                            <TableCell className={cn('text-right', getChangeRateColor(stock.fluctuationsRatio))}>
                                {stock.fluctuationsRatio}%
                            </TableCell>
                            <TableCell className="text-center">{getExchangeLabel(stock.stockExchangeName)}</TableCell>
                            <TableCell className="text-right">{stock.accumulatedTradingVolume}</TableCell>
                            <TableCell className="text-right">
                                {formatPriceWithCurrency(stock.accumulatedTradingValue, stock.currencyType.code)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default StockTable
