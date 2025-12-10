import {memo} from 'react'

import {TableHead, TableHeader, TableRow} from '@/common/components/table'

const FavoriteStockTableHeader = memo(() => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[28px]" />
                <TableHead className="w-[40px]" />
                <TableHead className="w-[60px] text-xs">심볼</TableHead>
                <TableHead className="w-[140px] text-xs">종목명</TableHead>
                <TableHead className="w-[80px] text-right text-xs">가격</TableHead>
                <TableHead className="w-[80px] text-right text-xs">등락값</TableHead>
                <TableHead className="w-[70px] text-right text-xs">등락률</TableHead>
            </TableRow>
        </TableHeader>
    )
})

FavoriteStockTableHeader.displayName = 'FavoriteStockTableHeader'

export default FavoriteStockTableHeader
