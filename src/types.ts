
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

export interface User {
  id: string;
  name: string;
  email: string;
}
