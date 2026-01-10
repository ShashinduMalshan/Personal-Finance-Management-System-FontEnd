
export type IncomeCategory = 'Salary' | 'Freelance' | 'Investment' | 'Gift' | 'Other';
export type ExpenseCategory = 'Rent' | 'Food' | 'Utilities' | 'Entertainment' | 'Health' | 'Travel' | 'Other';
export type GoalCategory = 'Electronics' | 'Travel' | 'Education' | 'Finance' | 'Lifestyle' | 'Other';

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

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: GoalCategory;
  targetDate?: string;
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


export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  status?: 'Active' | 'Inactive' | 'Pending';
  lastLogin?: string;
  avatar?: string;
}
