import React from 'react'
import type { DashboardData } from '../../types'
import ChartCenterContent from '../charts/ChartCenterContent';
import PieChartWrapper from '../charts/PieChartWrapper';

interface RecentIncomeChartProps {
  data: DashboardData['last60DaysIncome'] | null;
  totalIncome: number;
}

const RecentIncomeChart: React.FC<RecentIncomeChartProps> = ({ data, totalIncome }) => {

  const top5sorted = data?.transactions.sort((a, b) => b.amount - a.amount).slice(0, 5).map((income) => ({
    name: income.title,
    value: income.amount,
  })) ?? [];

  const otherTotal = data?.transactions.slice(5).reduce((sum, income)=> sum+income.amount, 0) ?? 0;

  const chartData = (otherTotal > 0) ? [...top5sorted, {name: "others", amount: otherTotal} ]: top5sorted;

  const centerContent = (
    <ChartCenterContent
      label='Total Income'
      value={totalIncome}
      prefix='$'
    />
  )
  
  return (
    <PieChartWrapper 
      title='Last 60 Days Income'
      data={chartData ?? []}
      colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']}
      centerContent={centerContent}
      className='w-full max-w-md'
      height={300}
      outerRadius={130}
      innerRadius={90}
    />
  )
}

export default RecentIncomeChart