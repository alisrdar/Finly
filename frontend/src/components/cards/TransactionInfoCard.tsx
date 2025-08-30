import React from 'react'
import {
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from 'react-icons/lu'
import moment from 'moment'

interface TransactionInfoCardProps {
    title: string;
    icon: string;
    amount: number;
    date: string;
    type: 'Income' | 'Expense';
    hideDeleteBtn?: boolean;
    onDelete?: () => void;
}

const TransactionInfoCard: React.FC<TransactionInfoCardProps> = ({
    title,
    icon,
    amount,
    date,
    type,
    hideDeleteBtn,
    onDelete
}) => {
    return (
        <div className='group relative flex justify-between items-center 
                        p-3  rounded-lg 
                        bg-card
                        hover:shadow-sm 
                        hover:bg-card-hover 
                        transition-all duration-300 ease-in-out'>

            {/* Left Section */}
            <div className='flex items-center gap-3'>
                <div className='p-3 rounded-full bg-gray-100 dark:bg-slate-900/30 text-lg'>
                    {icon}
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm font-medium text-foreground'>{title}</span>
                    <span className='text-xs text-muted-foreground'>
                        {moment(date).format('MMM D, YYYY')}
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className='flex items-center gap-3'>
                {!hideDeleteBtn && (
                    <button
                        onClick={onDelete}
                        className='p-1.5 rounded-full text-gray-400 hover:text-red-500 
                                   hover:bg-red-500/10 
                                   transition-all duration-200 opacity-0 group-hover:opacity-100'
                    >
                        <LuTrash2 className='text-lg' />
                    </button>
                )}

                <div className={`px-3 py-1.5 rounded-lg font-medium text-sm flex items-center gap-1
                    ${type.toLowerCase() === 'income'
                        ? 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                        : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                    }`}>
                    {type.toLowerCase() === 'income' ? (
                        <>
                            +{Number(amount).toLocaleString()}
                            <LuTrendingUp className='text-green-500' />
                        </>
                    ) : (
                        <>
                            -{Number(amount).toLocaleString()}
                            <LuTrendingDown className='text-red-500' />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard
