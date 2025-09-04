import React from 'react'


const DeleteAlert: React.FC<{ onDeleteIncome: (id: string) => void; incomeId?: string }> = (
    { 
        onDeleteIncome,
        incomeId 
    }
) => {
    return (
        <div>
            <h2>Are you sure you want to delete this income?</h2>
            <button
                type='button'
                className='bg-red-500 dark:bg-red-800/10 font-semibold text-white dark:text-red-600 px-4 py-2 rounded-lg mt-4 cursor-pointer hover:bg-red-600 dark:hover:bg-red-800/20 hover:scale-105 transition '
                onClick={() => onDeleteIncome(incomeId || '')}
            >
                Delete
            </button>
        </div>
    )
}

export default DeleteAlert
