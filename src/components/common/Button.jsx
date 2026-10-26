import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus:ring-blue-500 border border-transparent',
    secondary: 'bg-white hover:bg-blue-50/70 dark:bg-slate-900 dark:hover:bg-slate-800 border-2 border-[#2563EB] text-[#2563EB] dark:text-blue-400 shadow-md hover:shadow-lg focus:ring-blue-500',
    green: 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 focus:ring-emerald-500 border border-transparent',
    accent: 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 focus:ring-amber-500 border border-transparent',
    outline: 'border-2 border-[#2563EB] bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 focus:ring-blue-500',
    outlineWhite: 'border-2 border-white/90 bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-[#0F172A] focus:ring-white/50 shadow-lg',
    ghost: 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400 border border-transparent',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl font-bold',
    xl: 'text-lg px-8 py-4 gap-3 rounded-2xl font-bold',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </motion.button>
  );
};

export default Button;
