import React from 'react'
import type { Income } from '../../types'
import DashButton from '../ui/dashButton'
import  TransactionInfoCard from '../cards/TransactionInfoCard'

const RecentIncome: React.FC<{
    income: Income[],
    onSeeMore: () => void
    
}> = ({ income, onSeeMore }) => {
    return (
        <div className='bg-card px-6 p-4 border rounded-lg shadow-md hover:shadow-sm transition-all duration-300 ease-in-out'>
            <div className="flex justify-between items-center">
                <h5 className='font-semibold text-lg text-foreground'>
                    Recent Income
                </h5>
                <DashButton btnText='See All' onClick={onSeeMore} />
            </div>
            <div className='space-y-1 my-4 pt-4'>
                {income.map((inc) => (
                    <TransactionInfoCard 
                        key={inc._id}
                        title={inc.title}
                        icon={inc.icon}
                        amount={inc.amount}
                        date={new Date(inc.date).toLocaleDateString()}
                        type='Income'               hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentIncome
