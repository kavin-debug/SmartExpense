import React from 'react';
import { Moon, Sun, Download, Upload, Trash2, Info } from 'lucide-react';
import Card from '../components/Common/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useExpenses } from '../contexts/ExpenseContext';

const SettingsPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { expenses } = useExpenses();

  const exportData = () => {
    const data = {
      expenses,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smartexpense-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all expense data? This action cannot be undone.')) {
      localStorage.removeItem('smartexpense-data');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your SmartExpense experience
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isDark ? <Moon size={24} /> : <Sun size={24} />}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark mode
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDark ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Data Management
        </h3>
        <div className="space-y-3">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download size={20} />
            <span>Export Data</span>
          </button>
          
          <button
            onClick={clearAllData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={20} />
            <span>Clear All Data</span>
          </button>
        </div>
      </Card>

      <Card>
        <div className="flex items-start space-x-3">
          <Info size={24} className="text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              About SmartExpense
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Version 1.0.0
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SmartExpense is a Progressive Web App designed to help you track and analyze your personal expenses with beautiful visualizations and insights.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          App Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {expenses.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Expenses
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Amount
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;