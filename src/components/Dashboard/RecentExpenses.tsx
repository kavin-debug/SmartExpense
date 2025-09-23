import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Card from '../Common/Card';
import { Expense } from '../../types';
import { categories } from '../../data/categories';

interface RecentExpensesProps {
  expenses: Expense[];
  onExpenseClick: (expense: Expense) => void;
}

const RecentExpenses: React.FC<RecentExpensesProps> = ({ expenses, onExpenseClick }) => {
  const recentExpenses = expenses.slice(-5).reverse();

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(cat => cat.name === categoryName) || categories[categories.length - 1];
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Expenses
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your latest transactions
        </p>
      </div>
      
      <div className="space-y-3">
        {recentExpenses.length > 0 ? (
          <AnimatePresence>
            {recentExpenses.map((expense, index) => {
            const categoryInfo = getCategoryInfo(expense.category);
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onExpenseClick(expense)}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categoryInfo.icon}
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {expense.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(expense.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.category}
                  </p>
                </div>
              </motion.div>
            );
            })}
          </AnimatePresence>
        ) : (
          <motion.div 
            className="text-center py-8 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No expenses yet</p>
            <p className="text-sm">Add your first expense to get started!</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default RecentExpenses;