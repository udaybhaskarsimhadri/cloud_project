import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Laptop, 
  Globe, 
  Clock, 
  AlertCircle, 
  Check, 
  Lock,
  LogOut
} from 'lucide-react';

const AccountSecurity = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordToast, setPasswordToast] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const activeDevices = [
    {
      id: 'dev-1',
      device: 'MacBook Pro 16" (Current Device)',
      browser: 'Chrome 128.0 • macOS Sonoma',
      ip: '103.212.144.18 (Bengaluru, India)',
      time: 'Active now',
      isCurrent: true,
      icon: Laptop
    },
    {
      id: 'dev-2',
      device: 'iPhone 15 Pro',
      browser: 'AdventureX App v2.4 • iOS 18',
      ip: '103.212.144.20 (Bengaluru, India)',
      time: '2 hours ago',
      isCurrent: false,
      icon: Smartphone
    },
    {
      id: 'dev-3',
      device: 'iPad Air 5th Gen',
      browser: 'Safari 17.6 • iPadOS',
      ip: '122.161.48.92 (Manali, HP Basecamp)',
      time: 'Apr 10, 2026',
      isCurrent: false,
      icon: Laptop
    }
  ];

  const recentLogins = [
    {
      id: 'log-1',
      date: 'Today, 09:15 AM',
      location: 'Bengaluru, India',
      device: 'MacBook Pro • Chrome',
      status: 'Successful'
    },
    {
      id: 'log-2',
      date: 'Apr 18, 2026, 02:40 PM',
      location: 'Bengaluru, India',
      device: 'iPhone 15 Pro • App',
      status: 'Successful'
    },
    {
      id: 'log-3',
      date: 'Apr 10, 2026, 11:10 AM',
      location: 'Manali, Himachal Pradesh',
      device: 'iPad Air • Safari',
      status: 'Successful'
    }
  ];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPass || !newPass || !confirmPass) {
      setPasswordToast('Please fill all password fields.');
      return;
    }
    if (newPass !== confirmPass) {
      setPasswordToast('New passwords do not match.');
      return;
    }
    if (newPass.length < 6) {
      setPasswordToast('Password must be at least 6 characters.');
      return;
    }

    setPasswordToast('Password successfully updated!');
    setTimeout(() => {
      setShowPasswordModal(false);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setPasswordToast('');
    }, 1200);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
            Account Security & Access
          </h3>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Shield Active
        </span>
      </div>

      {/* Security Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Change Password Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                Account Password
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last changed 3 months ago
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Update
          </button>
        </div>

        {/* 2FA Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                Two-Factor Auth (2FA)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {twoFactorEnabled ? 'Enabled via Authenticator App' : 'Additional SMS / App Security'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              twoFactorEnabled
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {twoFactorEnabled ? 'Enabled' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* Active Devices */}
      <div className="space-y-3 pt-2">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Active Devices ({activeDevices.length})
        </h4>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          {activeDevices.map((dev) => {
            const Icon = dev.icon;
            return (
              <div
                key={dev.id}
                className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A] dark:text-white">
                        {dev.device}
                      </span>
                      {dev.isCurrent && (
                        <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          Current Session
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                      {dev.browser} • {dev.ip}
                    </span>
                  </div>
                </div>

                <span className="text-slate-400 font-semibold shrink-0">
                  {dev.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Logins */}
      <div className="space-y-3 pt-2">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Recent Login Activity
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentLogins.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700 dark:text-slate-300">{item.date}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">✓ {item.status}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                {item.location}
              </span>
              <span className="text-[10px] text-slate-400 font-mono block">
                {item.device}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
                  Update Account Password
                </h4>
              </div>

              {passwordToast && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  passwordToast.includes('success')
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {passwordToast}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountSecurity;
