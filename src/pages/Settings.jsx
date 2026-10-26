import React from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import AccountSettings from '../components/dashboard/AccountSettings';
import AccountSecurity from '../components/dashboard/AccountSecurity';
import { Settings, ShieldCheck } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <DashboardNav activeTab="settings" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
              Account Settings & Preferences
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400">
            Customize your interface appearance, currency settings, security authentication, and notifications.
          </p>
        </div>

        {/* AccountSettings Component */}
        <AccountSettings />

        {/* Security Component */}
        <AccountSecurity />
      </div>
    </div>
  );
};

export default SettingsPage;
