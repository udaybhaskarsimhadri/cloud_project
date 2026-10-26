import React, { useState, useEffect } from 'react';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import OrganizerProfile from '../../components/organizer/OrganizerProfile';
import { organizerService } from '../../services/organizerService';
import { CheckCircle2 } from 'lucide-react';

const OrganizerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadProfile = () => {
    const data = organizerService.getProfile();
    setProfile(data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSave = (updatedData) => {
    organizerService.updateProfile(updatedData);
    loadProfile();
    setToastMessage('Organizer business profile updated.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {profile && (
          <OrganizerProfile
            profileData={profile}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizerProfilePage;
