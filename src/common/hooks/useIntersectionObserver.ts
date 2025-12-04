import {useEffect, useRef} from 'react'

const useIntersectionObserver = (callback: () => void, canCallback = true, options?: IntersectionObserverInit) => {
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!loadMoreRef.current) {
            return
        }

        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            const [entry] = entries

            if (entry.isIntersecting && canCallback) {
                callback()
            }
        }, options)

        observer.observe(loadMoreRef.current)

        return () => {
            observer.disconnect()
        }
    }, [callback, canCallback, options])

    return loadMoreRef
}

export default useIntersectionObserver
