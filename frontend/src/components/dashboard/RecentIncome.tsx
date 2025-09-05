import React from 'react'
import type { Income } from '../../types'
// import DashButton from '../ui/DashButton'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import CardWrapper from '../cards/CardWrapper'

const RecentIncome: React.FC<{
    income: Income[],
    onSeeMore: () => void

}> = ({ income, onSeeMore }) => {
    return (
        <CardWrapper
            title="Recent Income"
            onBtnClick={onSeeMore}
            btnText='See All'
        >
            <div className='space-y-1 my-4 pt-4'>
                {income.map((inc) => (
                    <TransactionInfoCard
                        key={inc._id}
                        title={inc.title}
                        icon={inc.icon}
                        amount={inc.amount}
                        date={new Date(inc.date).toLocaleDateString()}
                        type='Income' 
                        hideDeleteBtn
                    />
                ))}
            </div>
        </CardWrapper>
    )
}

export default RecentIncome
