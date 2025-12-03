import {useState, useEffect} from 'react'

import {ChevronDown} from 'lucide-react'

import {Button} from '@/common/components/button'
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/popover'
import {RadioGroup, RadioGroupItem} from '@/common/components/radio-group'
import {cn} from '@/common/utils/cn'

export interface FilterOption<T extends string> {
    value: T
    label: string
}

interface FilterProps<T extends string> {
    title: string
    options: FilterOption<T>[]
    selectedValue: T | null
    onConfirm: (value: T | null) => void
    onReset?: () => void
}

const Filter = <T extends string>({title, options, selectedValue, onConfirm, onReset}: FilterProps<T>) => {
    const [open, setOpen] = useState(false)
    const [tempValue, setTempValue] = useState<T | null>(selectedValue)

    useEffect(() => {
        setTempValue(selectedValue)
    }, [selectedValue])

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen) {
            setTempValue(selectedValue)
        }
    }

    const handleConfirm = () => {
        onConfirm(tempValue)
        setOpen(false)
    }

    const handleReset = () => {
        setTempValue(null)
        if (onReset) {
            onReset()
        }
    }

    const selectedLabel = selectedValue ? options.find((option) => option.value === selectedValue)?.label : null
    const hasSelection = selectedValue !== null

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant={hasSelection ? 'default' : 'outline'} className={cn(hasSelection && 'font-semibold')}>
                    {hasSelection ? <span className="text-xs">({selectedLabel})</span> : title}
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
                <RadioGroup value={tempValue || ''} onValueChange={(value) => setTempValue(value as T)}>
                    <div className="space-y-1">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className={cn(
                                    'flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left hover:bg-accent',
                                    tempValue === option.value && 'bg-accent',
                                )}
                            >
                                <RadioGroupItem value={option.value} id={option.value} />
                                <span className={cn('text-sm', tempValue === option.value && 'font-medium')}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </RadioGroup>
                <div className="flex justify-end border-t pt-4">
                    <Button onClick={handleConfirm}>확인</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Filter
