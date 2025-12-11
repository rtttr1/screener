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

FavoriteButtonCell.displayName = 'MemoizedFavoriteButtonCell'

interface LogoCellProps {
    itemCode: string
    stockName: string
    size?: number
}

export const LogoCell = memo(({itemCode, stockName, size = 24}: LogoCellProps) => {
    return (
        <TableCell>
            <img
                src={`https://ssl.pstatic.net/imgstock/fn/stage/logo/stock/Stock${itemCode}.svg`}
                alt={`${stockName} 로고`}
                width={size}
                height={size}
                style={{
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                    maxWidth: `${size}px`,
                    maxHeight: `${size}px`,
                }}
                className="rounded-full object-contain"
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
    className?: string
}

export const SymbolCell = memo(({itemCode, className}: SymbolCellProps) => {
    return <TableCell className={cn('text-xs text-gray-500', className)}>{itemCode}</TableCell>
})

SymbolCell.displayName = 'SymbolCell'

interface StockNameCellProps {
    itemCode: string
    stockName: string
    stockType: 'domestic' | 'worldstock'
    className?: string
}

export const StockNameCell = memo(({itemCode, stockName, stockType, className}: StockNameCellProps) => {
    return (
        <TableCell className={cn('font-medium max-w-[300px] truncate', className)} title={stockName}>
            <a
                href={`https://m.stock.naver.com/${stockType}/stock/${itemCode}/total`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left hover:underline cursor-pointer w-full"
            >
                {stockName}
            </a>
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
