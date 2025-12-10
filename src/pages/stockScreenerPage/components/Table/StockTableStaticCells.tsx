import {memo} from 'react'

import {Star} from 'lucide-react'

import type {Stock} from '@/pages/stockScreenerPage/types/api'

import {TableCell} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import {EMPTY_LOGO_URL} from '@/pages/stockScreenerPage/constants/emptyLogo'
import {
    formatPriceWithCurrency,
    getChangeStatusColor,
    getChangeStatusLabel,
    getExchangeLabel,
} from '@/pages/stockScreenerPage/utils/stockTable'

interface FavoriteButtonCellProps {
    stock: Stock
    isFavorite: boolean
    onFavoriteToggle: (stock: Stock) => void
}

export const FavoriteButtonCell = memo(({stock, isFavorite, onFavoriteToggle}: FavoriteButtonCellProps) => {
    return (
        <TableCell>
            <button
                type="button"
                onClick={() => onFavoriteToggle(stock)}
                aria-label={isFavorite ? `${stock.stockName} 관심종목 해제` : `${stock.stockName} 관심종목 추가`}
                aria-pressed={isFavorite}
                className="flex items-center justify-center w-full h-full"
            >
                <Star
                    className={cn(
                        'size-3 transition-colors',
                        isFavorite ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-400 text-gray-400',
                    )}
                />
            </button>
        </TableCell>
    )
})

FavoriteButtonCell.displayName = 'FavoriteButtonCell'

interface LogoCellProps {
    itemCode: string
    stockName: string
}

export const LogoCell = memo(({itemCode, stockName}: LogoCellProps) => {
    return (
        <TableCell>
            <img
                src={`https://ssl.pstatic.net/imgstock/fn/stage/logo/stock/Stock${itemCode}.svg`}
                alt={`${stockName} 로고`}
                width={24}
                height={24}
                className="min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full object-contain"
                onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = EMPTY_LOGO_URL
                }}
            />
        </TableCell>
    )
})

LogoCell.displayName = 'LogoCell'

interface SymbolCellProps {
    itemCode: string
}

export const SymbolCell = memo(({itemCode}: SymbolCellProps) => {
    return <TableCell className="text-xs text-gray-500">{itemCode}</TableCell>
})

SymbolCell.displayName = 'SymbolCell'

interface StockNameCellProps {
    stockName: string
}

export const StockNameCell = memo(({stockName}: StockNameCellProps) => {
    return (
        <TableCell className="font-medium max-w-[300px] truncate" title={stockName}>
            {stockName}
        </TableCell>
    )
})

StockNameCell.displayName = 'StockNameCell'

interface ChangeStatusCellProps {
    changeStatus: string
}

export const ChangeStatusCell = memo(({changeStatus}: ChangeStatusCellProps) => {
    return (
        <TableCell className={cn('text-right', getChangeStatusColor(changeStatus))}>
            {getChangeStatusLabel(changeStatus)}
        </TableCell>
    )
})

ChangeStatusCell.displayName = 'ChangeStatusCell'

interface ExchangeCellProps {
    stockExchangeName?: string
}

export const ExchangeCell = memo(({stockExchangeName}: ExchangeCellProps) => {
    return <TableCell className="text-right">{getExchangeLabel(stockExchangeName || '')}</TableCell>
})

ExchangeCell.displayName = 'ExchangeCell'

interface TradingVolumeCellProps {
    accumulatedTradingVolume: string
}

export const TradingVolumeCell = memo(({accumulatedTradingVolume}: TradingVolumeCellProps) => {
    return <TableCell className="text-right">{accumulatedTradingVolume}</TableCell>
})

TradingVolumeCell.displayName = 'TradingVolumeCell'

interface TradingValueCellProps {
    accumulatedTradingValue: string
    currencyCode: string
}

export const TradingValueCell = memo(({accumulatedTradingValue, currencyCode}: TradingValueCellProps) => {
    return (
        <TableCell className="text-right pr-4">
            {formatPriceWithCurrency(accumulatedTradingValue, currencyCode)}
        </TableCell>
    )
})

TradingValueCell.displayName = 'TradingValueCell'
