import {createBrowserRouter} from 'react-router-dom'

import Layout from '@/Layout'
import StockScreenerPage from '@/pages/stockScreenerPage/StockScreenerPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <StockScreenerPage />,
            },
        ],
    },
])
