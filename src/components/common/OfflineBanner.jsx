import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import useNetworkStatus from '../../hooks/useNetworkStatus';

const OfflineBanner = () => {
  const { isOffline, wasOffline } = useNetworkStatus();

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 inset-x-0 z-50 bg-amber-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
        >
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>You are currently offline. Running on cached Local Storage data. Expeditions and bookings will sync when reconnected.</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-2 px-2 py-0.5 rounded-lg bg-slate-950/20 hover:bg-slate-950/30 text-[11px] font-black flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Check Connection</span>
          </button>
        </motion.div>
      )}

      {!isOffline && wasOffline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 inset-x-0 z-50 bg-emerald-600 text-white font-bold px-4 py-2 text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          <Wifi className="w-4 h-4" />
          <span>Connection restored! Cloud synchronization active.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
