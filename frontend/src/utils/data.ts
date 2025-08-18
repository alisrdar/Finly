import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut
} from 'react-icons/lu'

export const SIDEBAR_LINKS = [
    {
        id: 1,
        icon: LuLayoutDashboard,
        label: 'dashboard',
        path: '/dashboard'
    },
    {
        id: 2,
        icon: LuHandCoins,
        label: 'income',
        path: '/income'
    },
    {
        id: 3,
        icon: LuWalletMinimal,
        label: 'expense',
        path: '/expense'
    },
    {
        id: 4,
        icon: LuLogOut,
        label: 'Logout',
        path: '/logout'
    }
]