import React from 'react'
import CardWrapper from '../cards/CardWrapper'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Expense } from '../../types'
import { transformExpensesForTable } from '../../utils/helper'

interface ExpenseTableProps {
    onDownload: () => void;
    onDelete?: () => void;
    setSelectedExpenseId: React.Dispatch<React.SetStateAction<string | null>>;
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    transactionData?: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
    onDownload,
    transactionData,
    setSelectedExpenseId,
    setDeleteModalOpen,
}) => {

    const tableData = transactionData ? transformExpensesForTable(transactionData) : [];
    return (
        <CardWrapper
            title='Expense Sources'
            onDownload={onDownload}
            downloadBtnText='download'
        >
            <div className='grid grid-cols-1  sm:grid-cols-2  gap-4'>
                { tableData?.length > 0 ? (
                    tableData.map((item) => (
                        <TransactionInfoCard
                            key={item.name + item.fullDate} 
                            type='Expense'
                            title={item.name}
                            amount={item.amount}
                            icon={item.icon || ''}
                            date={item.date || ''}
                            hideDeleteBtn={false}
                            onDelete={() => {
                                setSelectedExpenseId(item.id);
                                setDeleteModalOpen(true); // Opening Delete Modal

                            }}
                            category={item.category}
                        />
                    ))
                ): (
                    <p className='text-sm text-muted-foreground'>No income data available.</p>
                )}
            </div>
        </CardWrapper>
    )
}

export default ExpenseTable
