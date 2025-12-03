import {X} from 'lucide-react'

import {Button} from '@/common/components/button'

interface FilterResetButtonProps {
    disabled?: boolean
}

const FilterResetAllButton = ({disabled}: FilterResetButtonProps) => {
    const handleResetAllClick = () => {
        // TODO: 전체 초기화 로직 구현
    }

    return (
        <Button variant="ghost" onClick={handleResetAllClick} disabled={disabled} className="text-sm">
            <X className="size-4" />
            전체 초기화
        </Button>
    )
}

export default FilterResetAllButton
