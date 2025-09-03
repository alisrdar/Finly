import React from 'react';
import type { DashboardData } from '../../types';
import CustomBarChart from '../charts/CustomBarChart';
import { transformExpensesForChart } from '../../utils/helper';
import ChartWrapper from '../charts/ChartWrapper';

interface Last30DaysExpensesChartProps {
    data: DashboardData['last30DaysExpenses'] | null;
}

const Last30DaysExpensesChart: React.FC<Last30DaysExpensesChartProps> = ({ data }) => {
    if (!data?.transactions) {
        return (
            <ChartWrapper title='Last 30 Days Expenses'>
                <CustomBarChart
                    data={[]}
                    emptyMessage='No expense data available'
                />
            </ChartWrapper>
        )
    }

    const chartData = transformExpensesForChart(data.transactions);
    // console.log(chartData);

    return (
        <ChartWrapper title='Last 30 Days Expenses'>
            <CustomBarChart
                data={chartData}
                colors={['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981']}
                legendKey='category'
                emptyMessage='No expense in the last 30 days.'
            />
        </ChartWrapper>
    )
}

export default Last30DaysExpensesChart;