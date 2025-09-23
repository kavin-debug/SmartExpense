import React from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, BarChart3, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { isDark } = useTheme();
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'add', label: 'Add', icon: Plus },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 ${isDark ? 'bg-slate-800' : 'bg-white'} border-t border-gray-200 dark:border-slate-700 px-4 py-2 z-50 backdrop-blur-lg bg-opacity-95`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isAdd = tab.id === 'add';
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isAdd
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon size={isAdd ? 24 : 20} />
              </motion.div>
              <span className={`text-xs font-medium ${isAdd ? 'text-white' : ''}`}>
                {tab.label}
              </span>
              {isActive && !isAdd && (
                <motion.div
                  className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full"
                  layoutId="activeTab"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNav;