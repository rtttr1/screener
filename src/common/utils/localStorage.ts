function isSupportLocalStorage() {
    try {
        localStorage.setItem('_test', '1')
        localStorage.getItem('_test')
        localStorage.removeItem('_test')
        return true
    } catch {
        return false
    }
}

const STORAGE_MESSAGE_TYPES = {
    SET: 'SET',
    REMOVE: 'REMOVE',
    SYNC_REQUEST: 'SYNC_REQUEST',
    SYNC_RESPONSE: 'SYNC_RESPONSE',
} as const

type StorageMessageType = (typeof STORAGE_MESSAGE_TYPES)[keyof typeof STORAGE_MESSAGE_TYPES]

class MemoryStorage {
    private store: Record<string, string> = {}
    private channel: BroadcastChannel

    constructor() {
        this.channel = new BroadcastChannel('sync_storage')
        this.channel.onmessage = (event) => {
            const {key, value, type} = event.data as {key: string; value: string; type: StorageMessageType}
            if (type === STORAGE_MESSAGE_TYPES.SET) {
                const oldValue = this.store[key] ?? null
                this.store[key] = value
                this.dispatchStorageEvent(key, oldValue, value)
            }
            if (type === STORAGE_MESSAGE_TYPES.REMOVE) {
                const oldValue = this.store[key] ?? null
                delete this.store[key]
                this.dispatchStorageEvent(key, oldValue, null)
            }
            if (type === STORAGE_MESSAGE_TYPES.SYNC_REQUEST) {
                Object.keys(this.store).forEach((storeKey) => {
                    this.channel.postMessage({
                        type: STORAGE_MESSAGE_TYPES.SYNC_RESPONSE,
                        key: storeKey,
                        value: this.store[storeKey],
                    })
                })
            }
            // 다른 탭에서 받은 동기화 응답
            if (type === STORAGE_MESSAGE_TYPES.SYNC_RESPONSE) {
                const oldValue = this.store[key] ?? null

                if (oldValue !== value) {
                    this.store[key] = value
                    this.dispatchStorageEvent(key, oldValue, value)
                }
            }
        }

        this.channel.postMessage({type: STORAGE_MESSAGE_TYPES.SYNC_REQUEST})
    }

    private dispatchStorageEvent(key: string, oldValue: string | null, newValue: string | null): void {
        // CustomEvent를 사용하여 StorageEvent와 호환되는 이벤트 생성
        const event = new CustomEvent('storage', {
            detail: {
                key,
                oldValue,
                newValue,
                storageArea: this,
            },
        })

        // StorageEvent와 호환되도록 속성을 직접 추가
        Object.defineProperty(event, 'key', {
            value: key,
            writable: false,
            enumerable: true,
            configurable: false,
        })

        Object.defineProperty(event, 'oldValue', {
            value: oldValue,
            writable: false,
            enumerable: true,
            configurable: false,
        })

        Object.defineProperty(event, 'newValue', {
            value: newValue,
            writable: false,
            enumerable: true,
            configurable: false,
        })

        Object.defineProperty(event, 'storageArea', {
            value: this,
            writable: false,
            enumerable: true,
            configurable: false,
        })

        window.dispatchEvent(event)
    }

    getItem(key: string): string | null {
        return this.store[key] ?? null
    }

    setItem(key: string, value: string): void {
        this.store[key] = value
        this.channel.postMessage({type: STORAGE_MESSAGE_TYPES.SET, key, value})
    }

    removeItem(key: string): void {
        if (!(key in this.store)) {
            return
        }

        delete this.store[key]
        this.channel.postMessage({type: STORAGE_MESSAGE_TYPES.REMOVE, key})
    }

    clear(): void {
        this.store = {}
    }
}

export const safeLocalStorage: Storage | MemoryStorage = isSupportLocalStorage()
    ? window.localStorage
    : new MemoryStorage()
