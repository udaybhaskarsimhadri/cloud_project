import React, { useState, useEffect } from 'react';
import { Mountain, CheckCircle2 } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import AdventureManagement from '../../components/admin/AdventureManagement';
import { adminService } from '../../services/adminService';

const AdminAdventuresPage = () => {
  const [adventures, setAdventures] = useState(() => adminService.getAdventures());

  const refreshAdventures = () => {
    setAdventures(adminService.getAdventures());
  };

  useEffect(() => {
    refreshAdventures();
  }, []);

  const activeCount = adventures.filter(a => a.status === 'Approved').length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Adventure Catalog Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {activeCount} Active on Catalog
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Audit submitted expeditions, manage prices in INR (₹), toggle featured homepage placements, and enforce quality criteria
            </p>
          </div>
        </div>

        {/* Adventure Management Module */}
        <AdventureManagement
          initialAdventures={adventures}
          onAdventuresUpdated={refreshAdventures}
        />
      </main>
    </div>
  );
};

export default AdminAdventuresPage;
