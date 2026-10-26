import React, { useState } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import UserProfile from '../components/dashboard/UserProfile';
import BadgeSystem from '../components/community/BadgeSystem';
import { dashboardService } from '../services/dashboardService';
import { User, Award, Shield, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(dashboardService.getProfile());
  const [toast, setToast] = useState('');

  const handleProfileSaved = (updated) => {
    setProfile(updated);
    setToast('Profile successfully saved and updated.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <DashboardNav activeTab="profile" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
              Adventurer Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400">
            Manage your personal traveler details, medical emergency contacts, outdoor activity preferences, and earned badges.
          </p>
        </div>

        {toast && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toast}</span>
          </div>
        )}

        {/* UserProfile Component */}
        <UserProfile onProfileSaved={handleProfileSaved} />

        {/* Part 11: Badge System on Profile */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <BadgeSystem />
        </div>
      </div>
    </div>
  );
};

export default Profile;
