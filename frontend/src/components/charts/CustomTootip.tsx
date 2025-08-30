import React from 'react'

interface PayloadItem {
  payload: {
    name?: string;
    [key: string]: unknown;
    category?: string;
  };
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<PayloadItem>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null; // ✅ prevent empty render

  const { name, value, color } = payload[0];
  // console.log(payload[0]);

  return (
    <div className="bg-background flex flex-col text-foreground shadow-md p-2 rounded-lg border border-gray-300">
      <p className="text-xs font-semibold" style={{ color: color || "#6b21a8" }}>
        {payload[0].payload.name || name}
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100">
        Amount: <span>{value?.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default CustomTooltip;
