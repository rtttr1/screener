import {AlertTriangle} from 'lucide-react'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-red-100 p-4">
                        <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                </div>
                <h1 className="mb-3 text-5xl font-bold text-gray-900">오류</h1>
                <h2 className="mb-3 text-xl font-semibold text-gray-800">오류가 발생했습니다</h2>
                <p className="mb-8 text-sm leading-relaxed text-gray-600">
                    예상치 못한 오류가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage
