import {useEffect, useRef} from 'react'

/**
 * IntersectionObserver를 사용해 특정 엘리먼트가 viewport와 교차될 때 콜백을 실행하는 훅
 *
 * @param callback - 대상 엘리먼트가 조건에 맞게 화면에 진입했을 때 호출할 함수
 * @param canCallback - 콜백 실행 여부를 제어하는 플래그 (false면 교차되어도 콜백이 실행되지 않아요)
 * @param options - IntersectionObserver 옵션 (root, rootMargin, threshold 등)
 *
 * @returns 관찰 대상 엘리먼트에 연결할 `ref`
 *
 * @example
 * const canLoadMore = !isFetching && hasNextPage
 * const loadMoreRef = useIntersectionObserver(() => fetchNextPage(), canLoadMore)
 *
 * return <div ref={loadMoreRef} />
 */

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
