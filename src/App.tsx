import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { ExpenseProvider, useExpenses } from './contexts/ExpenseContext';
import BottomNav from './components/Layout/BottomNav';
import WelcomeScreen from './components/Onboarding/WelcomeScreen';
import SplashScreen from './components/Common/SplashScreen';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ExpenseForm from './components/Forms/ExpenseForm';
import FloatingActionButton from './components/Common/FloatingActionButton';
import { Expense } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const { addExpense, updateExpense } = useExpenses();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('smartexpense-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleWelcomeComplete = () => {
    localStorage.setItem('smartexpense-welcome-seen', 'true');
    setShowWelcome(false);
  };

  const handleSaveExpense = (expenseData: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      addExpense(expenseData);
    }
    setActiveTab('home');
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setActiveTab('home');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  const renderContent = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20, scale: 0.95 },
      in: { opacity: 1, x: 0, scale: 1 },
      out: { opacity: 0, x: -20, scale: 0.95 }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.4
    };

    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onEditExpense={handleEditExpense} />
          </motion.div>
        );
      case 'add':
        return (
          <motion.div
            key="add"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
          <ExpenseForm
            expense={editingExpense || undefined}
            onSave={handleSaveExpense}
            onCancel={handleCancelEdit}
          />
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div
            key="reports"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ReportsPage />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            key="settings"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SettingsPage />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home-default"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage onEditExpense={handleEditExpense} />
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-md mx-auto p-4">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
      
      <FloatingActionButton 
        onClick={() => setActiveTab('add')} 
        isVisible={activeTab !== 'add'} 
      />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </motion.div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;