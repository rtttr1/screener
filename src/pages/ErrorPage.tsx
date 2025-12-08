const ErrorPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md text-center">
                <h1 className="mb-4 text-6xl font-bold text-gray-900">오류</h1>
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">오류가 발생했습니다</h2>
                <p className="mb-8 text-sm text-gray-600">
                    예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>

                <div className="flex gap-2">
                    <a
                        href="/"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        홈으로
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
