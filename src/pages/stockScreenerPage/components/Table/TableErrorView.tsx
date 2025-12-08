interface TableErrorViewProps {
    message?: string
    resetErrorBoundary?: () => void
    onRetry?: () => void
}

const TableErrorView = ({
    message = '데이터를 불러오는 중 오류가 발생했습니다.',
    resetErrorBoundary,
    onRetry,
}: TableErrorViewProps) => {
    const handleRetry = () => {
        if (resetErrorBoundary) {
            resetErrorBoundary()
        }

        if (onRetry) {
            onRetry()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4  ">
            <div className="mb-4 text-center">
                <p className="mb-2 text-sm font-medium text-gray-900">{message}</p>
                <p className="text-xs text-gray-500">잠시 후 다시 시도해주세요.</p>
            </div>

            <button
                onClick={handleRetry}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
                다시 시도
            </button>
        </div>
    )
}

export default TableErrorView
