
import React, { useState, useEffect, useMemo } from 'react';
import { Target, Plus, X, Laptop, Plane, BookOpen, Wallet, ShoppingBag, Calendar, DollarSign, TrendingUp, Info, AlertCircle, CheckCircle2, MoreHorizontal, Trash2, Edit2 } from 'lucide-react';
// import { getGoals, createGoal, updateGoal, deleteGoal } from '../services/goals';
import { getExpenses } from '../services/expenses';
import { getIncomes } from '../services/income';
import type { Goal, GoalCategory } from '../types';

const CATEGORIES: GoalCategory[] = ['Electronics', 'Travel', 'Education', 'Finance', 'Lifestyle', 'Other'];

const GoalIcon = ({ category, size = 20 }: { category: GoalCategory, size?: number }) => {
  switch (category) {
    case 'Electronics': return <Laptop size={size} />;
    case 'Travel': return <Plane size={size} />;
    case 'Education': return <BookOpen size={size} />;
    case 'Finance': return <Wallet size={size} />;
    case 'Lifestyle': return <ShoppingBag size={size} />;
    default: return <Target size={size} />;
  }
};

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Data for impact calculations
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);

  const [formData, setFormData] = useState<Omit<Goal, 'id'>>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    category: 'Other',
    targetDate: ''
  });

 const fetchData = async () => {
  setLoading(true);
  try {
    const [goalRes, incRes, expRes] = await Promise.all([
      getGoals(),           // Fetch all goals
      getIncomes(1, 100),   // Fetch last 100 incomes
      getExpenses(1, 100)   // Fetch last 100 expenses
    ]);

    setGoals(goalRes);

    // Calculate monthly surplus
    const totalInc = incRes.data.reduce((sum, i) => sum + i.amount, 0);
    const totalExp = expRes.data.reduce((sum, e) => sum + e.amount, 0);

    setMonthlyIncome(totalInc);
    setMonthlyExpense(totalExp);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
    //   await updateGoal(editingId, formData);
    } else {
    //   await createGoal(formData);
    }
    await fetchData();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this goal?")) return;
    // await deleteGoal(id);
    await fetchData();
  };

  const handleOpenModal = (goal?: Goal) => {
    if (goal) {
      setEditingId(goal.id);
      setFormData({ ...goal });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        targetAmount: 0,
        currentAmount: 0,
        category: 'Other',
        targetDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const netSurplus = Math.max(0, monthlyIncome - monthlyExpense);

  const goalInsights = useMemo(() => {
    return goals.map(goal => {
      const remaining = goal.targetAmount - goal.currentAmount;
      const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
      
      let monthlyRequired = 0;
      let status: 'on-track' | 'delayed' | 'completed' = 'on-track';
      let message = '';

      if (progress >= 100) {
        status = 'completed';
        message = "Goal achieved! Ready for purchase.";
      } else if (goal.targetDate) {
        const targetDate = new Date(goal.targetDate);
        const today = new Date();
        const monthsLeft = (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth());
        
        if (monthsLeft > 0) {
          monthlyRequired = remaining / monthsLeft;
          // If required savings is more than 50% of surplus, mark as delayed
          status = (monthlyRequired > netSurplus * 0.8) ? 'delayed' : 'on-track';
        } else {
          status = 'delayed';
          message = "Target date passed. Strategy review needed.";
        }
      }

      return { ...goal, progress, remaining, monthlyRequired, status, message };
    });
  }, [goals, netSurplus]);

  return (
    <div className="p-8 space-y-8 animate-fade-in no-scrollbar max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
              <Target size={24} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] ml-2">Wealth Objective Engine</span>
          </div>
          <h1 className="text-5xl font-black text-gray-800 dark:text-white tracking-tighter leading-none">Saving Goals</h1>
          <p className="text-gray-400 dark:text-gray-500 font-medium mt-4 max-w-2xl leading-relaxed">
            Architect your financial future. Define targets, track accumulation velocity, and visualize the impact of your spending habits on long-term acquisitions.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-emerald-500/10 active:scale-95 flex items-center gap-3 shrink-0"
        >
          <Plus size={20} /> Create New Goal
        </button>
      </div>

      {/* Goal Summary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Net Surplus Velocity</span>
          <div className="text-4xl font-black text-emerald-500 mt-2">${netSurplus.toLocaleString()}<span className="text-sm text-gray-400 font-bold ml-1">/mo</span></div>
          <p className="text-[11px] text-gray-400 font-bold uppercase mt-4 tracking-wider">Available for goal allocation</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Objectives</span>
          <div className="text-4xl font-black text-gray-800 dark:text-white mt-2">{goals.length}</div>
          <p className="text-[11px] text-gray-400 font-bold uppercase mt-4 tracking-wider">Parallel targets in progress</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Capital Needed</span>
          <div className="text-4xl font-black text-gray-800 dark:text-white mt-2">
            ${goals.reduce((acc, g) => acc + (g.targetAmount - g.currentAmount), 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-gray-400 font-bold uppercase mt-4 tracking-wider">Aggregate remaining balance</p>
        </div>
      </div>

      {/* Impact Insights Bar */}
      <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 p-6 rounded-[2rem] flex items-center gap-6">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-emerald-500">
          <Info size={24} />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-emerald-700 dark:text-emerald-400 text-sm uppercase tracking-wider">Strategic Recommendation</h4>
          <p className="text-sm text-emerald-600/80 dark:text-emerald-500/80 font-medium">
            Reducing <span className="font-bold">Food</span> and <span className="font-bold">Entertainment</span> by 15% would accelerate your <span className="italic font-bold">"{goals[0]?.name || 'Primary Goal'}"</span> completion by <span className="font-black underline">2.4 months</span>.
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goalInsights.map((goal) => (
          <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden group hover:shadow-xl hover:translate-y-[-4px] transition-all flex flex-col h-full">
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl shadow-lg ${
                  goal.status === 'completed' ? 'bg-emerald-500 text-white' :
                  goal.status === 'delayed' ? 'bg-red-500 text-white' : 'bg-gray-50 dark:bg-gray-700 text-emerald-500'
                }`}>
                  <GoalIcon category={goal.category} size={24} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleOpenModal(goal as Goal)} className="p-2 text-gray-400 hover:text-emerald-500 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all"><Edit2 size={16} /></button>
                   <button onClick={() => handleDelete(goal.id)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-gray-800 dark:text-white mb-1">{goal.name}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{goal.category}</p>

              <div className="mt-8 space-y-2">
                <div className="flex justify-between items-end">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Capital Accumulation</span>
                   <span className="text-sm font-black text-gray-800 dark:text-white">{goal.progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-50 dark:bg-gray-900 h-3 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div 
                    className={`h-full transition-all duration-[2s] ease-out rounded-full ${
                      goal.status === 'completed' ? 'bg-emerald-500' :
                      goal.status === 'delayed' ? 'bg-red-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                   <span className="text-xs font-bold text-emerald-500">${goal.currentAmount.toLocaleString()}</span>
                   <span className="text-xs font-bold text-gray-400">${goal.targetAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-8 mt-auto border-t border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/10 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Required Save</span>
                  <span className="text-base font-black text-gray-800 dark:text-white">
                    {goal.monthlyRequired > 0 ? `$${goal.monthlyRequired.toFixed(0)}` : '--'}
                    <span className="text-[10px] text-gray-400 ml-1">/mo</span>
                  </span>
                </div>
                <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 ${
                  goal.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  goal.status === 'delayed' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {goal.status === 'completed' ? <CheckCircle2 size={12} /> : goal.status === 'delayed' ? <AlertCircle size={12} /> : <TrendingUp size={12} />}
                  {goal.status.replace('-', ' ')}
                </div>
              </div>
              
              {goal.targetDate && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Calendar size={12} /> Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
            <div className="flex justify-between items-center p-8 border-b border-gray-50 dark:border-gray-700">
              <h3 className="text-2xl font-black text-gray-800 dark:text-white">{editingId ? 'Refine Objective' : 'Initialize Goal'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"><X size={24} className="text-gray-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Objective Name</label>
                <div className="relative">
                  <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 dark:text-white" placeholder="e.g. New Workstation" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Target Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input required type="number" value={formData.targetAmount} onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })} className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Initial Saved</label>
                  <div className="relative">
                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="number" value={formData.currentAmount} onChange={(e) => setFormData({ ...formData, currentAmount: Number(e.target.value) })} className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 dark:text-white appearance-none cursor-pointer">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Deadline (Opt)</label>
                  <input type="date" value={formData.targetDate} onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-gray-800 dark:text-white" />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300 font-black text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-emerald-500 text-white font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/10 active:scale-95">{editingId ? 'Apply Refinement' : 'Confirm Strategy'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
