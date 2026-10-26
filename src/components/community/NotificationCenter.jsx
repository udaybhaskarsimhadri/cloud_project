import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  MessageSquare, 
  Heart, 
  Sparkles, 
  Tag, 
  ShieldAlert, 
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { communityService } from '../../services/communityService';

const TYPE_ICONS = {
  booking_confirmed: { icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
  booking_cancelled: { icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10' },
  organizer_replied: { icon: MessageSquare, color: 'text-blue-500 bg-blue-500/10' },
  review_liked: { icon: Heart, color: 'text-pink-500 bg-pink-500/10' },
  coupon_received: { icon: Tag, color: 'text-amber-500 bg-amber-500/10' },
  ai_recommendation: { icon: Sparkles, color: 'text-purple-500 bg-purple-500/10' },
  admin_announcement: { icon: Bell, color: 'text-indigo-500 bg-indigo-500/10' }
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(() => communityService.getNotifications());
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Bookings' | 'Social' | 'System'

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkRead = (id) => {
    const updated = communityService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = () => {
    const updated = communityService.markAllAsRead();
    setNotifications(updated);
  };

  const handleDelete = (id) => {
    const updated = communityService.deleteNotification(id);
    setNotifications(updated);
  };

  const handleClearAll = () => {
    const updated = communityService.clearAllNotifications();
    setNotifications(updated);
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'Bookings') return n.type.includes('booking');
    if (activeFilter === 'Social') return n.type.includes('replied') || n.type.includes('liked');
    if (activeFilter === 'System') return n.type.includes('coupon') || n.type.includes('ai') || n.type.includes('announcement');
    return true;
  });

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header with Unread Badge & Actions */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              Smart Notification Center
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {unreadCount} unread expedition updates, replies, and community alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark All as Read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
              title="Clear All Notifications"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold max-w-sm">
        {['All', 'Bookings', 'Social', 'System'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              activeFilter === tab
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="font-bold">No notifications to display</p>
            <p className="text-[11px]">You are all caught up with your expeditions and social feeds!</p>
          </div>
        ) : (
          filtered.map((item) => {
            const conf = TYPE_ICONS[item.type] || TYPE_ICONS.admin_announcement;
            const Icon = conf.icon;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border transition-all flex items-start justify-between gap-3 ${
                  item.unread
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${conf.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h4>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                      <span>{item.timestamp}</span>
                      {item.link && (
                        <Link
                          to={item.link}
                          className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.unread && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500"
                      title="Mark as Read"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500"
                    title="Delete Notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
