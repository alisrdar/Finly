import React, { useState, useEffect } from 'react'
import CustomBarChart from '../charts/CustomBarChart'
import type { BarChartDataItem } from '../../utils/helper'
import { transformIncomesForChart } from '../../utils/helper'
import type { Income } from '../../types'
import CardWrapper from '../cards/CardWrapper'


interface IncomeOverViewProps {
  transactions: Income[];
  onAddIncome: () => void;
}

const IncomeOverView: React.FC<IncomeOverViewProps> = ({ transactions, onAddIncome }) => {

  const [chartData, setChartData] = useState<BarChartDataItem[]>([]);

  useEffect(() => {
    const data = transformIncomesForChart(transactions)
    setChartData(data)
  }, [transactions])


  return (
    <div>
      <CardWrapper
        title="Income Overview"
        headingStyle='md:text-xl font-semibold '
        btnText='Add Income'
        onBtnClick={onAddIncome}
        description='Track your earnings over time'
      >
        
        <CustomBarChart
          data={chartData}
          colors={['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0']}
          legendKey='category'
          emptyMessage='No income data available.'
        />
      </CardWrapper>
    </div>
  )
}

export default IncomeOverView
