import SvgBadgeNpay from '@/shared/assets/svg/BadgeNpay'

const Header = () => {
    return (
        <header className="flex items-center gap-2 px-8 py-6 border-b border-gray-200">
            <SvgBadgeNpay width={100} aria-label="NaverPay Badge" />
            <h1 className="text-xl font-bold">Stock Screener</h1>
        </header>
    )
}

export default Header
