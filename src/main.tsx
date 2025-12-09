import {StrictMode} from 'react'

import {createRoot} from 'react-dom/client'

import App from '@/App.tsx'
import '@/index.css'

// MSW Service Worker 해제 (개발 중 MSW를 끄고 싶을 때)
async function disableMocking() {
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
            // mockServiceWorker만 해제
            if (registration.scope.includes(window.location.origin)) {
                const worker = registration.active || registration.waiting || registration.installing
                if (worker && worker.scriptURL.includes('mockServiceWorker')) {
                    await registration.unregister()
                    // eslint-disable-next-line no-console
                    console.log('[MSW] Service Worker unregistered')
                }
            }
        }
    }
}

// async function enableMocking() {
//     if (import.meta.env.MODE !== 'development') {
//         return
//     }

//     // const {worker} = await import('@/mocks/browser')

//     // return worker.start({
//     //     quiet: false,
//     // })
// }

// MSW 비활성화 (주석 해제하면 Service Worker가 해제됨)
disableMocking().then(() => {
    createRoot(document.querySelector('#root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
})

// enableMocking().then(() => {
//     createRoot(document.querySelector('#root')!).render(
//         <StrictMode>
//             <App />
//         </StrictMode>,
//     )
// })
