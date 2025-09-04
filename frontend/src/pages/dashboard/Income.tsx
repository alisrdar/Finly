import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { incomeService } from '../../services/api'
import type { Income } from '../../types'
// import type { IncomeFormData } from '../../types'
import Modal from '../../components/Modal'
import IncomeOverView from '../../components/income/IncomeOverView'
import AddIncomeForm from '../../components/income/AddIncomeForm'
// import { set } from 'react-hook-form'
import toast from 'react-hot-toast'
import IncomeTable from '../../components/income/IncomeTable'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState<string | null>(null);
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
    try {
      await incomeService.deleteIncome(id);
      setIncomeData((prev) => prev.filter((income) => income._id !== id));
      toast.success('Income deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete income');
    }
  };

  // Download Excel
  const handleDownloadExcel = async () => {
    try {
      const blob = await incomeService.downloadIncome();

      // Url for blob
      const url = window.URL.createObjectURL(new Blob([blob]));

      // Creating a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;

      // getting filename from content-disposition header
      const contentDisposition = blob.type.split(';')[1];
      const fileNameMatch = contentDisposition ? contentDisposition.match(/filename="?(.+)"?/) : null;
      const fileName = fileNameMatch ? fileNameMatch[1] : 'income_data.xlsx';

      // Setting the download attribute with a default filename
      link.download = fileName || 'income_data.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Income data downloaded successfully');

    } catch (error) {
      console.log(error);
      toast.error('Failed to download income data');
    }
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
          <div>
            <IncomeTable
              onDownload={handleDownloadExcel}
              transactionData={incomeData}
              setDeleteModalOpen={setDeleteModalOpen}
              setSelectedIncomeId={setSelectedIncomeId}
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

        <Modal
          title='Delete Income'
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <div className=''>
            <DeleteAlert
              incomeId={selectedIncomeId ?? undefined}
              onDeleteIncome={(id) => {
                handleDeleteIncome(id);
                setDeleteModalOpen(false);
                setSelectedIncomeId(null);
              }} />
          </div>
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income
