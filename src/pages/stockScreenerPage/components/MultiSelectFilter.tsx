import {useState, useEffect} from 'react'

import {ChevronDown} from 'lucide-react'

import {Button} from '@/common/components/button'
import {Checkbox} from '@/common/components/checkbox'
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/popover'
import {cn} from '@/common/utils/cn'

export interface FilterOption<T extends string> {
    value: T
    label: string
}

interface MultiSelectFilterProps<T extends string> {
    title: string
    options: FilterOption<T>[]
    selectedValues: T[]
    onConfirm: (values: T[]) => void
    onReset?: () => void
}

const MultiSelectFilter = <T extends string>({
    title,
    options,
    selectedValues,
    onConfirm,
    onReset,
}: MultiSelectFilterProps<T>) => {
    const [open, setOpen] = useState(false)
    const [tempValues, setTempValues] = useState<T[]>(selectedValues)

    useEffect(() => {
        setTempValues(selectedValues)
    }, [selectedValues])

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            setTempValues(selectedValues)
        }
    }

    const handleConfirm = () => {
        onConfirm(tempValues)
        setOpen(false)
    }

    const handleReset = () => {
        setTempValues([])
        if (onReset) {
            onReset()
        }
    }

    const handleToggle = (value: T) => {
        setTempValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
    }

    const hasSelection = selectedValues.length > 0

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant={hasSelection ? 'default' : 'outline'} className={cn(hasSelection && 'font-semibold')}>
                    {title}
                    {hasSelection && (
                        <span className="rounded-full bg-primary-foreground w-4 h-4 text-xs text-black">
                            {selectedValues.length}
                        </span>
                    )}
                    <ChevronDown className="size-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 space-y-4" align="start">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{title}</h3>
                    {hasSelection && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            초기화
                        </button>
                    )}
                </div>
                <div className="space-y-1">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className={cn(
                                'flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left hover:bg-accent',
                                tempValues.includes(option.value) && 'bg-accent',
                            )}
                        >
                            <Checkbox
                                checked={tempValues.includes(option.value)}
                                onCheckedChange={() => handleToggle(option.value)}
                            />
                            <span className={cn('text-sm', tempValues.includes(option.value) && 'font-medium')}>
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end border-t pt-4">
                    <Button onClick={handleConfirm}>확인</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelectFilter
