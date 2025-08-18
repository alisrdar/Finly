import React from 'react'
import { DollarSign } from 'lucide-react'

const Logo = () => {
    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-secondary-foreground font-bold" />
            </div>
            <span className="text-2xl font-extrabold text-foreground">Finley</span>
        </div>
    )
}

export default Logo
