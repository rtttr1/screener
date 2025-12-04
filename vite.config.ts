import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/m-stock': {
                target: 'https://m.stock.naver.com',
                changeOrigin: true,
                rewrite: (urlPath) => urlPath.replace(/^\/m-stock/, '/front-api/stock'),
                configure: (proxy, _options) => {
                    proxy.on('proxyReq', (proxyReq, _req, _res) => {
                        proxyReq.setHeader('origin', 'https://m.stock.naver.com')
                        proxyReq.setHeader('referer', 'https://m.stock.naver.com/')
                    })
                },
            },
            '/api-stock': {
                target: 'https://api.stock.naver.com',
                changeOrigin: true,
                rewrite: (urlPath) => urlPath.replace(/^\/api-stock/, '/stock'),
                configure: (proxy, _options) => {
                    proxy.on('proxyReq', (proxyReq, _req, _res) => {
                        proxyReq.setHeader('origin', 'https://m.stock.naver.com')
                        proxyReq.setHeader('referer', 'https://m.stock.naver.com/')
                    })
                },
            },
        },
    },
})
