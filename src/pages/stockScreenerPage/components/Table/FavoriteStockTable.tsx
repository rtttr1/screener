import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {Table, TableBody, TableRow} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import ChangeHighlightCell from '@/pages/stockScreenerPage/components/Table/ChangeHighlightCell'
import FavoriteStockTableHeader from '@/pages/stockScreenerPage/components/Table/FavoriteStockTableHeader'
import {
    FavoriteButtonCell,
    LogoCell,
    StockNameCell,
    SymbolCell,
} from '@/pages/stockScreenerPage/components/Table/StockTableStaticCells'
import {formatPriceWithCurrency, getChangeRateColor} from '@/pages/stockScreenerPage/utils/stockTable'

interface FavoriteStockMiniTableProps {
    favoriteStocks: Stock[]
    onFavoriteToggle: (stock: Stock) => void
}

const FavoriteStockTable = ({favoriteStocks, onFavoriteToggle}: FavoriteStockMiniTableProps) => {
    return (
        <section aria-label="관심종목 테이블" className="sticky top-4 h-fit w-[500px] rounded-lg border bg-white">
            <h2 className="border-b rounded-t-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">관심종목</h2>

            <Table className="table-fixed">
                <FavoriteStockTableHeader />
                <TableBody>
                    {favoriteStocks.map((stock) => (
                        <TableRow key={stock.itemCode}>
                            <FavoriteButtonCell stock={stock} isFavorite onFavoriteToggle={onFavoriteToggle} />
                            <LogoCell itemCode={stock.itemCode} stockName={stock.stockName} size={30} />
                            <SymbolCell itemCode={stock.itemCode} className="w-[60px]" />
                            <StockNameCell stockName={stock.stockName} className="w-[140px] text-xs" />
                            <ChangeHighlightCell
                                priceChangeStatus={stock.compareToPreviousPrice.name}
                                currentValue={stock.closePrice}
                                className="w-[80px] text-right text-xs"
                            >
                                {formatPriceWithCurrency(stock.closePrice, stock.currencyType.code)}
                            </ChangeHighlightCell>
                            <ChangeHighlightCell
                                priceChangeStatus={stock.compareToPreviousPrice.name}
                                currentValue={stock.compareToPreviousClosePrice}
                                className="w-[80px] text-right text-xs"
                            >
                                {formatPriceWithCurrency(stock.compareToPreviousClosePrice, stock.currencyType.code)}
                            </ChangeHighlightCell>
                            <ChangeHighlightCell
                                priceChangeStatus={stock.compareToPreviousPrice.name}
                                currentValue={stock.fluctuationsRatio}
                                className={cn(
                                    'w-[70px] text-right text-xs',
                                    getChangeRateColor(stock.fluctuationsRatio),
                                )}
                            >
                                {stock.fluctuationsRatio}%
                            </ChangeHighlightCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}

export default FavoriteStockTable
