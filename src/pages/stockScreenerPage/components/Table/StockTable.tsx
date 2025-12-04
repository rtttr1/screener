import {Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/tableSort'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import SortableTableHead from '@/pages/stockScreenerPage/components/Table/SortableTableHead'
import {
    formatPriceWithCurrency,
    getChangeStatusColor,
    getChangeStatusLabel,
    getChangeRateColor,
    getExchangeLabel,
} from '@/pages/stockScreenerPage/utils/stockTable'

interface StockTableProps {
    stocks: Stock[]
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
    currentSortField: SortField | null
    currentSortOrder: SortOrder
    onSort: (field: SortField) => void
}

const StockTable = ({
    stocks,
    favoriteStocks,
    onFavoriteToggle,
    currentSortField,
    currentSortOrder,
    onSort,
}: StockTableProps) => {
    return (
        <div className="mt-4 rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]" />
                        <TableHead className="w-[48px]" />
                        <TableHead className="w-[100px]">심볼</TableHead>
                        <TableHead className="w-[200px]">종목명</TableHead>
                        <SortableTableHead
                            field="closePrice"
                            label="가격"
                            currentField={currentSortField}
                            currentOrder={currentSortOrder}
                            onSort={onSort}
                            align="right"
                        />
                        <TableHead className="text-center">등락</TableHead>
                        <SortableTableHead
                            field="compareToPreviousClosePrice"
                            label="등락값"
                            currentField={currentSortField}
                            currentOrder={currentSortOrder}
                            onSort={onSort}
                            align="right"
                        />
                        <SortableTableHead
                            field="fluctuationsRatio"
                            label="등락률"
                            currentField={currentSortField}
                            currentOrder={currentSortOrder}
                            onSort={onSort}
                            align="right"
                        />
                        <TableHead className="text-center">거래소</TableHead>
                        <SortableTableHead
                            field="accumulatedTradingVolume"
                            label="거래량"
                            currentField={currentSortField}
                            currentOrder={currentSortOrder}
                            onSort={onSort}
                            align="right"
                        />
                        <SortableTableHead
                            field="accumulatedTradingValue"
                            label="거래대금"
                            currentField={currentSortField}
                            currentOrder={currentSortOrder}
                            onSort={onSort}
                            align="right"
                        />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {stocks.map((stock) => (
                        <TableRow key={stock.itemCode}>
                            <TableCell>
                                <button
                                    type="button"
                                    onClick={() => onFavoriteToggle(stock)}
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    {favoriteStocks.some(
                                        (favoriteStock) => favoriteStock.itemCode === stock.itemCode,
                                    ) ? (
                                        <Star
                                            className={cn(
                                                'size-3 transition-colors',
                                                'fill-yellow-400 text-yellow-400',
                                            )}
                                        />
                                    ) : (
                                        <Star
                                            className={cn('size-3 transition-colors', 'fill-gray-400 text-gray-400')}
                                        />
                                    )}
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
