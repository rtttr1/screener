import {createBrowserRouter} from 'react-router-dom'

import Layout from '@/Layout'
import ErrorPage from '@/pages/ErrorPage'
import NotFoundPage from '@/pages/NotFoundPage'
import StockScreenerPage from '@/pages/stockScreenerPage/StockScreenerPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <StockScreenerPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
])
