import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { incomeService } from '../../services/api'
import type { Income } from '../../types'
// import type { IncomeFormData } from '../../types'
import Modal from '../../components/Modal'
import IncomeOverView from '../../components/income/IncomeOverView'
import AddIncomeForm from '../../components/income/AddIncomeForm'
import { set } from 'react-hook-form'
import toast from 'react-hot-toast'

const Income = () => {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const fetchIncomeData = async () => {
    try {
      const result = await incomeService.getAllIncome();
      setIncomeData(result)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  

  // Add Income
  const handleAddIncome = async (income: Income) => {
    try {
      const newIncome = await incomeService.addIncome(income);
      setIncomeData((prev) => [newIncome, ...prev]);
      setModalOpen(false);
      toast.success('Income added successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to add income');
    }
  };

  // Delete Income
  const handleDeleteIncome = async (id: string) => {
    // Logic for deleting income
  };

  // Download Excel
  const handleDownloadExcel = async () => {
    // Logic for downloading Excel
  };

  useEffect(() => {
    fetchIncomeData();
  }, [incomeData]);



  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <DashboardLayout activeMenu='income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6 mx-2'>
          <div>
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setModalOpen(true)}
            />
          </div>
        </div>

        <Modal
          title='Add Income'
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className=''>
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income
