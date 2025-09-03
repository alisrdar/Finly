import React from 'react'

const ChartWrapper: React.FC<{
  title: string,
  children: React.ReactNode,
  headingStyle?: string
}> = ({
  title, children, 
  headingStyle = 'text-foreground text-lg font-semibold mb-4'
}) => {
    return (
      <div className="bg-card p-6 rounded-lg shadow-md border border-border  dark:hover:scale-101 transition-all duration-300 ease-in-out hover:shadow-sm">
        <h2 className={`${headingStyle}`}>{title}</h2>
        {children}
      </div>
    )
  }

export default ChartWrapper
