import {memo} from 'react'

import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'

import {TableHead, TableHeader, TableRow} from '@/common/components/table'
import SortableTableHead from '@/pages/stockScreenerPage/components/Table/SortableTableHead'

interface StockTableHeaderProps {
    currentSortField: SortField | null
    currentSortOrder: SortOrder
    onSort: (field: SortField) => void
}

const StockTableHeader = memo(({currentSortField, currentSortOrder, onSort}: StockTableHeaderProps) => {
    return (
        <TableHeader className="sticky top-0 bg-white z-10">
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
    )
})

StockTableHeader.displayName = 'StockTableHeader'

export default StockTableHeader
