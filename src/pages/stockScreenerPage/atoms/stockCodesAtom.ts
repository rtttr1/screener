import {atom} from 'jotai'

// 실시간 시세 조회를 위한 종목 코드 상태
export const domesticStockCodesAtom = atom<string[]>([])
export const worldstockStockCodesAtom = atom<string[]>([])
