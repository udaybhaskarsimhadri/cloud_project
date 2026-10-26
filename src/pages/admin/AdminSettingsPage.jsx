import React from 'react';
import { Settings } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import PlatformSettings from '../../components/admin/PlatformSettings';

const AdminSettingsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Platform Settings & Policy Parameters
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure global brand identity, support emails, 15% commission rates, 18% GST rules, and maintenance safeguards
          </p>
        </div>

        <PlatformSettings />
      </main>
    </div>
  );
};

export default AdminSettingsPage;
