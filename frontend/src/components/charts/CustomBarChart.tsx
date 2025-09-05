// src/components/charts/CustomBarChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import CustomTooltip from './CustomTootip';
import ChartLegend from './ChartLegend';

interface ChartDataItem {
  name: string;
  amount: number;
  category?: string;
  date?: string;
}

interface CustomBarChartProps {
  data: ChartDataItem[];
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
  height?: number;
  showLegend?: boolean;
  legendKey?: keyof ChartDataItem;
  formatYAxis?: (value: number) => string;
  emptyMessage?: string;
  className?: string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  dataKey = 'amount',
  xAxisKey = 'name',
  colors = ['#8b5cf6', '#ef4444', '#f97316', '#10b981', '#3b82f6'],
  height = 300,
  showLegend = true,
  legendKey = 'category',
  formatYAxis = (value) => `$${value}`,
  emptyMessage = 'No data available',
  className,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className ?? ''}`}>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const getBarColor = (index: number) => colors[index % colors.length];

  const legendData = showLegend
    ? data.map((item, index) => ({
        name: String(item[legendKey] || item.name),
        color: getBarColor(index),
      }))
    : [];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            tickCount={6} 
            // tickFormatter={(value) => `${value}`}
            // className="text-muted-foreground"
            stroke={'#555'}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            className="text-muted-foreground"
            stroke="none"
            tickFormatter={formatYAxis}
          />
          <Tooltip
            content={(props) => <CustomTooltip {...props} />}
            cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
          />
          <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {showLegend && legendData.length > 0 && <ChartLegend data={legendData} />}
    </div>
  );
};

export default CustomBarChart;
