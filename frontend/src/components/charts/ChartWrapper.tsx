import React from 'react'

const ChartWrapper: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border  dark:hover:scale-101 transition-all duration-300 ease-in-out hover:shadow-sm">
      <h2 className="text-foreground text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}

export default ChartWrapper
