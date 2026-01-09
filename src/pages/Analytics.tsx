
import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Target, Zap } from 'lucide-react';
import { getIncomes } from '../services/income';
import { getExpenses } from '../services/expenses';


export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}


const SimpleBarChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="flex flex-col h-64 w-full">
      {/* Bars */}
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
                  style={{ height: `${barHeight}%`, backgroundColor: item.color || '#34d399' }}
                  className="w-full max-w-[50px] rounded-t-xl transition-all duration-500 ease-out hover:brightness-110 shadow-md"
                ></div>
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

const SimpleDonutChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;
  const size = 220;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-4">
      <div className="relative w-[220px] h-[220px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / total;
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
                className="transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-gray-800 dark:text-white">RS {total.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-black">Total Burn</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 truncate">{item.label}</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">{Math.round((item.value / total) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const inc = await getIncomes(1, 100);
        const exp = await getExpenses(1, 100);

        const sumInc = inc.data.reduce((acc: any, curr: { amount: any; }) => acc + curr.amount, 0);
        const sumExp = exp.data.reduce((acc: any, curr: { amount: any; }) => acc + curr.amount, 0);

        setTotalIncome(sumInc);
        setTotalExpense(sumExp);
    };
    loadData();
  }, []);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  const trendData = [
    { label: 'Sep', value: 4200, color: '#6ee7b7' },
    { label: 'Oct', value: 3800, color: '#34d399' },
    { label: 'Nov', value: 5200, color: '#10b981' },
    { label: 'Dec', value: 4800, color: '#059669' },
    { label: 'Jan', value: 6100, color: '#047857' },
    { label: 'Feb', value: 5900, color: '#065f46' },
  ];


  const categoryData = [
    { label: 'Housing', value: 2000, color: '#10b981' },
    { label: 'Food', value: 850, color: '#34d399' },
    { label: 'Transport', value: 400, color: '#6ee7b7' },
    { label: 'Utilities', value: 250, color: '#a7f3d0' },
    { label: 'Leisure', value: 600, color: '#059669' },
    { label: 'Health', value: 300, color: '#064e3b' },
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200 dark:shadow-none">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                <Target size={24} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] opacity-80">Net Surplus Analysis</span>
            </div>
            <h2 className="text-5xl font-black mb-4">RS {netSavings.toLocaleString()}</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-100 font-bold">
                <ArrowUpRight size={20} className="text-emerald-300" />
                <span>+{savingsRate}% Efficiency</span>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase opacity-60">Status</span>
                <span className="text-sm font-bold">Optimal Growth</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Savings Velocity</span>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mt-1">{savingsRate}%</h3>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-orange-500">
              <Zap size={20} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${savingsRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">You are saving <span className="text-gray-700 dark:text-gray-200 font-bold">${(netSavings / 6).toFixed(0)}</span> per month on average.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
              <BarChart3 className="text-emerald-500" size={24} />
              Income Projection
            </h3>
            <select className="text-[10px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-2 text-gray-500 dark:text-gray-400 cursor-pointer outline-none">
              <option>H2 2023</option>
              <option>H1 2024</option>
            </select>
          </div>
          <SimpleBarChart data={trendData} />
        </div>

        {/* Categories Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
              <PieChart className="text-emerald-500" size={24} />
              Capital Allocation
            </h3>
          </div>
          <SimpleDonutChart data={categoryData} />
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
        {[
          { label: 'Highest Income Source', value: 'Primary Salary', icon: ArrowUpRight, color: 'emerald' },
          { label: 'Major Expense Category', value: 'Real Estate / Rent', icon: ArrowDownRight, color: 'red' },
          { label: 'Next Milestone', value: 'RS 100k Net Worth', icon: Target, color: 'blue' },
        ].map((insight, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5">
            <div className={`p-4 rounded-2xl bg-${insight.color}-50 dark:bg-opacity-10 text-${insight.color}-500`}>
              <insight.icon size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{insight.label}</span>
              <p className="text-sm font-bold text-gray-800 dark:text-white mt-0.5">{insight.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
