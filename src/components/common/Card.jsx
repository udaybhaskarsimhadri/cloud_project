import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm ${
        hoverEffect ? 'hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300' : ''
      } overflow-hidden ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
