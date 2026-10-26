import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Sun, 
  Moon, 
  Laptop, 
  Globe, 
  Coins, 
  Bell, 
  Shield, 
  Check, 
  Save, 
  AlertTriangle,
  Lock,
  Eye,
  Sliders
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { dashboardService } from '../../services/dashboardService';

const AccountSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState(dashboardService.getSettings());
  const [savedToast, setSavedToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const current = dashboardService.getSettings();
    setSettings(current);
  }, []);

  const handleNotificationToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dashboardService.updateSettings(settings);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleThemeSelect = (selectedTheme) => {
    setSettings((prev) => ({ ...prev, theme: selectedTheme }));
    if (selectedTheme === 'dark' && theme !== 'dark') {
      toggleTheme();
    } else if (selectedTheme === 'light' && theme !== 'light') {
      toggleTheme();
    } else if (selectedTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark && theme !== 'dark') toggleTheme();
      if (!isDark && theme !== 'light') toggleTheme();
    }
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Account Preferences & Settings
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Configure display themes, currency representations, and automated alerts.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Theme Selection */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Interface Theme
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Crisp alpine light interface' },
              { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'High-contrast midnight theme' },
              { id: 'system', label: 'System Default', icon: Laptop, desc: 'Follows operating system' }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = settings.theme === item.id || (item.id === theme && settings.theme !== 'system');

              return (
                <div
                  key={item.id}
                  onClick={() => handleThemeSelect(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-[#0F172A] dark:text-white">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Language & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Language */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Display Language</span>
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English (India)">English (India)</option>
              <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
              <option value="Spanish (Español)">Spanish (Español)</option>
              <option value="French (Français)">French (Français)</option>
              <option value="German (Deutsch)">German (Deutsch)</option>
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-500" />
              <span>Preferred Expedition Currency</span>
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="₹ INR">₹ INR (Indian Rupee - Primary)</option>
              <option value="$ USD">$ USD (US Dollar)</option>
              <option value="€ EUR">€ EUR (Euro)</option>
              <option value="£ GBP">£ GBP (British Pound)</option>
            </select>
          </div>
        </div>

        {/* 3. Notification Preferences */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Notification Preferences
          </label>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            {[
              { key: 'email', title: 'Email Notifications', desc: 'Booking confirmations, vouchers, and itinerary updates.' },
              { key: 'push', title: 'Push Alerts', desc: 'Real-time trailhead rendezvous and guide messages.' },
              { key: 'tripReminders', title: 'Trip Countdown Reminders', desc: 'T-14 and T-48 hour packing checklists and weather advisories.' },
              { key: 'promoOffers', title: 'Coupons & Expedition Perks', desc: 'Exclusive seasonal discounts and alpine member rewards.' },
              { key: 'sms', title: 'SMS Critical Dispatches', desc: 'Urgent mountain safety announcements.' }
            ].map((item) => (
              <div key={item.key} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotificationToggle(item.key)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer ${
                    settings.notifications?.[item.key] ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      settings.notifications?.[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Privacy Settings */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Privacy & Data Controls
          </label>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            {[
              { key: 'profilePublic', title: 'Public Explorer Profile', desc: 'Allow fellow expedition members to view your completed summits.' },
              { key: 'shareActivity', title: 'Share Trail Stats Anonymously', desc: 'Contribute GPS trail logs to AdventureX community reports.' },
              { key: 'cookieAnalytics', title: 'Performance & Analytics Cookies', desc: 'Help us optimize mountain weather maps and caching speed.' }
            ].map((item) => (
              <div key={item.key} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handlePrivacyToggle(item.key)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer ${
                    settings.privacy?.[item.key] ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      settings.privacy?.[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
