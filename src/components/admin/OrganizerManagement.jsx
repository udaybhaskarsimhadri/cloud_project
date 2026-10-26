import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const OrganizerManagement = ({ initialOrganizers = [], onOrganizersUpdated }) => {
  const [organizers, setOrganizers] = useState(() => {
    try {
      if (initialOrganizers && Array.isArray(initialOrganizers) && initialOrganizers.length > 0) {
        return initialOrganizers;
      }
      const data = adminService.getOrganizers();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingOrg, setViewingOrg] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (initialOrganizers && Array.isArray(initialOrganizers) && initialOrganizers.length > 0) {
      setOrganizers(initialOrganizers);
    } else {
      try {
        const data = adminService.getOrganizers();
        setOrganizers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load organizers in effect:', err);
      }
    }
  }, [initialOrganizers]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const orgList = Array.isArray(organizers) ? organizers : [];

  const filteredOrganizers = orgList.filter((o) => {
    if (!o) return false;
    const company = (o.company || o.companyName || '').toLowerCase();
    const lead = (o.organizerName || o.name || '').toLowerCase();
    const email = (o.email || '').toLowerCase();
    const phone = String(o.phone || '');
    const loc = (o.location || '').toLowerCase();
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch = 
      query === '' ||
      company.includes(query) ||
      lead.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      loc.includes(query);

    const matchesStatus = statusFilter === 'All' || (o.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id, newStatus, company) => {
    const updated = adminService.updateOrganizerStatus(id, newStatus);
    if (updated) {
      setOrganizers(adminService.getOrganizers());
      if (onOrganizersUpdated) onOrganizersUpdated();
      showToast(`${company} marked as ${newStatus}.`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, organizer name, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
          >
            <option value="All">All Organizers</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending Audit</option>
            <option value="Rejected">Rejected</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Organizers Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Organization Name</th>
                <th className="py-3.5 px-4">Organizer Name</th>
                <th className="py-3.5 px-4">Email & Phone</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Verification</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-center">Adventures</th>
                <th className="py-3.5 px-4 text-center">Bookings</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredOrganizers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shadow-sm">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-black text-slate-800 dark:text-white">
                        No Organizers Found
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {searchTerm || statusFilter !== 'All'
                          ? 'No partner accounts match your active search and status filter criteria.'
                          : 'No trip organizers are currently registered on the platform.'}
                      </p>
                      {(searchTerm || statusFilter !== 'All') && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('All');
                          }}
                          className="mt-2 px-3.5 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrganizers.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Organization Name */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={o.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(o.company || 'Partner')}`}
                          alt={o.company}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 shrink-0"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white leading-tight">
                            {o.company || o.companyName || 'Expeditions Partner'}
                          </p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {o.location || 'India'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Organizer Name */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {o.organizerName || o.name || 'Lead Host'}
                      </p>
                      <p className="text-[10px] text-slate-400">ID: {o.id}</p>
                    </td>

                    {/* Email & Phone */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{o.email}</p>
                      <p className="text-[11px] text-slate-500">{o.phone || 'Not provided'}</p>
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-black text-slate-800 dark:text-slate-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{o.rating || 5.0}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({o.reviewsCount || 0})</span>
                      </div>
                    </td>

                    {/* Verification Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {o.verified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Account Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        o.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : o.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : o.status === 'Suspended'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {o.status || 'Active'}
                      </span>
                    </td>

                    {/* Total Adventures */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-black text-xs">
                        {o.totalAdventures || 0} Listed
                      </span>
                    </td>

                    {/* Total Bookings */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-black text-xs">
                        {o.totalBookings || 0} Pax
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View Profile */}
                        <button
                          type="button"
                          onClick={() => setViewingOrg(o)}
                          title="View Profile Dossier"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Approve */}
                        {o.status !== 'Approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(o.id, 'Approved', o.company)}
                            title="Approve Organizer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Reject */}
                        {o.status !== 'Rejected' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(o.id, 'Rejected', o.company)}
                            title="Reject Organizer"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Suspend */}
                        {o.status !== 'Suspended' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(o.id, 'Suspended', o.company)}
                            title="Suspend Organizer"
                            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Organizer Profile Modal */}
      <AnimatePresence>
        {viewingOrg && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setViewingOrg(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <img
                  src={viewingOrg.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(viewingOrg.company)}`}
                  alt={viewingOrg.company}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{viewingOrg.company}</h3>
                  <p className="text-xs text-slate-500">Lead: {viewingOrg.organizerName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-amber-500 flex items-center gap-0.5">
                      ★ {viewingOrg.rating} ({viewingOrg.reviewsCount} reviews)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      {viewingOrg.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Official License:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-white">{viewingOrg.licenseNo || 'Verified'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Base Location:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{viewingOrg.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Official Email:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{viewingOrg.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Emergency Phone:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{viewingOrg.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Active Expeditions Listed:</span>
                  <span className="font-bold text-purple-600">{viewingOrg.totalAdventures || 0} Listed</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Total Guest Bookings:</span>
                  <span className="font-bold text-blue-600">{viewingOrg.totalBookings || 0} Bookings</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-800/50">
                  <span className="text-slate-400">Verification Status:</span>
                  <span className={`font-bold ${viewingOrg.verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {viewingOrg.verified ? 'Verified Expedition Partner' : 'Pending Verification'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Partner Joined:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{viewingOrg.joinedDate}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(viewingOrg.id, 'Approved', viewingOrg.company);
                    setViewingOrg(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Approve Partner
                </button>
                <button
                  type="button"
                  onClick={() => setViewingOrg(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default OrganizerManagement;
