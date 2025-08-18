import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { dashboardService } from '../../services/api'
import type { DashboardData } from '../../types'
import toast from 'react-hot-toast'
import TopCard from '../../components/TopCard'
import {
  LuCreditCard,
  LuHandCoins,
  LuWalletMinimal,
} from 'react-icons/lu'


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const fetchDashBoardData = async () => {
    try {
      const response = await dashboardService.getDashboardData();
      setDashboardData(response);
      console.log(dashboardData);
      
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashBoardData();
  }, [])

  const TopCardData = [
    {
      title: 'Total Balance',
      amount: Number(dashboardData?.totalIncomeAmount) - Number(dashboardData?.totalExpenseAmount) || '0',
      Icon: LuCreditCard,
      color: "from-purple-500 to-violet-600",
    }, {
      title: 'Total Income',
      amount: dashboardData?.totalIncomeAmount || '0',
      Icon: LuWalletMinimal,
      color: "from-orange-400 to-red-500",
    }, {
      title: 'Total Expense',
      amount: dashboardData?.totalExpenseAmount || '0',
      Icon: LuHandCoins,
      color: "from-red-500 to-pink-600",
    }
  ]

  return (
    <DashboardLayout activeMenu='dashboard'>
      <div className='text-2xl text-foreground min-h-screen mx-2'>
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
          {TopCardData.map((card, index) => (
            <TopCard
              key={index}
              title={card.title}
              amount={card.amount}
              Icon={card.Icon}
              bgIcon={card.color}
            />
          ))}
        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home
