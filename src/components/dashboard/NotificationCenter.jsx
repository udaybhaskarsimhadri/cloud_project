import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Compass, 
  Tag, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  Check, 
  CalendarCheck2, 
  Info,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NOTIF_ICONS = {
  booking: CalendarCheck2,
  reminder: Clock,
  coupon: Tag,
  recommendation: Compass,
  system: Info
};

const NOTIF_COLORS = {
  booking: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  reminder: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  coupon: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  recommendation: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  system: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800'
};

const NotificationCenter = ({ 
  notifications = [], 
  onMarkRead, 
  onMarkAllRead, 
  onDelete, 
  onDeleteAll 
}) => {
  const [filterType, setFilterType] = useState('All');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'All') return true;
    if (filterType === 'Unread') return !n.read;
    return n.type === filterType.toLowerCase();
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header and Bulk Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Notification Center
            </h3>
            {unreadCount > 0 && (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Real-time updates regarding reservations, weather forecasts, and promo bonuses.
          </p>
        </div>

        {/* Global actions: Mark All Read & Clear All */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Mark All Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onDeleteAll}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        {['All', 'Unread', 'Booking', 'Reminder', 'Coupon', 'System'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === type
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          <AnimatePresence>
            {filteredNotifs.map((n) => {
              const Icon = NOTIF_ICONS[n.type] || Bell;
              const colorStyle = NOTIF_COLORS[n.type] || 'text-slate-600 bg-slate-100';

              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    n.read
                      ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80'
                      : 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${colorStyle}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                          {n.title}
                        </h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        )}
                        <span className="text-[10px] text-slate-400 font-medium">
                          • {n.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#475569] dark:text-slate-300">
                        {n.message}
                      </p>

                      {n.link && (
                        <Link
                          to={n.link}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Actions: Mark Read and Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    {!n.read && (
                      <button
                        type="button"
                        onClick={() => onMarkRead && onMarkRead(n.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDelete && onDelete(n.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto opacity-40" />
            <p className="font-bold text-sm text-slate-600 dark:text-slate-300">
              No notifications in this category
            </p>
            <p className="text-xs text-slate-400">
              You are completely caught up with your expeditions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
