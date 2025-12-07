import type {SortType, OverseasSortType} from '@/pages/stockScreenerPage/types/api'
import type {SortField, SortOrder} from '@/pages/stockScreenerPage/types/sort'

import {SORT_FIELDS, SORT_ORDERS} from '@/pages/stockScreenerPage/constants/sort'

interface SortState {
    field: SortField | null
    order: SortOrder
}

/**
 * 국내 주식 API용 정렬 타입으로 변환
 * @param sortState 정렬 상태
 * @returns API SortType
 */
export const toDomesticApiSortType = (sortState: SortState): SortType => {
    if (!sortState.field) {
        return SORT_FIELDS.MARKET_VALUE
    }

    if (sortState.field === SORT_FIELDS.FLUCTUATIONS_RATIO) {
        return sortState.order === SORT_ORDERS.ASC ? 'down' : 'up'
    }

    return sortState.field as SortType
}

/**
 * 해외 주식 API용 정렬 타입으로 변환
 * @param sortState 정렬 상태
 * @returns API OverseasSortType
 */
export const toOverseasApiSortType = (sortState: SortState): OverseasSortType => {
    if (!sortState.field) {
        return SORT_FIELDS.MARKET_VALUE
    }

    // 등락률 필드의 경우 order에 따라 up/down 선택
    if (sortState.field === SORT_FIELDS.FLUCTUATIONS_RATIO) {
        return sortState.order === SORT_ORDERS.ASC ? 'down' : 'up'
    }

    // 해외 주식 API는 'quantTop' 대신 'top' 사용
    if (sortState.field === SORT_FIELDS.QUANT_TOP) {
        return 'top'
    }

    return sortState.field as OverseasSortType
}
