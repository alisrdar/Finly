import React, { useState, useEffect } from 'react'
import CardWrapper from '../cards/CardWrapper'
import CustomLineChart from '../charts/CustomLineChart'
import type { Expense } from '../../types'
import { transformExpensesForChart, getFilterRange } from '../../utils/helper'
import type { BarChartDataItem } from '../../utils/helper'


const ExpenseOverview: React.FC<{ transactions: Expense[], onAddExpense: () => void }> = ({
    transactions, onAddExpense
}) => {

    const [chartData, setChartData] = useState<BarChartDataItem[]>([]);
    const [filter, setFilter] = useState<('last7Days' | 'last30Days' | 'last60Days' | 'last90Days' | 'last6Months' | 'last1Year' | 'last5Years' | 'all')>(`last30Days`)

    useEffect(() => {
        const range = getFilterRange(filter)
        const data = transformExpensesForChart(transactions, range, filter)
        console.log(data);

        setChartData(data)
    }, [transactions, filter])

    const filterOptions = ['last7Days', 'last30Days', 'last90Days', 'last1Year', 'last5Years', 'all'] as const;

    return (
        <CardWrapper
            title='Expense Overview'
            description='Track your spending over time'
            btnText='Add Expense'
            onBtnClick={onAddExpense}
            headingStyle='md:text-xl font-semibold '
        >

            {/* Filter Buttons */}
            <div className='flex flex-wrap gap-2 mb-4'>
                {filterOptions.map((f)=> (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className='px-3 py-1 cursor-pointer rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
                    >
                        {f}
                    </button>
                ))}
            </div>
            <CustomLineChart
                data={chartData}
                dataKey={'amount'}
                xAxisKey='name'
            />
        </CardWrapper>
    )
}

export default ExpenseOverview;
