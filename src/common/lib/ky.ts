import ky from 'ky'

export const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
