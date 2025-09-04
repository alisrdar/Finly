import React from 'react'
import CardWrapper from '../cards/CardWrapper'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Income } from '../../types'
import { transformIncomesForTable } from '../../utils/helper'

interface IncomeTableProps {
    onDownload: () => void
    onDelete?: () => void,
    setSelectedIncomeId: React.Dispatch<React.SetStateAction<string | null>>,
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    transactionData?: Income[]
}

const IncomeTable: React.FC<IncomeTableProps> = ({onDownload, transactionData, setSelectedIncomeId, setDeleteModalOpen}) => {
    const tableData = transactionData ? transformIncomesForTable(transactionData) : [];
  return (
    <CardWrapper
        title='Income Sources'
        description=' '
        downloadBtnText='download'
        onDownload={onDownload}
    >
        <div className='grid grid-cols-1  sm:grid-cols-2  gap-4'>
            {tableData.length > 0 ? (
                tableData.map((item) => (
                    <TransactionInfoCard 
                        key= {item.name + item.fullDate}
                        title={item.name}
                        amount={item.amount}
                        icon={item.icon || ''}
                        date={item.date || ''}
                        hideDeleteBtn={false}
                        onDelete={() => {
                            setSelectedIncomeId(item.id);
                            setDeleteModalOpen(true);
                        }}
                        type='Income'
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

export default IncomeTable
