import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Mountain,
  Compass,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Singapore',
  'United Arab Emirates',
  'Nepal',
  'Switzerland',
  'New Zealand',
];

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'India',
    role: 'traveler', // 'traveler' | 'organizer'
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Password strength calculator
  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return score;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordStrength = calculateStrength(formData.password);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password must include numbers or uppercase letters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms of service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    clearError();

    if (!validate()) return;

    setSubmitting(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        role: formData.role,
        password: formData.password,
      });

      // Redirect to Email Verification page with user email and role context
      navigate('/email-verification', { 
        state: { 
          email: formData.email,
          role: formData.role,
          registeredNow: true 
        } 
      });
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMessage('');
    clearError();
    try {
      const gUser = await loginWithGoogle(formData.role);
      const role = (gUser?.role || formData.role || 'traveler').toLowerCase();
      navigate(role === 'organizer' ? '/organizer' : '/dashboard', { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Google registration failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Mountain className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Adventure<span className="text-blue-600 dark:text-blue-400">X</span>
              </span>
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Create Your Account
            </h1>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
              Join thousands of adventurers, trekkers, and certified expedition leaders
            </p>
          </div>

          {/* Account Role Selector (Traveler vs Organizer) */}
          <div className="mb-6 grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'traveler' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                formData.role === 'traveler'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Traveler / Explorer</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'organizer' })}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                formData.role === 'organizer'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Trip Organizer</span>
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Vikram Malhotra"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border ${
                    errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border ${
                    errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.email}</p>}
            </div>

            {/* Phone & Country Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                  Country
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="dark:bg-slate-900">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white dark:bg-slate-800 border ${
                    errors.password ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Indicator Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1.5 w-full">
                    <div className={`flex-1 rounded-full ${passwordStrength >= 1 ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full ${passwordStrength >= 2 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full ${passwordStrength >= 3 ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                    <div className={`flex-1 rounded-full ${passwordStrength >= 4 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Strength: {passwordStrength <= 1 ? 'Weak' : passwordStrength === 2 ? 'Fair' : passwordStrength === 3 ? 'Good' : 'Very Strong'}
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  placeholder="Re-type password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white dark:bg-slate-800 border ${
                    errors.confirmPassword ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms of Service Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => {
                    setFormData({ ...formData, acceptTerms: e.target.checked });
                    if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: '' });
                  }}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer"
                />
                <span>
                  I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting || googleLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="mt-3"
            >
              {submitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Or sign up with
            </span>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting || googleLoading}
            className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm shadow-sm flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
          </button>

          {/* Already have an account link */}
          <div className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
