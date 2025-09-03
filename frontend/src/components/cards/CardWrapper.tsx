import React from 'react'
import { LuPlus, LuArrowRight } from 'react-icons/lu'

const CardWrapper: React.FC<{
    title: string,
    description?: string,
    children: React.ReactNode,
    headingStyle?: string,
    btnText?: string,
    onBtnClick?: () => void

}> = ({
    title, 
    children,
    headingStyle = 'text-foreground text-lg sm:text-xl font-semibold',
    description,
    btnText,
    onBtnClick
}) => {
    const btnColor = btnText === 'See All' ? 'card-btn' : 'add-btn';
    const flexReverse = btnText === 'See All' ? 'flex-row-reverse' : '';
    
    return (
        <div className="bg-card p-4 sm:p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] sm:hover:scale-101">
            
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-2'>
                <h2 className={`${headingStyle} leading-tight`}>
                    {title}
                </h2>

                {/* Add Button  */}
                {onBtnClick && (
                    <button
                        onClick={onBtnClick}
                        className={`
                            ${btnColor} relative 
                            flex ${flexReverse} items-center justify-center gap-2 
                            w-full sm:w-auto 
                            px-4 py-2 sm:px-3 sm:py-1.5
                            transition-all duration-200 
                            hover:scale-105 active:scale-95
                            shadow-sm hover:shadow-md
                            font-medium
                        `}
                    >
                        {btnText == 'See All' ? (
                            <LuArrowRight className='text-base sm:text-sm' />
                        ) : (
                            <LuPlus className='text-base sm:text-sm' />
                        )}
                        <span className="sm:hidden">{btnText || 'Add New'}</span>
                        <span className="hidden sm:inline">{btnText || 'Add'}</span>
                    </button>
                )}
            </div>

            {/* Description */}
            {description && (
                <p className='text-muted-foreground text-sm sm:text-base font-light mb-4 leading-relaxed'>
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