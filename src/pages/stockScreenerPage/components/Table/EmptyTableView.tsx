import {TableCell, TableRow} from '@/common/components/table'

interface EmptyTableViewProps {
    colSpan: number
    message?: string
}

const EmptyTableView = ({colSpan, message = '조건에 맞는 종목이 없습니다.'}: EmptyTableViewProps) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="py-10 text-center text-sm text-gray-500">
                {message}
            </TableCell>
        </TableRow>
    )
}

export default EmptyTableView
