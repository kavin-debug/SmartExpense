import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, delay = 0, animate = true }) => {
  const { isDark } = useTheme();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const CardComponent = animate ? motion.div : 'div';

  return (
    <CardComponent
      variants={animate ? cardVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
      whileHover={onClick ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className} backdrop-blur-sm bg-opacity-90`}
      onClick={onClick}
    >
      {children}
    </CardComponent>
  );
};

export default Card;