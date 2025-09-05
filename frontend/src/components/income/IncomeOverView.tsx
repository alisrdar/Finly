import React, { useState, useEffect } from 'react'
import CustomBarChart from '../charts/CustomBarChart'
import type { BarChartDataItem } from '../../utils/helper'
import { transformIncomesForChart, getFilterRange } from '../../utils/helper'
import type { Income } from '../../types'
import CardWrapper from '../cards/CardWrapper'


interface IncomeOverViewProps {
  transactions: Income[];
  onAddIncome: () => void;
}

const IncomeOverView: React.FC<IncomeOverViewProps> = ({ transactions, onAddIncome }) => {

  const [chartData, setChartData] = useState<BarChartDataItem[]>([]);
  const [filter, setFilter] = useState<('last7Days' | 'last30Days' | 'last60Days' | 'last90Days' | 'last6Months' | 'last1Year' | 'last5Years' | 'all')>(`last30Days`)

  useEffect(() => {
    const range = getFilterRange(filter)
    const data = transformIncomesForChart(transactions, range, filter)
    console.log(data);

    setChartData(data)
  }, [transactions, filter])

  return (
    <div>
      <CardWrapper
        title="Income Overview"
        headingStyle='md:text-xl font-semibold '
        btnText='Add Income'
        onBtnClick={onAddIncome}
        description='Track your earnings over time'
      >
        {/* Filter Buttons */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {(['last7Days', 'last30Days', 'last90Days', 'last1Year', 'last5Years', 'all'] as const).map((f) => (
            <button
              className='px-3 py-1 cursor-pointer rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <CustomBarChart
          data={chartData}
          colors={['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0']}
          legendKey='category'
          dataKey='amount'
          showLegend={true}
          emptyMessage='No income data available.'
          xAxisKey={'name'}
        />
      </CardWrapper>
    </div>
  )
}

export default IncomeOverView
