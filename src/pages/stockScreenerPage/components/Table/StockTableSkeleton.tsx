import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/common/components/table'
import StockTableSkeletonRow from '@/pages/stockScreenerPage/components/Table/StockTableSkeletonRow'

const SKELETON_ROWS = 20

const StockTableSkeleton = () => {
    return (
        <div className="w-full rounded-lg border">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px]" />
                        <TableHead className="w-[48px]" />
                        <TableHead className="w-[100px]">
                            <span className="animate-pulse text-gray-400">심볼</span>
                        </TableHead>
                        <TableHead className="min-w-[200px]">
                            <span className="animate-pulse text-gray-400">종목명</span>
                        </TableHead>
                        <TableHead className="w-[150px] pr-5 text-right">
                            <span className="animate-pulse ml-auto inline-block text-gray-400">가격</span>
                        </TableHead>
                        <TableHead className="text-center w-[110px]">
                            <span className="animate-pulse mx-auto inline-block text-gray-400">등락</span>
                        </TableHead>
                        <TableHead className="w-[150px] text-right">
                            <span className="animate-pulse  ml-auto inline-block text-gray-400">등락값</span>
                        </TableHead>
                        <TableHead className="w-[130px] text-right">
                            <span className="animate-pulse  ml-auto inline-block text-gray-400">등락률</span>
                        </TableHead>
                        <TableHead className="text-center w-[130px]">
                            <span className="animate-pulse  mx-auto inline-block text-gray-400">거래소</span>
                        </TableHead>
                        <TableHead className="w-[150px] text-right">
                            <span className="animate-pulse  ml-auto inline-block text-gray-400">거래량</span>
                        </TableHead>
                        <TableHead className="w-[170px] pr-4 text-right">
                            <span className="animate-pulse  ml-auto inline-block text-gray-400">거래대금</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({length: SKELETON_ROWS}).map((_, index) => (
                        <StockTableSkeletonRow key={`skeleton-${index}`} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default StockTableSkeleton
