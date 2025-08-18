import React from "react";

const TopCard = ({
  title,
  amount,
  Icon,
  bgIcon,
}: {
  title: string;
  amount: number | string;
  Icon: React.ElementType;
  bgIcon: string; 
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-lg bg-card shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out">
      {/* Icon Circle */}
      <div className={`p-3 rounded-full bg-gradient-to-tr ${bgIcon} shadow-md`}>
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <p className="text-sm text-mutedForeground">{title}</p>
        <h3 className="text-2xl font-bold text-foreground">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
          }).format(Number(amount))}
        </h3>
      </div>
    </div>
  );
};

export default TopCard;
