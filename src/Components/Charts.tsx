import React from 'react';
import type { ChartDataPoint } from '../types';

interface SimpleBarChartProps {
  data: ChartDataPoint[];
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="flex flex-col h-64 w-full">
      <div className="flex-1 flex items-end justify-between gap-3 px-2 h-full">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1 h-full group">
              <div className="relative w-full flex items-end justify-center h-full">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 pointer-events-none shadow-lg">
                  {item.label}: {item.value.toLocaleString()}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
                </div>

                {/* Bar */}
                <div
                  className="w-full max-w-[50px] rounded-t-xl transition-all duration-500 ease-out shadow-md"
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: item.color || '#34d399', // <-- Use style for color
                  }}
                />
              </div>

              {/* Label */}
              <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-3 font-bold uppercase tracking-wider text-center truncate">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* X-axis line */}
      <div className="border-t border-gray-100 dark:border-gray-700 w-full mt-2"></div>
    </div>
  );
};
