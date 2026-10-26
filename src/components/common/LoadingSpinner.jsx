import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false, color = 'emerald' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const borderColors = {
    emerald: 'border-emerald-600 dark:border-emerald-400 border-t-transparent',
    blue: 'border-blue-600 dark:border-blue-400 border-t-transparent'
  };

  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        className={`${sizes[size] || sizes.md} rounded-full ${borderColors[color] || borderColors.emerald}`}
      />
      {text && (
        <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
