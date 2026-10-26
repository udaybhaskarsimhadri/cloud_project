import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ 
  isOpen, 
  message, 
  type = 'success', 
  onClose, 
  duration = 4000 
}) => {
  useEffect(() => {
    if (!isOpen || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white dark:bg-slate-900 border-emerald-500/30 text-slate-900 dark:text-white',
    error: 'bg-white dark:bg-slate-900 border-rose-500/30 text-slate-900 dark:text-white',
    info: 'bg-white dark:bg-slate-900 border-blue-500/30 text-slate-900 dark:text-white'
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-2xl max-w-md ${bgStyles[type] || bgStyles.info}`}
          role="status"
          aria-live="polite"
        >
          {icons[type] || icons.info}
          <div className="text-xs sm:text-sm font-semibold pr-2">
            {message}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Toast;
