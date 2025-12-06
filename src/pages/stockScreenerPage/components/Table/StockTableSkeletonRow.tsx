import {Skeleton} from '@/common/components/skeleton'
import {TableCell, TableRow} from '@/common/components/table'

const StockTableSkeletonRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Skeleton className="h-3 w-3 mx-auto" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-6 w-6 rounded-full mx-auto" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
                <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell className="text-right pr-5">
                <Skeleton className="h-4 w-20 ml-auto" />
            </TableCell>
            <TableCell className="text-center">
                <Skeleton className="h-4 w-12 mx-auto" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
            </TableCell>
            <TableCell className="text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell className="text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
            </TableCell>
            <TableCell className="text-right pr-4">
                <Skeleton className="h-4 w-24 ml-auto" />
            </TableCell>
        </TableRow>
    )
}

export default StockTableSkeletonRow
