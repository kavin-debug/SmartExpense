import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Card from '../Common/Card';
import AnimatedCounter from '../Common/AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  trend?: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, gradient, trend, delay = 0 }) => {
  const numericValue = parseFloat(value.replace(/[$,]/g, ''));
  const isNumeric = !isNaN(numericValue);
  const prefix = value.includes('$') ? '$' : '';

  return (
    <Card className="relative overflow-hidden group" delay={delay}>
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {isNumeric ? (
              <AnimatedCounter 
                value={numericValue} 
                prefix={prefix}
                decimals={prefix ? 2 : 0}
              />
            ) : (
              value
            )}
          </p>
          {trend && (
            <motion.p 
              className="text-xs text-green-600 dark:text-green-400 mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.5 }}
            >
              {trend}
            </motion.p>
          )}
        </div>
        <motion.div 
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: delay + 0.3,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon size={24} />
        </motion.div>
      </div>
    </Card>
  );
};

export default StatsCard;