import {Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/tableSort'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import EmptyTableView from '@/pages/stockScreenerPage/components/Table/EmptyTableView'
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
                {stocks.length === 0 ? (
                    <EmptyTableView colSpan={11} />
                ) : (
                    stocks.map((stock) => {
                        const isFavorite = favoriteStocks.some(
                            (favoriteStock) => favoriteStock.itemCode === stock.itemCode,
                        )

                        return (
                            <TableRow key={stock.itemCode}>
                                <TableCell>
                                    <button
                                        type="button"
                                        onClick={() => onFavoriteToggle(stock)}
                                        aria-label={
                                            isFavorite
                                                ? `${stock.stockName} 관심종목 해제`
                                                : `${stock.stockName} 관심종목 추가`
                                        }
                                        aria-pressed={isFavorite}
                                        className="flex items-center justify-center w-full h-full"
                                    >
                                        <Star
                                            className={cn(
                                                'size-3 transition-colors',
                                                isFavorite
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'fill-gray-400 text-gray-400',
                                            )}
                                        />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={`https://ssl.pstatic.net/imgstock/fn/stage/logo/stock/Stock${stock.itemCode}.svg`}
                                        alt={`${stock.stockName} 로고`}
                                        width={24}
                                        height={24}
                                        className="rounded-full object-contain"
                                        onError={(event) => {
                                            event.currentTarget.onerror = null
                                            event.currentTarget.src =
                                                'https://ssl.pstatic.net/imgstock/fn/stage/logo/common/CompanyLogoCommon.svg'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs text-gray-500">{stock.itemCode}</span>
                                </TableCell>
                                <TableCell className="font-medium">{stock.stockName}</TableCell>
                                <TableCell className="text-right">
                                    {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        'text-center',
                                        getChangeStatusColor(stock.compareToPreviousPrice.name),
                                    )}
                                >
                                    {getChangeStatusLabel(stock.compareToPreviousPrice.name)}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatPriceWithCurrency(
                                        stock.compareToPreviousClosePrice,
                                        stock.currencyType.code,
                                    )}
                                </TableCell>
                                <TableCell className={cn('text-right', getChangeRateColor(stock.fluctuationsRatio))}>
                                    {stock.fluctuationsRatio}%
                                </TableCell>
                                <TableCell className="text-center">
                                    {getExchangeLabel(stock.stockExchangeName)}
                                </TableCell>
                                <TableCell className="text-right">{stock.accumulatedTradingVolume}</TableCell>
                                <TableCell className="text-right">
                                    {formatPriceWithCurrency(stock.accumulatedTradingValue, stock.currencyType.code)}
                                </TableCell>
                            </TableRow>
                        )
                    })
                )}
            </TableBody>
        </Table>
    )
}

export default StockTable
