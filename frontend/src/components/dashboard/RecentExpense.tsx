import React from 'react'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Expense } from '../../types'
// import DashButton from '../ui/DashButton'
import CardWrapper from '../cards/CardWrapper'


const RecentExpense: React.FC<{
    expenses: Expense[],
    onSeeMore: () => void
}> =
    ({ expenses, onSeeMore }) => {
        // console.log(expenses);
        return (
            <CardWrapper
                title="Recent Expenses"
                onBtnClick={onSeeMore}
                btnText='See All'
            >
                <div className='space-y-1 my-2 pt-4'>
                    {expenses.map((exp) => (
                        <TransactionInfoCard
                            key={exp._id}
                            title={exp.title}
                            icon={exp.icon}
                            amount={exp.amount}
                            date={new Date(exp.date).toLocaleDateString()}
                            type='Expense'
                            hideDeleteBtn={true}
                        />
                    ))}
                </div>
            </CardWrapper>
        )
    }

export default RecentExpense
