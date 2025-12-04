import {QueryClientProvider} from '@tanstack/react-query'
import {Provider} from 'jotai'
import {RouterProvider} from 'react-router-dom'

import {queryClient} from '@/common/lib/queryClient'
import {router} from '@/router'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    )
}

export default App
