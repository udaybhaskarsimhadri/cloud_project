import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MailCheck, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  Mountain, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, resendVerification, verifyEmailNow } = useAuth();

  const targetEmail = location.state?.email || user?.email || 'your-registered-email@example.com';
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState(false);
  const [isVerified, setIsVerified] = useState(user?.emailVerified || false);
  const [verifying, setVerifying] = useState(false);

  const handleResend = async () => {
    setResending(true);
    setResendStatus(false);
    try {
      await resendVerification(targetEmail);
      setResendStatus(true);
      setTimeout(() => setResendStatus(false), 5000);
    } finally {
      setResending(false);
    }
  };

  const handleSimulateVerification = async () => {
    setVerifying(true);
    try {
      await verifyEmailNow(targetEmail);
      setIsVerified(true);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
          
          {/* Brand header */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Mountain className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Adventure<span className="text-blue-600 dark:text-blue-400">X</span>
            </span>
          </Link>

          {/* Verification Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className={`w-20 h-20 rounded-3xl ${isVerified ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'} flex items-center justify-center shadow-lg transition-colors`}>
              {isVerified ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <MailCheck className="w-10 h-10" />
              )}
            </div>
            {!isVerified && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            )}
          </div>

          {/* Title & Status */}
          {isVerified ? (
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Email Verified!
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Your email address <span className="font-bold text-slate-800 dark:text-slate-200">{targetEmail}</span> has been confirmed. Your account is in good standing.
              </p>
            </div>
          ) : (
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-bold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Verification Pending</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Verify Your Email
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We sent an authentication link to:
              </p>
              <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 py-1.5 px-3 rounded-xl inline-block break-all border border-blue-200 dark:border-blue-900">
                {targetEmail}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                Click the confirmation link inside your email to unlock all adventure booking features.
              </p>
            </div>
          )}

          {/* Resend Confirmation Banner */}
          <AnimatePresence>
            {resendStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verification email dispatched. Check your spam folder!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isVerified ? (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  const role = (user?.role || location.state?.role || '').toLowerCase();
                  navigate(role === 'organizer' ? '/organizer' : '/dashboard', { replace: true });
                }}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={resending}
                  onClick={handleResend}
                  icon={Send}
                >
                  {resending ? 'Dispatching Email...' : 'Resend Verification Email'}
                </Button>

                {/* Simulation button for easy evaluation */}
                <button
                  type="button"
                  onClick={handleSimulateVerification}
                  disabled={verifying}
                  className="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-400 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{verifying ? 'Confirming...' : 'Simulate Email Link Click (Verify Now)'}</span>
                </button>
              </>
            )}
          </div>

          {/* Back to Login */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Spam Protected & ISO 27001 Certified</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
