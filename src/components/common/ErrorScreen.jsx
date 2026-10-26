import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import RetryButton from './RetryButton';

const ErrorScreen = ({
  title = 'Expedition Service Unavailable',
  message = 'We encountered a momentary trail blockage while connecting to our cloud services. Please check your connection and retry.',
  onRetry = null,
  showHomeButton = true
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-slate-800 dark:text-slate-100">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          {onRetry && <RetryButton onRetry={onRetry} label="Retry Connection" />}
          {showHomeButton && (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
