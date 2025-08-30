import React from 'react'
// import { DollarSign } from 'lucide-react'
import {FaDollarSign} from 'react-icons/fa'

const Logo = () => {
    return (
        <div className="flex items-center space-x-3 ">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-sm">
                <FaDollarSign className="w-6 h-6 text-white font-extrabold" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/30 bg-clip-text text-transparent">
                Finly
            </span>
        </div>
    )
}

export default Logo
