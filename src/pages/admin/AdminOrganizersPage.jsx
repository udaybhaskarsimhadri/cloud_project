import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, RefreshCw } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import OrganizerManagement from '../../components/admin/OrganizerManagement';
import AdminErrorBoundary from '../../components/admin/AdminErrorBoundary';
import { adminService } from '../../services/adminService';

const AdminOrganizersPage = () => {
  const [organizers, setOrganizers] = useState(() => {
    try {
      const data = adminService.getOrganizers();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Error fetching organizers:', e);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  const refreshOrganizers = () => {
    setLoading(true);
    try {
      const data = adminService.getOrganizers();
      setOrganizers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to refresh organizers:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshOrganizers();
  }, []);

  const approvedCount = (Array.isArray(organizers) ? organizers : []).filter(
    (o) => o && o.status === 'Approved'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Organizer & Partner Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                {approvedCount} Verified Hosts
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Verify credentials, approve expedition leads, review safety ratings, and regulate vendor licenses
            </p>
          </div>

          <button
            type="button"
            onClick={refreshOrganizers}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-sm transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-purple-600' : ''}`} />
            <span>Sync Directory</span>
          </button>
        </div>

        {/* Organizer Management Module with Error Boundary */}
        <AdminErrorBoundary>
          <OrganizerManagement
            initialOrganizers={organizers}
            onOrganizersUpdated={refreshOrganizers}
          />
        </AdminErrorBoundary>
      </main>
    </div>
  );
};

export default AdminOrganizersPage;
