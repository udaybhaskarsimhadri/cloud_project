import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Eye, 
  MapPin, 
  IndianRupee,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const AdventureManagement = ({ initialAdventures = [], onAdventuresUpdated }) => {
  const [adventures, setAdventures] = useState(() => 
    initialAdventures && initialAdventures.length > 0 ? initialAdventures : adminService.getAdventures()
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingAdv, setEditingAdv] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  React.useEffect(() => {
    if (initialAdventures && initialAdventures.length > 0) {
      setAdventures(initialAdventures);
    } else {
      setAdventures(adminService.getAdventures());
    }
  }, [initialAdventures]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAdventures = adventures.filter((a) => {
    const matchesSearch = 
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.organizer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'All' || a.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleUpdateStatus = (id, newStatus, title) => {
    const updated = adminService.updateAdventureStatus(id, newStatus);
    if (updated) {
      setAdventures(adminService.getAdventures());
      if (onAdventuresUpdated) onAdventuresUpdated();
      showToast(`${title} status updated to ${newStatus}.`);
    }
  };

  const handleToggleFeatured = (id, title) => {
    const updated = adminService.toggleAdventureFeatured(id);
    if (updated) {
      setAdventures(adminService.getAdventures());
      if (onAdventuresUpdated) onAdventuresUpdated();
      showToast(`${title} featured status toggled.`);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete adventure "${title}" permanently?`)) {
      adminService.deleteAdventure(id);
      setAdventures(adminService.getAdventures());
      if (onAdventuresUpdated) onAdventuresUpdated();
      showToast('Adventure removed from catalog.');
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingAdv) return;
    const all = adminService.getAdventures();
    const idx = all.findIndex(a => a.id === editingAdv.id);
    if (idx !== -1) {
      all[idx] = { ...editingAdv };
      localStorage.setItem('adventurex_admin_adventures', JSON.stringify(all));
      setAdventures(all);
      if (onAdventuresUpdated) onAdventuresUpdated();
      setEditingAdv(null);
      showToast('Adventure updated successfully.');
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search adventure title, destination, host..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending Audit</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Trekking">Trekking</option>
              <option value="Water Sports">Water Sports</option>
              <option value="Scuba Diving">Scuba Diving</option>
              <option value="Paragliding">Paragliding</option>
              <option value="Safari">Safari</option>
              <option value="Camping">Camping</option>
            </select>
          </div>
        </div>
      </div>

      {/* Adventures Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Adventure & Location</th>
                <th className="py-3.5 px-4">Organizer</th>
                <th className="py-3.5 px-4">Price (₹)</th>
                <th className="py-3.5 px-4">Bookings</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredAdventures.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-bold">
                    No adventures found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredAdventures.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Adventure & Location */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-12 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white leading-tight">
                            {a.title}
                          </p>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {a.destination}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Organizer */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{a.organizer}</p>
                      <span className="text-[10px] text-slate-400">{a.category}</span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-black text-slate-900 dark:text-white text-sm">
                        ₹{a.price.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-slate-400">{a.duration}</span>
                    </td>

                    {/* Bookings */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {a.bookingsCount} Pax
                      </span>
                      <span className="text-[10px] text-amber-500 block">★ {a.rating}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        a.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : a.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {a.status}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(a.id, a.title)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                          a.featured
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 ring-1 ring-purple-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800'
                        }`}
                        title="Toggle Featured Homepage Placement"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>{a.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Approve */}
                        {a.status !== 'Approved' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(a.id, 'Approved', a.title)}
                            title="Approve Adventure"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Reject */}
                        {a.status !== 'Rejected' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(a.id, 'Rejected', a.title)}
                            title="Reject Adventure"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => setEditingAdv({ ...a })}
                          title="Edit Details"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(a.id, a.title)}
                          title="Delete Adventure"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Adventure Modal */}
      <AnimatePresence>
        {editingAdv && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setEditingAdv(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                Edit Adventure Parameters
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Update catalog pricing (₹), destinations, and approval status
              </p>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1">Adventure Title</label>
                  <input
                    type="text"
                    value={editingAdv.title}
                    onChange={(e) => setEditingAdv({ ...editingAdv, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Destination</label>
                    <input
                      type="text"
                      value={editingAdv.destination}
                      onChange={(e) => setEditingAdv({ ...editingAdv, destination: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Price per person (₹)</label>
                    <input
                      type="number"
                      value={editingAdv.price}
                      onChange={(e) => setEditingAdv({ ...editingAdv, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Status</label>
                    <select
                      value={editingAdv.status}
                      onChange={(e) => setEditingAdv({ ...editingAdv, status: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending Audit</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Featured on Home</label>
                    <select
                      value={editingAdv.featured ? 'true' : 'false'}
                      onChange={(e) => setEditingAdv({ ...editingAdv, featured: e.target.value === 'true' })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                    >
                      <option value="true">Featured (Highlighted)</option>
                      <option value="false">Standard Listing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingAdv(null)}
                    className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md cursor-pointer"
                  >
                    Save Changes
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

export default AdventureManagement;
