import {Button} from '@/common/components/button'

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean
    onClick: () => void
}

const TabButton = ({isActive, onClick, children, className, ...props}: TabButtonProps) => {
    return (
        <Button
            role="tab"
            aria-selected={isActive}
            onClick={onClick}
            variant={isActive ? 'secondary' : 'ghost'}
            className={className}
            {...props}
        >
            {children}
        </Button>
    )
}

export default TabButton
