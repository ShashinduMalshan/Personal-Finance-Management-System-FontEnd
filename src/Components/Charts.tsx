
import React from 'react';
import { type ChartDataPoint } from '../types';

export const SimpleBarChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex flex-col h-64 w-full">
      <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div className="relative w-full flex items-end justify-center h-full">
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 pointer-events-none shadow-xl">
                {item.label}: {item.value.toLocaleString()}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
              </div>
              {/* Bar */}
              <div 
                style={{ height: `${(item.value / maxValue) * 100}%` }} 
                className={`w-full max-w-[40px] rounded-t-lg transition-all duration-700 ease-out hover:brightness-110 shadow-sm ${item.color || 'bg-emerald-400'}`}
              ></div>
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 font-bold uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 dark:border-gray-700 w-full mt-1"></div>
    </div>
  );
};

export const SimpleDonutChart: React.FC<{ data: ChartDataPoint[]; totalLabel?: string }> = ({ data, totalLabel = "Total" }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;
  const size = 200;
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
      <div className="relative w-[200px] h-[200px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / (total || 1);
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference;
            currentAngle += percentage;
            return (
              <circle 
                key={index} 
                cx={center} 
                cy={center} 
                r={radius} 
                fill="transparent" 
                stroke={item.color} 
                strokeWidth={strokeWidth} 
                strokeDasharray={strokeDasharray} 
                strokeDashoffset={strokeDashoffset} 
                className="transition-all duration-1000 ease-out hover:opacity-80" 
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-gray-800 dark:text-gray-100">${total.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">{totalLabel}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate">{item.label}</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                {Math.round((item.value / (total || 1)) * 100)}% (${item.value.toLocaleString()})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
