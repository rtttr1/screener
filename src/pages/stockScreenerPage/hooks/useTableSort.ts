/**
 * 테이블 정렬 상태 관리 훅
 * @param initialField 초기 정렬 필드
 * @param initialOrder 초기 정렬 순서
 * @returns 정렬 상태와 정렬 핸들러
 * @example
 * const {sortState, handleSort, resetSort} = useTableSort<SortField>('closePrice', 'desc')
 *
 * const handleSort = (field: SortField) => {
 *     handleSort(field)
 * }
 *
 * const resetSort = () => {
 *     resetSort()
 * }
 */

import {useState} from 'react'

import type {SortOrder} from '@/pages/stockScreenerPage/types/tableSort'

interface SortState<T> {
    field: T | null
    order: SortOrder
}

export const useTableSort = <T>(initialField: T | null = null, initialOrder: SortOrder = 'none') => {
    const [sortState, setSortState] = useState<SortState<T>>({
        field: initialField,
        order: initialOrder,
    })

    const handleSort = (field: T) => {
        setSortState((prev) => {
            if (prev.field === field) {
                if (prev.order === 'desc') {
                    return {field, order: 'asc'}
                }
                if (prev.order === 'asc') {
                    return {field: null, order: 'none'}
                }
                return {field, order: 'desc'}
            }

            return {field, order: 'desc'}
        })
    }

    const resetSort = () => setSortState({field: null, order: 'none'})

    return {
        sortState,
        handleSort,
        resetSort,
    }
}
