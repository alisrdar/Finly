import React from 'react'
import { LuPlus, LuArrowRight, LuDownload } from 'react-icons/lu'

const CardWrapper: React.FC<{
    title: string,
    description?: string,
    children: React.ReactNode,
    headingStyle?: string,
    btnText?: string,
    downloadBtnText?: string,
    onBtnClick?: () => void,
    onDownload?: () => void
}> = ({
    title,
    children,
    headingStyle = 'text-foreground text-lg sm:text-xl font-semibold',
    description,
    btnText,
    downloadBtnText,
    onBtnClick,
    onDownload
}) => {
        const btnColor = btnText === 'See All' ? 'card-btn' : 'add-btn';
        const flexReverse = btnText === 'See All' ? 'flex-row-reverse' : '';

        return (
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-md border border-border hover:shadow-sm transition-all duration-300 ease-in-out dark:hover:scale-[1.02] dark:sm:hover:scale-101"
            onClick={(e) => e.stopPropagation()}> 

                {/* Header Section - Always Horizontal */}
                <div className='flex justify-between items-center mb-3 sm:mb-2'>
                    <div className="flex-1 min-w-0"> {/* Prevent text overflow */}
                        <h2 className={`${headingStyle} leading-tight`}>
                            {title}
                        </h2>
                    </div>

                    {/* Compact Button */}
                    {onBtnClick && (
                        <button
                            onClick={onBtnClick}
                            className={`
                            ${btnColor} 
                            flex ${flexReverse} items-center sm:gap-2 
                            px-2 py-1 sm:px-3 sm:py-1.5
                            text-xs sm:text-sm
                            transition-all duration-200 
                            hover:scale-105 active:scale-95
                            shadow-sm hover:shadow-md
                            font-medium
                            whitespace-nowrap
                            ml-3
                        `}
                        >
                            {btnText === 'See All' ? (
                                <>
                                    <span className="hidden xs:inline sm:inline">
                                        {btnText || 'More'}
                                    </span>
                                    <LuArrowRight className='text-sm h-5 w-5 md:h-4 md:w-4' />
                                </>
                            ) : (
                                <>
                                    <LuPlus className='text-sm h-5 w-5 md:h-4 md:w-4' />
                                    <span className="hidden xs:inline sm:inline">
                                        {btnText || 'Add'}
                                    </span>
                                </>
                            )}

                        </button>
                    )}

                    {/* Download Button */}
                    {downloadBtnText && (
                        <button
                            onClick={onDownload}
                            className='card-btn px-2 py-1 text-xs ml-2'
                        >
                            <LuDownload className='text-lg sm:text-sm h-5 w-5 md:h-4 md:w-4' />
                            <span className="hidden sm:inline">{downloadBtnText}</span>
                        </button>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className='text-muted-foreground text-sm font-light mb-4 leading-relaxed'>
                        {description}
                    </p>
                )}

                {/* Content */}
                <div className="w-full">
                    {children}
                </div>
            </div>
        )
    }

export default CardWrapper