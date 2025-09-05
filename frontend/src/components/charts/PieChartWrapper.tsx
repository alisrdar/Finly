import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTootip";
import ChartLegend from "./ChartLegend";
import ChartWrapper from "./ChartWrapper";

interface ChartDataItem {
    name?: string;
    value?: number;
    category?: string;
}

interface PieChartWrapperProps {
    data: ChartDataItem[];
    colors: string[];
    title: string;
    centerContent?: React.ReactNode;
    innerRadius?: number;
    outerRadius?: number;
    height?: number;
    showLegend?: boolean;
    className?: string;
    legendKey?: keyof ChartDataItem;
}

const PieChartWrapper: React.FC<PieChartWrapperProps> = ({
    data,
    colors,
    title,
    centerContent,
    innerRadius = 70,
    outerRadius = 120,
    height = 300,
    showLegend = true,
    className = "",
    legendKey = 'category',
}) => {
    const hasData = data.some(item => (item.value ?? 0) > 0);

    const legendData = showLegend
    ? data.map((item) => ({
        name: String(item[legendKey] || item.name),
      }))
    : [];

    if (!hasData) {
        return (
            <div className={`bg-card p-6 rounded-2xl shadow-lg border border-border ${className}`}>
                <h2 className="text-xl font-bold mb-6 text-foreground text-center">
                    {title}
                </h2>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <ChartWrapper title={title} >
            <div className="relative">
                <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            paddingAngle={3}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth={1}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={(props) => <CustomTooltip {...props} />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center content for donut charts */}
                {centerContent && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        {centerContent}
                    </div>
                )}
            </div>

            {/* Legend */}
            {showLegend && (
                <ChartLegend
                    data={legendData.map((entry, index) => ({
                        name: entry.name ?? "",
                        color: colors[index % colors.length],
                    }))}
                />
            )}
        </ChartWrapper>
    );
};

export default PieChartWrapper;