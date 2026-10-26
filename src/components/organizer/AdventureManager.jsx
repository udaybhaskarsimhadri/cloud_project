import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mountain, 
  MapPin, 
  Coins, 
  Users, 
  Calendar, 
  Eye, 
  Edit3, 
  Copy, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdventureManager = ({
  adventures = [],
  onCreateNew,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const filteredAdventures = adventures.filter((adv) => {
    const matchesSearch = 
      adv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adv.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adv.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' ? true : adv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Draft
          </span>
        );
      case 'Paused':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            Paused
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
            Expedition Catalog ({adventures.length})
          </h3>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Manage your outdoor itineraries, batch capacities, live prices, and publications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search adventures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            {['All', 'Active', 'Draft', 'Paused'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Create Button */}
          <button
            type="button"
            onClick={onCreateNew}
            className="px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Adventure</span>
          </button>
        </div>
      </div>

      {/* Grid of Adventures */}
      {filteredAdventures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredAdventures.map((adv) => (
              <motion.div
                key={adv.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group transition-all"
              >
                {/* Adventure Image Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={adv.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'}
                    alt={adv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(adv.status)}
                  </div>

                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
                    {adv.category}
                  </span>

                  {/* Price Tag in INR */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-lg font-black text-white">
                      ₹{adv.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-200"> / person</span>
                  </div>
                </div>

                {/* Adventure Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{adv.destination}</span>
                    </div>

                    <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {adv.name}
                    </h4>

                    <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 line-clamp-2">
                      {adv.description}
                    </p>
                  </div>

                  {/* Capacity & Bookings Stats */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Available Seats</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {adv.availableSeats ?? 8} / {adv.totalSeats ?? 16}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Bookings</span>
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">
                        {adv.bookingsCount ?? 0} Reserved
                      </span>
                    </div>
                  </div>

                  {/* Actions: View, Edit, Duplicate, Delete */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      {/* View on Marketplace */}
                      <Link
                        to={`/adventure/${adv.id}`}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View Public Adventure Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {/* Edit Adventure */}
                      <button
                        type="button"
                        onClick={() => onEdit(adv)}
                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                        title="Edit Adventure Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Duplicate Adventure */}
                      <button
                        type="button"
                        onClick={() => onDuplicate(adv.id)}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Duplicate Adventure as Draft"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delete Adventure */}
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(adv.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Adventure"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <Mountain className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
            No Expeditions Found
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Create and publish your first guided Himalayan trek, rafting trip, or paragliding slot.
          </p>
          <button
            type="button"
            onClick={onCreateNew}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Adventure</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
                  Delete Adventure Expedition?
                </h4>
                <p className="text-xs text-slate-500">
                  Are you sure you want to remove this adventure from your catalog? This action will remove it locally.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(deleteTargetId);
                    setDeleteTargetId(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-md hover:bg-rose-700"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureManager;
