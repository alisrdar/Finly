import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import type { Expense } from '../../types'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import { expenseService } from '../../services/api'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/expense/AddExpenseForm'
import ExpenseTable from '../../components/expense/ExpenseTable'
import DeleteAlert from '../../components/DeleteAlert'

const ExpensePage = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true)
  const [AddModalOpen, setAddModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchExpenseData = async () => {
    try {
      const data = await expenseService.getAllExpense();
      setExpenseData(data);

    } catch (error) {
      console.log(error);
      toast.error('Can not fetch Income Data');
    } finally {
      setLoading(false);
    }
  }

  const handeAddExpense = async (expense: Expense) => {
    const newExpense = await expenseService.addExpense(expense);
    const normalizedExpense: Expense = {
      ...newExpense,
      amount: Number(newExpense.amount),
      date: new Date(newExpense.date).toISOString(), // ensure it's a valid date string
    };
    setExpenseData((prev) => [normalizedExpense, ...prev])
    setAddModalOpen(false);
  }

  const handeDeleteExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenseData((prev) => prev.filter((expense) => expense._id !== id))
      toast.success('Expense deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete expense');
    }
  }

  const handleDownloadExcel = async () => {
    try {
      const blob = await expenseService.downloadExpense();

      // url
      const url = window.URL.createObjectURL(new Blob([blob]));

      // creating anchor tag
      const a_tag = document.createElement('a');
      a_tag.href = url;

      // getting filename from content-disposition header
      const contentDisposition = blob.type.split(';')[1];
      const fileNameMatch = contentDisposition ? contentDisposition.match(/filename="?(.+)"?/) : null;
      const fileName = fileNameMatch ? fileNameMatch[1] : 'income_data.xlsx';

      // Setting download Attribute

      a_tag.setAttribute('download', fileName);
      document.body.appendChild(a_tag);
      a_tag.click();
      a_tag.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Excel sheet downloaded successfully');

    } catch (error) {
      console.log(error);
      toast.error('Failed to download Excel sheet')
    }
  }

  useEffect(() => {
    fetchExpenseData();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout activeMenu='expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6 mx-2'>
          <ExpenseOverview
            onAddExpense={() => setAddModalOpen(true)}
            transactions={expenseData}
          />
          <ExpenseTable
            onDownload={handleDownloadExcel}
            transactionData={expenseData}
            setDeleteModalOpen={setDeleteModalOpen}
            setSelectedExpenseId={setSelectedExpenseId}
          />
        </div>

        {/* Add Expense Modal */}
        <Modal
          title='Add Expense'
          isOpen={AddModalOpen}
          onClose={() => setAddModalOpen(false)}
        >
          <div className=''>
            <AddExpenseForm
              onAddExpense={handeAddExpense}
              onCancel={() => setAddModalOpen(false)}
            />
          </div>
        </Modal>

        {/* Delete Modal */}
        <Modal
          title='Delete Expense'
          isOpen={DeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DeleteAlert
            onDeleteIncome={(id) => {
              handeDeleteExpense(id);
              setDeleteModalOpen(false);
              setSelectedExpenseId(null);
            }}
            incomeId={selectedExpenseId ?? undefined}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default ExpensePage
