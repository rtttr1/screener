import {useQueryErrorResetBoundary} from '@tanstack/react-query'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'

interface QueryRetryErrorBoundaryProps {
    children: React.ReactNode
    FallbackComponent: React.ComponentType<FallbackProps>
}

export const QueryRetryErrorBoundary = ({children, FallbackComponent}: QueryRetryErrorBoundaryProps) => {
    const {reset: onReset} = useQueryErrorResetBoundary()

    return (
        <ErrorBoundary FallbackComponent={FallbackComponent} onReset={onReset}>
            {children}
        </ErrorBoundary>
    )
}
