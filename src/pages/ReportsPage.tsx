import React from 'react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import MonthlyChart from '../components/Reports/MonthlyChart';
import ExpenseChart from '../components/Dashboard/ExpenseChart';
import Card from '../components/Common/Card';
import { useExpenses } from '../contexts/ExpenseContext';
import { MonthlyData, CategoryTotal } from '../types';

const ReportsPage: React.FC = () => {
  const { expenses } = useExpenses();

  // Generate monthly data for the last 6 months
  const monthlyData: MonthlyData[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= monthStart && expenseDate <= monthEnd;
    });
    
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    monthlyData.push({
      month: format(date, 'MMM'),
      total,
      expenses: monthExpenses.length
    });
  }

  // Generate category totals for all time
  const categoryTotals: CategoryTotal[] = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.total += expense.amount;
    } else {
      acc.push({
        category: expense.category,
        total: expense.amount,
        color: '#3B82F6'
      });
    }
    return acc;
  }, [] as CategoryTotal[]).sort((a, b) => b.total - a.total);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgMonthly = monthlyData.reduce((sum, month) => sum + month.total, 0) / monthlyData.length;
  const highestMonth = monthlyData.reduce((max, month) => month.total > max.total ? month : max, monthlyData[0]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed insights into your spending patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Monthly Average</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${avgMonthly.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Highest Month</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {highestMonth ? `$${highestMonth.total.toFixed(2)}` : '$0.00'}
            </p>
            {highestMonth && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{highestMonth.month}</p>
            )}
          </div>
        </Card>
      </div>

      {monthlyData.some(month => month.total > 0) && (
        <MonthlyChart data={monthlyData} />
      )}

      {categoryTotals.length > 0 && (
        <ExpenseChart data={categoryTotals} />
      )}

      {categoryTotals.length > 0 && (
        <Card>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Category Breakdown
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All-time spending by category
            </p>
          </div>
          
          <div className="space-y-3">
            {categoryTotals.map((category, index) => {
              const percentage = (category.total / totalSpent) * 100;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.category}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${category.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportsPage;