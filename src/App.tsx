import {QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Provider} from 'jotai'
import {RouterProvider} from 'react-router-dom'

import GlobalErrorBoundary from '@/common/components/GlobalErrorBoundary'
import {Toaster} from '@/common/components/toast'
import {queryClient} from '@/common/lib/queryClient'
import {router} from '@/router'

function App() {
    return (
        <GlobalErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <RouterProvider router={router} />
                    <Toaster />
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </GlobalErrorBoundary>
    )
}

export default App
