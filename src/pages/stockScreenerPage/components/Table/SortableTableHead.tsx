import {ArrowDown, ArrowUp, ArrowUpDown} from 'lucide-react'

import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'
import type {ReactElement} from 'react'

import {TableHead} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import {SORT_ORDERS} from '@/pages/stockScreenerPage/constants/sort'

interface SortableTableHeadProps {
    field: SortField
    label: string
    currentField: SortField | null
    currentOrder: SortOrder
    onSort: (field: SortField) => void
    align?: 'left' | 'center' | 'right'
}

const getSortIcon = (isActive: boolean, currentOrder: SortOrder): ReactElement => {
    if (!isActive || currentOrder === SORT_ORDERS.NONE) {
        return <ArrowUpDown className="size-4 text-gray-400" />
    }
    if (currentOrder === SORT_ORDERS.ASC) {
        return <ArrowUp className="size-4 text-blue-600" />
    }
    if (currentOrder === SORT_ORDERS.DESC) {
        return <ArrowDown className="size-4 text-blue-600" />
    }

    return <ArrowDown className="size-4 text-blue-600" />
}

const SortableTableHead = ({
    field,
    label,
    currentField,
    currentOrder,
    onSort,
    align = 'left',
}: SortableTableHeadProps) => {
    const isActive = currentField === field

    const handleClick = () => {
        onSort(field)
    }

    return (
        <TableHead className={cn(align === 'right' && 'text-right', align === 'center' && 'text-center')}>
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    'flex items-center w-full',
                    align === 'right' && 'justify-end',
                    align === 'center' && 'justify-center',
                    align === 'left' && 'justify-start',
                )}
            >
                <span
                    className={cn(
                        'inline-flex items-center gap-1 px-2 py-1 rounded transition-colors',
                        isActive && currentOrder !== SORT_ORDERS.NONE
                            ? 'bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100'
                            : 'hover:bg-gray-50',
                    )}
                >
                    {label}
                    {getSortIcon(isActive, currentOrder)}
                </span>
            </button>
        </TableHead>
    )
}

export default SortableTableHead
