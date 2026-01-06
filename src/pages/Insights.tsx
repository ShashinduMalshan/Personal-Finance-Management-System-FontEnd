
import React, { useState, useEffect, useMemo } from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, Zap, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { getIncomes } from '../services/income';
import { getExpenses } from '../services/expenses';
import type { IncomeRecord, ExpenseRecord, ChartDataPoint } from '../types';
import { SimpleBarChart } from '../Components/Charts';

interface LeakAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  impactValue?: string;
}

const Insights: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const incRes = await getIncomes(1, 100);
    //   const expRes = await getExpenses(1, 100);
      setIncomes(incRes.data);
    //   setExpenses(expRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const analytics = useMemo(() => {
    if (expenses.length === 0) return null;

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const burnRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

    // Detect Subscriptions (Ghost Leaks)
    const descriptionMap: Record<string, number> = {};
    expenses.forEach(e => {
      descriptionMap[e.description] = (descriptionMap[e.description] || 0) + 1;
    });
    const recurringCount = Object.values(descriptionMap).filter(count => count > 1).length;

    // Weekend vs Weekday analysis (Lifestyle Creep)
    let weekendSpend = 0;
    expenses.forEach(e => {
      const day = new Date(e.date).getDay();
      if (day === 0 || day === 6) weekendSpend += e.amount;
    });
    const weekendPercentage = totalExpense > 0 ? (weekendSpend / totalExpense) * 100 : 0;

    // Group by category for chart
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const chartData: ChartDataPoint[] = Object.entries(categoryTotals).map(([label, value]) => ({
      label,
      value,
      color: value > (totalExpense * 0.3) ? 'bg-red-400' : 'bg-emerald-400'
    }));

    // Generate Alerts
    const alerts: LeakAlert[] = [];
    
    if (burnRatio > 80) {
      alerts.push({
        id: '1',
        type: 'critical',
        title: 'Critical Burn Rate',
        description: `You are spending ${burnRatio.toFixed(0)}% of your total income. A safety margin of 20% is recommended.`,
        impactValue: '-$500/mo potential loss'
      });
    }

    if (weekendPercentage > 40) {
      alerts.push({
        id: '2',
        type: 'warning',
        title: 'Lifestyle Creep Detected',
        description: 'Weekend spending is significantly higher than weekday utility. Consider budget caps for leisure.',
        impactValue: 'Potential $200 saving'
      });
    }

    if (recurringCount > 2) {
      alerts.push({
        id: '3',
        type: 'info',
        title: 'Subscription Audit',
        description: `We detected ${recurringCount} recurring transactions. Ensure you are utilizing all services.`,
      });
    }

    if (burnRatio < 50 && totalIncome > 0) {
      alerts.push({
        id: '4',
        type: 'success',
        title: 'Healthy Surplus',
        description: 'Your capital retention is excellent this month. Consider increasing your investment allocations.',
      });
    }

    return { burnRatio, recurringCount, weekendPercentage, chartData, alerts, totalExpense, totalIncome };
  }, [incomes, expenses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in no-scrollbar max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Lightbulb size={20} className="fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Smart Detection Engine</span>
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Financial Leak Report</h1>
          <p className="text-gray-400 dark:text-gray-500 font-medium mt-1">Rule-based analysis of your recent capital outflows.</p>
        </div>
        <div className="flex gap-2">
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-black uppercase tracking-wider">
                System Active
            </div>
        </div>
      </div>

      {/* Top Level Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Efficiency Score</span>
           <div className="flex items-baseline gap-2 mt-2">
              <span className={`text-4xl font-black ${analytics && analytics.burnRatio < 60 ? 'text-emerald-500' : 'text-orange-500'}`}>
                {analytics ? (100 - (analytics.burnRatio / 2)).toFixed(0) : 0}%
              </span>
              <span className="text-gray-400 font-bold">/ 100</span>
           </div>
           <p className="text-[11px] text-gray-400 font-medium mt-4">Based on current burn rate and recurring leaks.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ghost Leaks</span>
           <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-gray-800 dark:text-white">
                {analytics?.recurringCount || 0}
              </span>
              <span className="text-gray-400 font-bold">Identified</span>
           </div>
           <p className="text-[11px] text-gray-400 font-medium mt-4">Transactions repeating with identical descriptions.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lifestyle Burn</span>
           <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-gray-800 dark:text-white">
                {analytics?.weekendPercentage.toFixed(0)}%
              </span>
              <span className="text-gray-400 font-bold">Weekend</span>
           </div>
           <p className="text-[11px] text-gray-400 font-medium mt-4">Percentage of total budget consumed on weekends.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dynamic Alerts */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-800 dark:text-white mb-6 flex items-center gap-3">
             <AlertTriangle className="text-orange-500" size={24} />
             Priority Leaks
          </h3>
          {analytics?.alerts.map(alert => (
            <div key={alert.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-6 group hover:shadow-md transition-all">
               <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                 alert.type === 'critical' ? 'bg-red-50 text-red-500' :
                 alert.type === 'warning' ? 'bg-orange-50 text-orange-500' :
                 alert.type === 'success' ? 'bg-emerald-50 text-emerald-500' :
                 'bg-blue-50 text-blue-500'
               }`}>
                 {alert.type === 'critical' ? <Zap size={20} /> : <AlertTriangle size={20} />}
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-gray-800 dark:text-white">{alert.title}</h4>
                    {alert.impactValue && (
                        <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-lg uppercase tracking-wider">{alert.impactValue}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-medium mt-1 leading-relaxed">
                    {alert.description}
                  </p>
               </div>
            </div>
          ))}
        </div>

        {/* Allocation Leak Visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-gray-800 dark:text-white mb-10 flex items-center gap-3">
                <TrendingUp className="text-emerald-500" size={24} />
                Category Intensity
            </h3>
            {analytics && <SimpleBarChart data={analytics.chartData} />}
            <div className="mt-auto pt-8 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">High Volatility Category</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Optimized Zone</span>
                </div>
            </div>
        </div>
      </div>

      {/* Saving Optimization Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden transition-all shadow-2xl group">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-500 rounded-2xl">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">Optimization Roadmap</span>
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tight">Projected Annual Savings</h2>
                <p className="text-gray-400 font-medium text-lg leading-relaxed">
                   By addressing the detected leaks in <span className="text-white font-black italic">Food</span> and <span className="text-white font-black italic">Entertainment</span>, you could accumulate an extra <span className="text-emerald-400 font-black">$4,200</span> by next year.
                </p>
            </div>
            <div className="flex flex-col gap-4">
                {[
                    { title: 'Ghost Subscription Cull', savings: '$150/yr' },
                    { title: 'Weekend Budget Capping', savings: '$1,800/yr' },
                    { title: 'Utility Optimization', savings: '$400/yr' },
                ].map((tip, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex justify-between items-center group/item hover:bg-white/10 transition-all cursor-pointer">
                        <span className="font-bold text-gray-300">{tip.title}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-black">{tip.savings}</span>
                            <ArrowRight size={18} className="text-gray-500 group-hover/item:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-32 -mb-32"></div>
      </div>
    </div>
  );
};

export default Insights;
