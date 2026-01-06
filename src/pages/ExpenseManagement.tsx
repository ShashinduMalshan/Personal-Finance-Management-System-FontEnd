
import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, X, DollarSign, Calendar, FileText, Search, Loader2, TrendingDown, CreditCard, ChevronLeft, ChevronRight, Filter, Tag } from 'lucide-react';
// import { getExpenses, createExpense, updateExpense, deleteExpense } from '../services/expense';


export interface User {
  id: string;
  name: string;
  email: string;
}

export type IncomeCategory = 'Salary' | 'Freelance' | 'Investment' | 'Gift' | 'Other';
export type ExpenseCategory = 'Rent' | 'Food' | 'Utilities' | 'Entertainment' | 'Health' | 'Travel' | 'Other';

export interface IncomeRecord {
  id: string;
  source: string;
  amount: number;
  date: string;
  category: IncomeCategory;
  autoAdd?: boolean;
}

export interface ExpenseRecord {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

const CATEGORIES: ExpenseCategory[] = ['Rent', 'Food', 'Utilities', 'Entertainment', 'Health', 'Travel', 'Other'];

const ExpenseManagement: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(8);

    const [formData, setFormData] = useState<Omit<ExpenseRecord, "id">>({
        description: "",
        amount: 0,
        date: new Date().toISOString().split("T")[0],
        category: "Food"
    });

    const fetchExpenses = useCallback(async (page: number = 1) => {
        setLoading(true);
        try {
            // const response = await getExpenses(page, itemsPerPage);
            // setExpenses(response.data);
            // setCurrentPage(response.page);
            // setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching expense records:", error);
        } finally {
            setLoading(false);
        }
    }, [itemsPerPage]);

    useEffect(() => {
        fetchExpenses(1);
    }, [fetchExpenses]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // await updateExpense(editingId, formData);
            } else {
                // await createExpense(formData);
            }
            await fetchExpenses(currentPage);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving expense:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return;
        try {
            // await deleteExpense(id);
            await fetchExpenses(currentPage);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleOpenModal = (record?: ExpenseRecord) => {
        if (record) {
            setEditingId(record.id);
            setFormData({
                description: record.description,
                amount: record.amount,
                date: record.date,
                category: record.category
            });
        } else {
            setEditingId(null);
            setFormData({
                description: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                category: 'Food'
            });
        }
        setIsModalOpen(true);
    };

    const filteredExpenses = expenses.filter(exp =>
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalExpense = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-red-200 dark:shadow-none">
                    <h3 className="text-red-100 text-sm font-medium mb-1">Total Expenses</h3>
                    <div className="text-3xl font-bold flex items-baseline gap-1">
                        <span className="text-lg opacity-70">$</span>
                        {totalExpense.toLocaleString()}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                    <h3 className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">Transactions</h3>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{filteredExpenses.length}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-400 dark:text-gray-500 text-sm font-medium mb-1">Top Drain</h3>
                        <div className="text-xl font-bold text-gray-800 dark:text-white">Housing</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
                        <TrendingDown size={20} />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FileText className="text-red-500" size={20} />
                        Expense Ledger
                    </h2>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all transform active:scale-95"
                        >
                            <Plus size={16} /> Add Expense
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center">
                                        <Loader2 className="animate-spin text-red-500 mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                        No expense records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredExpenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{expense.description}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${expense.category === 'Rent' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                                                    expense.category === 'Food' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        expense.category === 'Health' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                                                {expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{expense.date}</td>
                                        <td className="px-6 py-4 text-right font-bold text-red-600 dark:text-red-400">
                                            -${Number(expense.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleOpenModal(expense)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(expense.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fetchExpenses(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => fetchExpenses(currentPage + 1)}
                            disabled={currentPage === totalPages || loading}
                            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    {editingId ? 'Edit Expense' : 'Add New Expense'}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="text"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                        <div className="relative">
                                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-white appearance-none cursor-pointer"
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700 dark:text-white"
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
                                        className="flex-1 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-lg hover:shadow-red-100 dark:shadow-none"
                                    >
                                        {editingId ? 'Update' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
            </div>
    )}
        </div>
    );
};

export default ExpenseManagement;
