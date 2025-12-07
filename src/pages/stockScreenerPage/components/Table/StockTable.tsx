import {Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import EmptyTableView from '@/pages/stockScreenerPage/components/Table/EmptyTableView'
import SortableTableHead from '@/pages/stockScreenerPage/components/Table/SortableTableHead'
import {EMPTY_LOGO_URL} from '@/pages/stockScreenerPage/constants/emptyLogo'
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
        <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white">
                <TableRow className="outline">
                    <TableHead className="w-[40px]" />
                    <TableHead className="w-[48px]" />
                    <TableHead className="w-[100px]">심볼</TableHead>

                    <TableHead className="min-w-[200px] max-w-[300px]">종목명</TableHead>
                    <TableHead className="w-[150px] pr-5 text-right">가격</TableHead>
                    <TableHead className="w-[110px] text-right">등락</TableHead>
                    <TableHead className="w-[150px] text-right">등락값</TableHead>

                    <SortableTableHead
                        field="fluctuationsRatio"
                        label="등락률"
                        currentField={currentSortField}
                        currentOrder={currentSortOrder}
                        onSort={onSort}
                        align="right"
                        className="w-[130px]"
                    />
                    <TableHead className="text-center w-[130px]">거래소</TableHead>
                    <SortableTableHead
                        field="quantTop"
                        label="거래량"
                        currentField={currentSortField}
                        currentOrder={currentSortOrder}
                        onSort={onSort}
                        align="right"
                        className="w-[150px]"
                    />
                    <SortableTableHead
                        field="priceTop"
                        label="거래대금"
                        currentField={currentSortField}
                        currentOrder={currentSortOrder}
                        onSort={onSort}
                        align="right"
                        className="w-[170px] pr-4"
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
                                        className="h-6 w-6 rounded-full object-contain"
                                        style={{
                                            minWidth: '24px',
                                            minHeight: '24px',
                                            maxWidth: '24px',
                                            maxHeight: '24px',
                                        }}
                                        onError={(event) => {
                                            event.currentTarget.onerror = null
                                            event.currentTarget.src = EMPTY_LOGO_URL
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs text-gray-500">{stock.itemCode}</span>
                                </TableCell>
                                <TableCell className="font-medium max-w-[300px] truncate" title={stock.stockName}>
                                    {stock.stockName}
                                </TableCell>
                                <TableCell className="text-right pr-5">
                                    {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        'text-right',
                                        getChangeStatusColor(stock.compareToPreviousPrice.name),
                                    )}
                                >
                                    {getChangeStatusLabel(stock.compareToPreviousPrice.name)}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        'text-right',
                                        getChangeStatusColor(stock.compareToPreviousPrice.name),
                                    )}
                                >
                                    {formatPriceWithCurrency(
                                        stock.compareToPreviousClosePrice,
                                        stock.currencyType.code,
                                    )}
                                </TableCell>
                                <TableCell className={cn('text-right', getChangeRateColor(stock.fluctuationsRatio))}>
                                    {stock.fluctuationsRatio}%
                                </TableCell>
                                <TableCell className="text-right">
                                    {getExchangeLabel(stock.stockExchangeName)}
                                </TableCell>
                                <TableCell className="text-right">{stock.accumulatedTradingVolume}</TableCell>
                                <TableCell className="text-right pr-4">
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
