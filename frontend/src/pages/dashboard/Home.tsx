import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { dashboardService } from '../../services/api'
import type { DashboardData } from '../../types'
import toast from 'react-hot-toast'
import TopCard from '../../components/TopCard'
import { useNavigate } from 'react-router-dom'
import {
  LuCreditCard,
  LuHandCoins,
  LuWalletMinimal,
} from 'react-icons/lu'
import RecentIncomeChart from '../../components/dashboard/RecentIncomeChart'
import FinancialOverview from '../../components/dashboard/FinancialOverView'
import RecentTransactions from '../../components/dashboard/RecentTransactions'
import Last30DaysExpense from '../../components/dashboard/Last30DaysExpense'
import RecentExpense from '../../components/dashboard/RecentExpense'
import RecentIncome from '../../components/dashboard/RecentIncome'

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashBoardData = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        setDashboardData(response);
        // console.log(dashboardData);

      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.log(error);
      } finally {
        // setIsLoading(false)
      }
    }
    fetchDashBoardData();
  }, [dashboardData]);

  const TopCardData = [
    {
      title: 'Total Balance',
      amount: (dashboardData?.totalBalance || '0'),
      Icon: LuCreditCard,
      color: "from-purple-500 to-violet-600",
    }, {
      title: 'Total Income',
      amount: dashboardData?.totalIncome || '0',
      Icon: LuWalletMinimal,
      color: "from-orange-400 to-red-500",
    }, {
      title: 'Total Expense',
      amount: dashboardData?.TotalExpenses || '0',
      Icon: LuHandCoins,
      color: "from-red-500 to-pink-600",
    }
  ]

  return (
    <DashboardLayout activeMenu='dashboard'>
      <div className='text-2xl text-foreground min-h-screen my-5 mx-auto'>
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          {/* Recent Transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <FinancialOverview data={dashboardData} />

          {/* Recent Expense */}
          <RecentExpense 
            expenses={dashboardData?.recentExpenseTransactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpense data={dashboardData?.last30DaysExpenses ?? null} />

          {/* Recent Income */}
          <RecentIncomeChart
            data={dashboardData?.last60DaysIncome ?? null}
            totalIncome={dashboardData?.totalIncome || 0}
          />
          <RecentIncome 
            income={dashboardData?.recentIncomeTransactions || []}
            onSeeMore={() => navigate('/income')}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
