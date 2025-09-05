import React, { useEffect, useMemo } from 'react';
import type { DashboardData } from '../../types';
import CustomBarChart from '../charts/CustomBarChart';
import { transformExpensesForBarChart } from '../../utils/helper';
import ChartWrapper from '../charts/ChartWrapper';

interface Last30DaysExpensesChartProps {
    data: DashboardData['last30DaysExpenses'] | null;
}

const Last30DaysExpensesChart: React.FC<Last30DaysExpensesChartProps> = ({ data }) => {
    
    const chartData = useMemo(() => transformExpensesForBarChart(data?.transactions || []), [data]);
    useEffect(() => {
        console.log('Transformed Chart Data:', chartData);
    }, [chartData]);
    if (!data?.transactions) {
        return (
            <ChartWrapper title='Last 30 Days Expenses'>
                <CustomBarChart
                    data={chartData}
                    emptyMessage='No expense data available'
                />
            </ChartWrapper>
        )
    }

    return (
        <ChartWrapper title='Last 30 Days Expenses'>
            <CustomBarChart
                data={chartData}
                // colors={['#ef4444', '#f97316', '#eab308', '#84cc16', '#10b981']}
                legendKey='category'
                emptyMessage='No expense in the last 30 days.'
            />
        </ChartWrapper>
    )
}

export default Last30DaysExpensesChart;