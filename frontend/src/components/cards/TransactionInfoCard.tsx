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
        <div className='group relative 
                        p-3 md:p-4 lg:p-5 mx-1 rounded-2xl
                        bg-card
                        shadow-sm hover:shadow-lg dark:hover:shadow-2xl
                        hover:border-primary/20
                        hover:-translate-y-1 hover:scale-[1.01]
                        transition-all duration-300 ease-out
                        backdrop-blur-sm'>

            {/* Mobile + Small Tablet: Stack vertically */}
            <div className='flex flex-col gap-3 md:hidden'>
                {/* Top Row: Icon + Title + Delete */}
                <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                        {/* Icon */}
                        <div className='p-2.5 rounded-full bg-primary/8 flex-shrink-0'>
                            {icon ? (
                                icon.startsWith('http') ? (
                                    <img src={icon} alt="emoji" className="w-5 h-5" />
                                ) : (
                                    <span className='text-lg'>{icon}</span>
                                )
                            ) : (
                                <span className='text-lg'>💼</span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className='text-sm font-semibold text-foreground truncate flex-1'>
                            {title}
                        </h3>
                    </div>

                    {/* Delete Button */}
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className='p-2 rounded-full text-muted-foreground/60 
                                       hover:text-red-500 hover:bg-red-500/10 
                                       transition-all duration-200'
                            aria-label="Delete transaction"
                        >
                            <LuTrash2 className='w-4 h-4' />
                        </button>
                    )}
                </div>

                {/* Bottom Row: Category + Date + Amount */}
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-2 flex-1 min-w-0'>
                        {/* Category */}
                        {category && (
                            <span className='inline-flex items-center gap-1 px-2 py-0.5 
                                           bg-primary/12 text-primary text-xs font-medium
                                           rounded-full border border-primary/20 flex-shrink-0'>
                                <LuTag className='w-3 h-3' />
                                <span className='truncate max-w-16'>{category}</span>
                            </span>
                        )}

                        {/* Date */}
                        <time className='text-xs text-muted-foreground font-medium truncate'>
                            {formatDate(date)}
                        </time>
                    </div>

                    {/* Amount Badge */}
                    <div className={`px-2.5 py-1.5 rounded-lg font-bold text-xs
                        flex items-center gap-1.5 flex-shrink-0
                        ${type.toLowerCase() === 'income'
                            ? 'text-green-700 bg-gradient-to-br from-green-50 to-green-100 dark:text-green-300 dark:from-green-900/40 dark:to-green-800/40'
                            : 'text-red-700 bg-gradient-to-br from-red-50 to-red-100 dark:text-red-300 dark:from-red-900/40 dark:to-red-800/40'
                        }`}>
                        <span className='whitespace-nowrap'>
                            {type.toLowerCase() === 'income' ? '+' : '-'}${Number(amount).toLocaleString()}
                        </span>
                        {type.toLowerCase() === 'income' ? (
                            <LuTrendingUp className='w-3 h-3 text-green-600 dark:text-green-400' />
                        ) : (
                            <LuTrendingDown className='w-3 h-3 text-red-600 dark:text-red-400' />
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop + Large Tablet: Horizontal layout */}
            <div className='hidden md:flex items-center justify-between gap-4'>
                {/* Left Section */}
                <div className='flex items-center gap-3 lg:gap-4 flex-1 min-w-0'>
                    {/* Icon */}
                    <div className='p-3 lg:p-3.5 rounded-full bg-primary/8 
                                   group-hover:bg-primary/12 
                                   transition-all duration-300 ease-out
                                   ring-1 ring-primary/10 group-hover:ring-primary/20 flex-shrink-0'>
                        {icon ? (
                            icon.startsWith('http') ? (
                                <img src={icon} alt="emoji" className="w-5 h-5 lg:w-6 lg:h-6" />
                            ) : (
                                <span className='text-lg lg:text-xl'>{icon}</span>
                            )
                        ) : (
                            <span className='text-lg lg:text-xl'>💼</span>
                        )}
                    </div>

                    {/* Details */}
                    <div className='flex flex-col gap-1 flex-1 min-w-0'>
                        {/* Title + Category Row */}
                        <div className='flex items-center gap-2 min-w-0'>
                            <h3 className='text-sm lg:text-base font-semibold text-foreground 
                            truncate leading-tight group-hover:text-primary/90
                            transition-colors duration-200 flex-shrink'>
                                {title}
                            </h3>

                            {category && (
                                <span className='inline-flex items-center gap-1 px-2 py-0.5 
                                bg-primary/12 text-primary text-xs font-medium
                                rounded-full border border-primary/20
                                group-hover:bg-primary/15 group-hover:border-primary/30
                                transition-all duration-200 flex-shrink-0'>
                                    {/* <LuTag className='w-3 h-3' /> */}
                                    <span className='truncate max-w-20'>{category}</span>
                                </span>
                            )}
                        </div>

                        {/* Date */}
                        <time className='text-xs lg:text-sm text-muted-foreground font-medium
                        group-hover:text-muted-foreground/80 transition-colors duration-200'
                        >
                            {formatDate(date)}
                        </time>
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex items-center gap-2 flex-shrink-0'>
                    {/* Delete Button */}
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className='p-2 rounded-full text-muted-foreground/60 
                                       hover:text-red-500 hover:bg-red-500/10 
                                       hover:scale-110 active:scale-95
                                       transition-all duration-200 
                                       opacity-0 group-hover:opacity-100
                                       focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/20'
                            title="Delete transaction"
                            aria-label="Delete transaction"
                        >
                            <LuTrash2 className='w-4 h-4' />
                        </button>
                    )}

                    {/* Amount Badge */}
                    <div className={`px-3 py-2 lg:px-4 lg:py-2.5 rounded-lg font-bold text-sm
                        flex items-center gap-2 flex-shrink-0
                        ring-1 transition-all duration-300 group-hover:scale-105
                        ${type.toLowerCase() === 'income'
                            ? `text-green-700 bg-gradient-to-br from-green-50 to-green-100 
                               ring-green-200/50 group-hover:ring-green-300/70
                               dark:text-green-300 dark:from-green-900/40 dark:to-green-800/40 
                               dark:ring-green-700/30 dark:group-hover:ring-green-600/50`
                            : `text-red-700 bg-gradient-to-br from-red-50 to-red-100 
                               ring-red-200/50 group-hover:ring-red-300/70
                               dark:text-red-300 dark:from-red-900/40 dark:to-red-800/40 
                               dark:ring-red-700/30 dark:group-hover:ring-red-600/50`
                        }`}>

                        <span className='font-bold tracking-wide whitespace-nowrap'>
                            {type.toLowerCase() === 'income' ? '+' : '-'}${Number(amount).toLocaleString()}
                        </span>

                        {type.toLowerCase() === 'income' ? (
                            <LuTrendingUp className='w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0' />
                        ) : (
                            <LuTrendingDown className='w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0' />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard