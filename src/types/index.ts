export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MonthlyData {
  month: string;
  total: number;
  expenses: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
  color: string;
}