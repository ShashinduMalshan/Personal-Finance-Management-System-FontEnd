
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, DollarSign, Calendar, Tag, FileText, Search, Filter } from 'lucide-react';
import ToggleSwitch from "../Components/ToggleSwitch"
import { getIncomes } from '../services/income';




export interface IncomeRecord {
  id: string;
  source: string;
  amount: number;
  date: string;
  category: 'Salary' | 'Freelance' | 'Investment' | 'Gift' | 'Other';
  autoAdd?: boolean;
}

const CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'] as const;

const IncomeManagement: React.FC = () => {
  // Mock Data
  const [loading, setLoading] = useState<boolean>(false);
  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  //   { id: '1', source: 'Software Engineer Salary', amount: 5200, date: '2023-10-01', category: 'Salary', autoAdd: true },
  //   { id: '2', source: 'Freelance Project - Web Design', amount: 1200, date: '2023-10-15', category: 'Freelance', autoAdd: false },
  //   { id: '3', source: 'Birthday Gift', amount: 200, date: '2023-10-20', category: 'Gift', autoAdd: true },
  // 
  // ]);

  const handleToggleAutoAdd = (id: string, currentValue: boolean) => {
    setIncomes(prev =>
      prev.map(income =>
        income.id === id ? { ...income, autoAdd: !currentValue } : income
      )
    );
    console.log("currentValue", id, currentValue);
  };


  // Modal State
  useEffect(() => {
  const fetchIncomes = async () => {
    setLoading(true);
    try {
      // 2. Use 'api' instead of 'fetch'
      // This will call http://localhost:5000/api/v1/income/allIncomes
      const response = await getIncomes();

      // 3. Map the data (Option A)
      // Axios puts the response body in .data
      const rawData = response.data.data || response.data; 
      
      const formattedData = rawData.map((item: any) => ({
        ...item,
        id: item._id, // Map MongoDB _id to your UI's id
        date: item.date ? item.date.split('T')[0] : '' // Format date for <input type="date">
      }));

      setIncomes(formattedData);
    } catch (error) {
      console.error("Error fetching income records:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchIncomes();
}, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<IncomeRecord, 'id'>>({
    source: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: 'Salary'
  });

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (record?: IncomeRecord) => {
    if (record) {
      setEditingId(record.id);
      setFormData({
        source: record.source,
        amount: record.amount,
        date: record.date,
        category: record.category
      });
    } else {
      setEditingId(null);
      setFormData({
        source: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        category: 'Salary'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setIncomes(prev => prev.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
    } else {
      setIncomes(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      setIncomes(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredIncomes = incomes.filter(income =>
    income.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    income.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = filteredIncomes.reduce((acc, curr) => acc + Number(curr.amount), 0);


  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200 dark:shadow-none">
          <h3 className="text-emerald-100 text-sm font-medium mb-1">Total Income</h3>
          <div className="text-3xl font-bold flex items-baseline gap-1">
            <span className="text-lg opacity-70">$</span>
            {totalIncome.toLocaleString()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
          <h3 className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">Transactions</h3>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{filteredIncomes.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">Top Category</h3>
            <div className="text-xl font-bold text-gray-800 dark:text-white">Salary</div>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-500">
            <Tag size={20} />
          </div>
        </div>
      </div>

      {/* Controls & Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FileText className="text-emerald-500" size={20} />
            Income Records
          </h2>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all transform active:scale-95"
            >
              <Plus size={16} /> Add Income
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Actions</th>
                <th className="px-2 py-4 text-center">Auto Add</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredIncomes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    No records found. Add some income!
                  </td>
                </tr>
              ) : (
                filteredIncomes.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{income.source}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${income.category === 'Salary' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                          income.category === 'Freelance' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                            income.category === 'Gift' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' :
                              'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {income.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{income.date}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +RS {Number(income.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenModal(income)} className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(income.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-center">
                      <ToggleSwitch
                        value={income.autoAdd || false}
                        onChange={() => handleToggleAutoAdd(income.id, income.autoAdd || false)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingId ? 'Edit Income' : 'Add New Income'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Source Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Source</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Google Salary"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Amount Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Category & Date Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Category</label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-white appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition shadow-lg hover:shadow-emerald-200 dark:hover:shadow-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeManagement;
