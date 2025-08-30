import React from 'react'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Expense } from '../../types'
import DashButton from '../ui/dashButton'


const RecentExpense: React.FC<{
    expenses: Expense[],
    onSeeMore: () => void
}> =
    ({ expenses, onSeeMore }) => {
        return (
            <div className="bg-card px-6 border p-4 rounded-lg shadow-md">
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-xl text-foreground'>
                        Recent Expenses
                    </h2>
                    <DashButton btnText='See More' onClick={onSeeMore} />
                </div>
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
            </div>
        )
    }

export default RecentExpense
