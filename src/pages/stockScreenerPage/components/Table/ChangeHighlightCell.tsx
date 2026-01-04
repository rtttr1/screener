import {useEffect, useRef, useState, memo} from 'react'

import type {ReactNode} from 'react'

import {TableCell} from '@/common/components/table'
import {cn} from '@/common/utils/cn'
import {getChangeBackgroundColor} from '@/pages/stockScreenerPage/utils/stockTable'

interface ChangeHighlightCellProps {
    priceChangeStatus: string
    currentValue: string | number
    className?: string
    children: ReactNode
}

// 등락 상태에 따라 글자영역의 배경색을 변경하는 셀 컴포넌트
const ChangeHighlightCell = ({priceChangeStatus, currentValue, className, children}: ChangeHighlightCellProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const prevValueRef = useRef<string | number | null>(null)

    useEffect(() => {
        const prev = prevValueRef.current
        const current = currentValue

        prevValueRef.current = current

        // 값이 변경되지 않았으면 애니메이션 실행 x
        if (prev === current) {
            return
        }

        // 배경색 표시 (다음 프레임에 실행)
        const rafId = requestAnimationFrame(() => {
            setIsVisible(true)
        })

        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 700)

        return () => {
            cancelAnimationFrame(rafId)
            clearTimeout(timer)
        }
    }, [currentValue])

    const backgroundClass = getChangeBackgroundColor(priceChangeStatus)

    return (
        <TableCell className={className}>
            <span className="relative inline-block">
                <span className="relative">{children}</span>
                {backgroundClass && (
                    <span
                        className={cn(
                            'absolute -left-1 -right-1 -top-0.5 -bottom-0.5 -z-10 rounded transition-opacity duration-300 ease-in-out',
                            backgroundClass,
                            isVisible ? 'opacity-100' : 'opacity-0',
                        )}
                    />
                )}
            </span>
        </TableCell>
    )
}

export default memo(ChangeHighlightCell)
