import {StrictMode} from 'react'

import {createRoot} from 'react-dom/client'

import App from '@/App.tsx'
import '@/index.css'

async function enableMocking() {
    if (import.meta.env.MODE !== 'development') {
        return
    }

    const {worker} = await import('@/mocks/browser')

    return worker.start({
        quiet: false,
    })
}

enableMocking().then(() => {
    createRoot(document.querySelector('#root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
})
