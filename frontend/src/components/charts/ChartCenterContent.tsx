import React from "react";

interface ChartCenterContentProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}

const ChartCenterContent: React.FC<ChartCenterContentProps> = ({
  label,
  value,
  prefix,
  suffix = ""
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold text-foreground">
        {prefix}{formatValue(value)}{suffix}
      </p>
    </>
  );
};

export default ChartCenterContent;