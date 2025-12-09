import {Link} from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md text-center">
                <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
                <h2 className="mb-2 text-2xl font-semibold text-gray-800">페이지를 찾을 수 없습니다</h2>
                <p className="mb-8 text-sm text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
                <Link
                    to="/"
                    className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
