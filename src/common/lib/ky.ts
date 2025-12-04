import ky from 'ky'

export const mStockClient = ky.create({
    prefixUrl: '/m-stock',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const apiStockClient = ky.create({
    prefixUrl: '/api-stock',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})
