import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'

import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/tableSort'
import type {ReactElement} from 'react'

import {TableHead} from '@/common/components/table'
import {cn} from '@/common/utils/cn'

interface SortableTableHeadProps {
    field: SortField
    label: string
    currentField: SortField | null
    currentOrder: SortOrder
    onSort: (field: SortField) => void
    align?: 'left' | 'center' | 'right'
    className?: string
}

const getSortIcon = (isActive: boolean, currentOrder: SortOrder): ReactElement => {
    if (!isActive || currentOrder === 'none') {
        return <ArrowUpDown className="size-4 text-gray-400" />
    }
    if (currentOrder === 'asc') {
        return <ArrowUp className="size-4 text-gray-600" />
    }
    return <ArrowDown className="size-4 text-gray-600" />
}

const SortableTableHead = ({
    field,
    label,
    currentField,
    currentOrder,
    onSort,
    align = 'left',
    className,
}: SortableTableHeadProps) => {
    const isActive = currentField === field

    const handleClick = () => {
        onSort(field)
    }

    return (
        <TableHead
            className={cn(align === 'right' && 'text-right', align === 'center' && 'text-center', className)}
        >
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    'flex items-center gap-1 w-full',
                    align === 'right' && 'justify-end',
                    align === 'center' && 'justify-center',
                    align === 'left' && 'justify-start',
                    'hover:opacity-70 transition-opacity',
                )}
            >
                {label}
                {getSortIcon(isActive, currentOrder)}
            </button>
        </TableHead>
    )
}

export default SortableTableHead
