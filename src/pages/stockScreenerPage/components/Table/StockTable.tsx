import {useVirtualizer} from '@tanstack/react-virtual'

import type {Stock} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'

import {Table, TableBody, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import ChangeHighlightCell from '@/pages/stockScreenerPage/components/Table/ChangeHighlightCell'
import EmptyTableView from '@/pages/stockScreenerPage/components/Table/EmptyTableView'
import StockTableHeader from '@/pages/stockScreenerPage/components/Table/StockTableHeader'
import {
    ChangeStatusCell,
    ExchangeCell,
    FavoriteButtonCell,
    LogoCell,
    StockNameCell,
    SymbolCell,
    TradingValueCell,
    TradingVolumeCell,
} from '@/pages/stockScreenerPage/components/Table/StockTableStaticCells'
import {
    formatPriceWithCurrency,
    getChangeRateColor,
    getChangeStatusColor,
} from '@/pages/stockScreenerPage/utils/stockTable'

interface StockTableProps {
    stocks: Stock[]
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
    currentSortField: SortField | null
    currentSortOrder: SortOrder
    onSort: (field: SortField) => void
    scrollElementRef?: React.RefObject<HTMLElement | null>
}

const ROW_HEIGHT = 48 // 각 row의 예상 높이 (px)

const StockTable = ({
    stocks,
    favoriteStocks,
    onFavoriteToggle,
    currentSortField,
    currentSortOrder,
    onSort,
    scrollElementRef,
}: StockTableProps) => {
    const virtualizer = useVirtualizer({
        count: stocks.length,
        getScrollElement: () => scrollElementRef?.current || null,
        estimateSize: () => ROW_HEIGHT,
        overscan: 5,
    })

    const virtualItems = virtualizer.getVirtualItems()

    return (
        <Table className="w-full">
            <StockTableHeader currentSortField={currentSortField} currentSortOrder={currentSortOrder} onSort={onSort} />

            <TableBody>
                {stocks.length === 0 ? (
                    <EmptyTableView colSpan={11} />
                ) : (
                    <>
                        {/* 상단 spacer */}
                        {virtualItems.length > 0 && (
                            <tr>
                                <td colSpan={11} style={{height: `${virtualItems[0]?.start ?? 0}px`}} />
                            </tr>
                        )}

                        {/* 가상화된 row들 */}
                        {virtualItems.map((virtualRow) => {
                            const stock = stocks[virtualRow.index]
                            const isFavorite = favoriteStocks.some(
                                (favoriteStock) => favoriteStock.itemCode === stock.itemCode,
                            )

                            return (
                                <TableRow
                                    key={stock.itemCode}
                                    ref={virtualizer.measureElement}
                                    data-index={virtualRow.index}
                                >
                                    <FavoriteButtonCell
                                        stock={stock}
                                        isFavorite={isFavorite}
                                        onFavoriteToggle={onFavoriteToggle}
                                    />
                                    <LogoCell itemCode={stock.itemCode} stockName={stock.stockName} />
                                    <SymbolCell itemCode={stock.itemCode} />
                                    <StockNameCell
                                        itemCode={stock.itemCode}
                                        stockName={stock.stockName}
                                        stockType={stock.stockType}
                                    />
                                    <ChangeHighlightCell
                                        priceChangeStatus={stock.compareToPreviousPrice.name}
                                        currentValue={stock.closePrice}
                                        className="text-right pr-5"
                                    >
                                        {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                                    </ChangeHighlightCell>
                                    <ChangeStatusCell changeStatus={stock.compareToPreviousPrice.name} />
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
                                        {`${stock.fluctuationsRatio}%`}
                                    </ChangeHighlightCell>
                                    <ExchangeCell stockExchangeName={stock.stockExchangeName} />
                                    <TradingVolumeCell accumulatedTradingVolume={stock.accumulatedTradingVolume} />
                                    <TradingValueCell
                                        accumulatedTradingValue={stock.accumulatedTradingValue}
                                        currencyCode={stock.currencyType.code}
                                    />
                                </TableRow>
                            )
                        })}

                        {/* 하단 spacer */}
                        {virtualItems.length > 0 && (
                            <tr>
                                <td
                                    colSpan={11}
                                    style={{
                                        height: `${virtualizer.getTotalSize() - (virtualItems[virtualItems.length - 1]?.end ?? 0)}px`,
                                    }}
                                />
                            </tr>
                        )}
                    </>
                )}
            </TableBody>
        </Table>
    )
}

export default StockTable
