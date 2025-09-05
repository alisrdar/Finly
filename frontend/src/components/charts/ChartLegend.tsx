import React from 'react'

const ChartLegend: React.FC<{ data: Array<{ name: string; color: string }> }> = ({ data }) => {
    return (
        <div className='flex flex-wrap justify-center gap-2 space-x-6 mt-4'>
            {data.map((item, index) => (
                <div
                    key={index}
                    className='flex flex-wrap gap-2 mt-4'
                >
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-xs font-medium text-foreground'>{item.name}</span>
                </div>
            ))}
        </div>
    )
}

export default ChartLegend
