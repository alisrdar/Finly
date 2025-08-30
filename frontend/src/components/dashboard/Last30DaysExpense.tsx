import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import type { DashboardData } from '../../types';
import ChartWrapper from '../charts/ChartWrapper';
import CustomTooltip from '../charts/CustomTootip';
import ChartLegend from '../charts/ChartLegend';

interface Last30DaysExpensesChartProps {
    data: DashboardData['last30DaysExpenses'] | null;
}

const Last30DaysExpensesChart: React.FC<Last30DaysExpensesChartProps> = ({ data }) => {
    // Early return if no data
    if (!data || !data.transactions || data.transactions.length === 0) {
        return (
            <ChartWrapper title="Last 30 Days Expenses">
                <div className="flex items-center justify-center h-64">
                    <p className="text-mutedForeground">No expense data available</p>
                </div>
            </ChartWrapper>
        );
    }

    // Transform the expense data for the chart
    const chartData = data.transactions.map((expense) => ({
        name: expense.title, // Expense title
        amount: expense.amount, // Expense amount
        category: expense.category, // Expense category
        date: new Date(expense.date).toLocaleDateString(), // Formatted date
        fullDate: expense.date,
    }));

    const getBarColor = (index: number) => {
        const colors = ['#8884d8', '#82ca9d'];
        return colors[index % colors.length];
    };
    // console.log(chartData);

    return (
        <ChartWrapper title="Last 30 Days Expenses">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                        dataKey="name" // Fixed: Use "name" instead of "month"
                        tick={{ fontSize: 12 }}
                        className="text-muted"
                        stroke="none"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#555' }}
                        className="text-muted"
                        stroke="none"
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={(props) => <CustomTooltip {...props} />} cursor={{ fill: 'rgba(136, 132, 216, 0.2)' }} />
                    <Bar
                        dataKey="amount"
                        fill="#ff8042"
                        radius={[10, 10, 0, 0]}
                        // background={{ fill: '#f0f0f0' }}
                        
                    >
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <ChartLegend
                data={chartData.map((item, index) =>
                    (
                        { name: item.category, color: getBarColor(index) }
                    )
                )}
            />
        </ChartWrapper>
    );
};

export default Last30DaysExpensesChart;