import {ErrorBoundary} from 'react-error-boundary'

import ErrorPage from '@/pages/ErrorPage'

interface GlobalErrorBoundaryProps {
    children: React.ReactNode
}

function GlobalErrorBoundary({children}: GlobalErrorBoundaryProps) {
    return <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
}

export default GlobalErrorBoundary
