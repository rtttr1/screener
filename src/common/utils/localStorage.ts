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

class MemoryStorage {
    private store: Record<string, string> = {}

    getItem(key: string): string | null {
        return this.store[key] ?? null
    }

    setItem(key: string, value: string): void {
        this.store[key] = value
    }

    removeItem(key: string): void {
        delete this.store[key]
    }

    clear(): void {
        this.store = {}
    }
}

export const safeLocalStorage: Storage | MemoryStorage = isSupportLocalStorage()
    ? window.localStorage
    : new MemoryStorage()
