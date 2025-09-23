import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import StatsCard from '../components/Dashboard/StatsCard';
import ExpenseChart from '../components/Dashboard/ExpenseChart';
import RecentExpenses from '../components/Dashboard/RecentExpenses';
import { useExpenses } from '../contexts/ExpenseContext';
import { Expense, CategoryTotal } from '../types';

interface HomePageProps {
  onEditExpense: (expense: Expense) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEditExpense }) => {
  const { expenses } = useExpenses();

  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= monthStart && expenseDate <= monthEnd;
  });

  const totalThisMonth = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalAllTime = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expenseCount = thisMonthExpenses.length;
  const avgPerExpense = expenseCount > 0 ? totalThisMonth / expenseCount : 0;

  const categoryTotals: CategoryTotal[] = thisMonthExpenses.reduce((acc, expense) => {
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
  }, [] as CategoryTotal[]);

  const lastMonthTotal = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
      const lastMonthStart = startOfMonth(lastMonth);
      const lastMonthEnd = endOfMonth(lastMonth);
      return expenseDate >= lastMonthStart && expenseDate <= lastMonthEnd;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyTrend = lastMonthTotal > 0 
    ? ((totalThisMonth - lastMonthTotal) / lastMonthTotal * 100)
    : 0;

  const trendText = monthlyTrend > 0 
    ? `+${monthlyTrend.toFixed(1)}% from last month`
    : `${monthlyTrend.toFixed(1)}% from last month`;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your spending overview for {format(currentMonth, 'MMMM yyyy')}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="This Month"
          value={`$${totalThisMonth.toFixed(2)}`}
          icon={DollarSign}
          gradient="from-blue-500 to-blue-600"
          trend={Math.abs(monthlyTrend) > 0 ? trendText : undefined}
          delay={0.1}
        />
        <StatsCard
          title="Total Expenses"
          value={expenseCount.toString()}
          icon={Calendar}
          gradient="from-green-500 to-green-600"
          delay={0.2}
        />
        <StatsCard
          title="All Time"
          value={`$${totalAllTime.toFixed(2)}`}
          icon={TrendingUp}
          gradient="from-purple-500 to-purple-600"
          delay={0.3}
        />
        <StatsCard
          title="Avg. per Expense"
          value={`$${avgPerExpense.toFixed(2)}`}
          icon={Target}
          gradient="from-orange-500 to-orange-600"
          delay={0.4}
        />
      </div>

      {categoryTotals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ExpenseChart data={categoryTotals} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <RecentExpenses 
          expenses={expenses} 
          onExpenseClick={onEditExpense}
        />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;