/**
 * 테이블 정렬 상태 관리 훅 (API 스펙에 맞게 수정)
 * @param initialField 초기 정렬 필드
 * @returns 정렬 상태와 정렬 핸들러
 * @example
 * const {sortState, handleSort, resetSort} = useTableSort<SortField>()
 *
 * const handleSort = (field: SortField) => {
 *     handleSort(field)
 * }
 */

import {useState} from 'react'

import type {SortOrder} from '@/pages/stockScreenerPage/types/sort'

interface SortState<T> {
    field: T | null
    order: SortOrder
}

export const useTableSort = <T>(initialField: T | null = null) => {
    const [sortState, setSortState] = useState<SortState<T>>({
        field: initialField,
        order: initialField ? 'desc' : 'none',
    })

    const handleSort = (field: T) => {
        setSortState((prev) => {
            // 등락률 필드의 경우: 기본 -> desc -> asc -> 기본
            if (field === 'fluctuationsRatio') {
                if (prev.field === 'fluctuationsRatio') {
                    if (prev.order === 'none') {
                        return {field, order: 'desc'}
                    }
                    if (prev.order === 'desc') {
                        return {field, order: 'asc'}
                    }
                    if (prev.order === 'asc') {
                        return {field: null, order: 'none'}
                    }
                }
                // 다른 필드에서 등락률로 전환
                return {field, order: 'desc'}
            }

            // 다른 필드의 경우: 기본 -> 활성화(desc) -> 기본
            if (prev.field === field && prev.order === 'desc') {
                return {field: null, order: 'none'}
            }

            // 다른 필드를 클릭하거나 기본 상태에서 클릭하면 활성화
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
