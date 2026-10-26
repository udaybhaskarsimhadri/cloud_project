import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Loader2, 
  X 
} from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: { icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  error: { icon: XCircle, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
  warning: { icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  info: { icon: Info, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  loading: { icon: Loader2, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((type, message, duration = 3500) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    const newToast = { id, type, message };

    setToasts((prev) => [...prev, newToast]);

    if (duration && type !== 'loading') {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }
    return id;
  }, [dismiss]);

  const toast = {
    success: (msg, dur) => show('success', msg, dur),
    error: (msg, dur) => show('error', msg, dur),
    warning: (msg, dur) => show('warning', msg, dur),
    info: (msg, dur) => show('info', msg, dur),
    loading: (msg) => show('loading', msg, 0),
    dismiss
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Global Toast Viewport Container */}
      <div 
        aria-live="polite" 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const conf = ICONS[t.type] || ICONS.info;
            const Icon = conf.icon;
            const isSpinning = t.type === 'loading';

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-100 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${conf.color}`}>
                    <Icon className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                  </div>
                  <p className="font-semibold leading-relaxed truncate">{t.message}</p>
                </div>

                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss Notification"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Graceful fallback if invoked outside provider
    return {
      success: (msg) => console.log('[Toast:Success]', msg),
      error: (msg) => console.error('[Toast:Error]', msg),
      warning: (msg) => console.warn('[Toast:Warning]', msg),
      info: (msg) => console.info('[Toast:Info]', msg),
      loading: () => 'mock-id',
      dismiss: () => {}
    };
  }
  return context;
};

export default ToastContext;
