import React from 'react'
import {
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
    LuTag
} from 'react-icons/lu'
import moment from 'moment'

interface TransactionInfoCardProps {
    title: string;
    icon: string;
    amount: number;
    date: string;
    type: 'Income' | 'Expense';
    category?: string;
    hideDeleteBtn?: boolean;
    onDelete?: () => void;
}

const TransactionInfoCard: React.FC<TransactionInfoCardProps> = ({
    title,
    icon,
    amount,
    date,
    type,
    category,
    hideDeleteBtn,
    onDelete
}) => {
    // Validate date before passing to moment
    const formatDate = (dateString: string) => {
        const date = moment(dateString);
        return date.isValid() ? date.format('MMM D, YYYY') : 'Invalid Date';
    };

    return (
        <div className='group relative flex justify-between items-center flex-wrap gap-4
                        p-4 mx-1 rounded-xl
                        bg-accent dark:bg-slate-800/15
                        shadow-md shadow-primary/10 dark:shadow-none
                        hover:shadow-xl dark:hover:shadow-sm hover:shadow-primary/10
                        hover:bg-card-hover 
                        hover:-translate-y-0.5
                        transition-all duration-300 ease-in-out'>

            {/* Left Section */}
            <div className='flex items-center gap-4'>
                {/* Icon with enhanced styling */}
                <div className='relative p-3 rounded-full bg-primary/10
                               group-hover:shadow-xl group-hover:scale-105
                               transition-all duration-300'>
                    {icon ? (
                        icon.startsWith('http') ? (
                            <img src={icon} alt="emoji" className="w-6 h-6" />
                        ) : (
                            <span className='text-xl'>{icon}</span>
                        )
                    ) : (
                        // default icon if none provided
                        <span className='text-xl'>{'💼'}</span>
                    )}
                </div>

                {/* Transaction Details */}
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-wrap items-center gap-2'>
                        <span className='text-sm sm:text-base font-semibold text-foreground leading-tight'>
                            {title}
                        </span>

                        {/* Category Badge - no border */}
                        {category && (
                            <span className='inline-flex items-center gap-1 px-2 py-0.5 
                                           bg-primary/15 text-primary 
                                           rounded-md text-xs font-medium
                                           shadow-sm'>
                                <LuTag className='w-3 h-3' />
                                {category}
                            </span>
                        )}
                    </div>

                    <span className='text-xs text-muted-foreground font-medium'>
                        {formatDate(date)}
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className='flex items-center gap-2 sm:gap-3'>
                {/* Delete Button */}
                {!hideDeleteBtn && (
                    <button
                        onClick={onDelete}
                        className='p-2 rounded-lg text-muted-foreground hover:text-red-500 
                                   hover:bg-red-500/10 hover:shadow-lg
                                   transition-all duration-200 
                                   opacity-70 sm:opacity-0 group-hover:opacity-100
                                   hover:scale-110 active:scale-95'
                        title="Delete transaction"
                    >
                        <LuTrash2 className='w-4 h-4' />
                    </button>
                )}

                {/* Amount Badge - no borders */}
                <div className={`px-3 py-1 sm:px-4 sm:py-2.5 rounded-lg font-semibold text-sm
                    flex items-center gap-2 shadow-md
                    transition-all duration-300 group-hover:shadow-xs
                    ${type.toLowerCase() === 'income'
                        ? 'text-green-700 bg-gradient-to-r from-green-50 to-green-100 dark:text-green-300 dark:from-green-900/30 dark:to-green-800/30'
                        : 'text-red-700 bg-gradient-to-r from-red-100 to-red-200 dark:text-red-300 dark:from-red-900/30 dark:to-red-800/30'
                    }`}>

                    <span className='font-bold'>
                        {type.toLowerCase() === 'income' ? '+' : '-'}
                        {Number(amount).toLocaleString()}
                    </span>

                    {type.toLowerCase() === 'income' ? (
                        <LuTrendingUp className='w-4 h-4 text-green-500' />
                    ) : (
                        <LuTrendingDown className='w-4 h-4 text-red-500' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard