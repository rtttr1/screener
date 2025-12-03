import TabButton from '@/common/components/TabButton'
import {cn} from '@/common/utils/cn'

interface TabItem<T extends string> {
    value: T
    label: string
}

interface TabListProps<T extends string> extends React.HTMLAttributes<HTMLUListElement> {
    items: TabItem<T>[]
    currentItem: T
    onItemClick: (value: T) => void
}

const TabList = <T extends string>({items, currentItem, onItemClick, className, ...props}: TabListProps<T>) => {
    return (
        <ul role="tablist" className={cn('flex gap-2 p-1 border rounded-md', className)} {...props}>
            {items.map((item) => (
                <li key={item.value}>
                    <TabButton isActive={currentItem === item.value} onClick={() => onItemClick(item.value)}>
                        {item.label}
                    </TabButton>
                </li>
            ))}
        </ul>
    )
}

export default TabList
