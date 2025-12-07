import type {SORT_FIELDS, SORT_ORDERS} from '@/pages/stockScreenerPage/constants/sort'

export type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS]

export type SortOrder = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS]
