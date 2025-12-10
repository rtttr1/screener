// port 하나만 존재하게 관리
let port: MessagePort | null = null

export function initSharedWorker() {
    if (port) {
        return port
    }

    const worker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
        name: 'stock-realtime-shared-worker',
    })

    port = worker.port

    // 워커의 메시지 받기 시작
    port.start()

    return port
}
