import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import CustomTooltip from './CustomTootip';
// import ChartLegend from './ChartLegend';

interface ChartDataItem {
    name: string;
    amount: number;
    category?: string;
    date?: string; // Allow additional properties for multiple data series
}
const CustomLineChart: React.FC<{
    data: ChartDataItem[];
    dataKey?: string;
    xAxisKey?: string;
}> = ({
    data,
    dataKey= 'name',
    xAxisKey= 'amount',
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>No data available</p>
            </div>
        );
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} tick={{ fontSize: 12, fill: '#666' }} stroke='#ccc' />
                <YAxis tick={{ fontSize: 12, fill: '#666' }} stroke='#ccc' />
                <Tooltip content={<CustomTooltip />} />
                <Legend  />
                <Area type="monotone" dataKey={dataKey} stroke="#875cf5" strokeWidth={3} activeDot={{ r: 8 }} fill='url(#expenseGradient)'/>
            </AreaChart>
        </ResponsiveContainer>
    )

};

export default CustomLineChart;