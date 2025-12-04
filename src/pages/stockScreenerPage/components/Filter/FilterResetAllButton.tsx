import {useSetAtom} from 'jotai'
import {X} from 'lucide-react'

import {Button} from '@/common/components/button'
import {resetAllFiltersAtom} from '@/pages/stockScreenerPage/atoms/filterAtoms'

const FilterResetAllButton = () => {
    const handleResetAllFilters = useSetAtom(resetAllFiltersAtom)
    return (
        <Button variant="ghost" onClick={handleResetAllFilters} className="text-sm">
            <X className="size-4" />
            전체 초기화
        </Button>
    )
}

export default FilterResetAllButton
