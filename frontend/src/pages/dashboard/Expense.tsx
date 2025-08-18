import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'

const Expense = () => {
  return (
   <DashboardLayout activeMenu='expense'>
     <div className='text-2xl text-black'>
       Expenses
     </div>
   </DashboardLayout>
  )
}

export default Expense
