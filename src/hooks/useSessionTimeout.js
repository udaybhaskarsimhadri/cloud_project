import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { auditLogger, AUDIT_ACTIONS } from '../utils/auditLogger';

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export const useSessionTimeout = (timeoutMs = DEFAULT_TIMEOUT_MS) => {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        // Trigger automatic logout due to inactivity
        auditLogger.logEvent(AUDIT_ACTIONS.SESSION_TIMEOUT, { reason: '30_minute_inactivity' }, user);
        logout();
        toast.warning('Session expired due to inactivity. Please log in again to continue.');
      }, timeoutMs);
    };

    // User interaction listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [isAuthenticated, user, logout, toast, timeoutMs]);
};

export default useSessionTimeout;
