import {Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'

import {Table, TableBody, TableCell, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import ChangeHighlightCell from '@/pages/stockScreenerPage/components/Table/ChangeHighlightCell'
import EmptyTableView from '@/pages/stockScreenerPage/components/Table/EmptyTableView'
import StockTableHeader from '@/pages/stockScreenerPage/components/Table/StockTableHeader'
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
            <StockTableHeader currentSortField={currentSortField} currentSortOrder={currentSortOrder} onSort={onSort} />

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
                                        className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full object-contain"
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
                                <ChangeHighlightCell
                                    priceChangeStatus={stock.compareToPreviousPrice.name}
                                    currentValue={stock.closePrice}
                                    className="text-right pr-5"
                                >
                                    {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                                </ChangeHighlightCell>
                                <TableCell
                                    className={cn(
                                        'text-right',
                                        getChangeStatusColor(stock.compareToPreviousPrice.name),
                                    )}
                                >
                                    {getChangeStatusLabel(stock.compareToPreviousPrice.name)}
                                </TableCell>
                                <ChangeHighlightCell
                                    priceChangeStatus={stock.compareToPreviousPrice.name}
                                    currentValue={stock.compareToPreviousClosePrice}
                                    className={cn(
                                        'text-right',
                                        getChangeStatusColor(stock.compareToPreviousPrice.name),
                                    )}
                                >
                                    {formatPriceWithCurrency(
                                        stock.compareToPreviousClosePrice,
                                        stock.currencyType.code,
                                    )}
                                </ChangeHighlightCell>
                                <ChangeHighlightCell
                                    priceChangeStatus={stock.compareToPreviousPrice.name}
                                    currentValue={stock.fluctuationsRatio}
                                    className={cn('text-right', getChangeRateColor(stock.fluctuationsRatio))}
                                >
                                    {stock.fluctuationsRatio}%
                                </ChangeHighlightCell>
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
