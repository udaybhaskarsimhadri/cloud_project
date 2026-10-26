import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RetryButton = ({ onRetry, label = 'Try Again', className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onRetry || loading) return;
    setLoading(true);
    try {
      await onRetry();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 ${className}`}
    >
      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Retrying Connection...' : label}</span>
    </button>
  );
};

export default RetryButton;
