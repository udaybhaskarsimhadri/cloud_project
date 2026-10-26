import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Mountain, KeyRound, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const { forgotPassword, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email address is required');
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    clearError();

    if (!validate()) return;

    setSubmitting(true);
    try {
      await forgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send recovery instructions');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
          
          {/* Brand header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Mountain className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Adventure<span className="text-blue-600 dark:text-blue-400">X</span>
              </span>
            </Link>

            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Forgot Password?
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
              No worries, we will send secure recovery instructions to your email.
            </p>
          </div>

          {/* Success Notification */}
          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-base text-emerald-900 dark:text-emerald-200">Reset Link Sent!</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-normal leading-relaxed">
                    We sent a password reset link to <span className="font-bold">{email}</span>. Please check your inbox and spam folder.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Login</span>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                      Account Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        placeholder="name@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border ${
                          emailError ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                        } text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all`}
                      />
                    </div>
                    {emailError && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold">{emailError}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={submitting}
                    icon={Send}
                  >
                    {submitting ? 'Sending Instructions...' : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back to Login link */}
                <div className="mt-8 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
