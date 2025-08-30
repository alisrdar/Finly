// src/components/dashboard/FinancialOverView.tsx
import React from "react";
import type { DashboardData } from "../../types";
import PieChartWrapper from "../charts/PieChartWrapper";
import ChartCenterContent from "../charts/ChartCenterContent";

interface FinancialOverviewProps {
  data: DashboardData | null;
}

const COLORS = ["#8b5cf6", "#ef4444", "#f97316"];

const FinancialOverview: React.FC<FinancialOverviewProps> = ({ data }) => {
  const chartData = [
    { name: "Total Balance", value: Math.max(data?.totalBalance || 0, 0) },
    { name: "Total Expenses", value: data?.TotalExpenses || 0 },
    { name: "Total Income", value: data?.totalIncome || 0 },
  ];

  const centerContent = (
    <ChartCenterContent
      label="Total Balance"
      value={data?.totalBalance || 0}
      prefix="$"
    />
  );

  return (
    <PieChartWrapper
      data={chartData}
      colors={COLORS}
      title="Financial Overview"
      centerContent={centerContent}
      className="w-full max-w-lg"
      height={350}
      outerRadius={130}
      innerRadius={90}
    />
  );
};

export default FinancialOverview;