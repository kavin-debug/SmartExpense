import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, isVisible }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 z-40 ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
      } hover:scale-110 active:scale-95`}
    >
      <Plus size={24} className="mx-auto" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
};

export default FloatingActionButton;