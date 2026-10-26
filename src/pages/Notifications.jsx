import React, { useState, useEffect } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import NotificationCenter from '../components/dashboard/NotificationCenter';
import SmartNotificationCenter from '../components/community/NotificationCenter';
import { dashboardService } from '../services/dashboardService';
import { Bell, CheckCircle2, Sparkles, SlidersHorizontal, ListFilter } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [viewMode, setViewMode] = useState('smart'); // 'smart' | 'standard'
  const [toast, setToast] = useState('');

  const loadNotifications = () => {
    const list = dashboardService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = (id) => {
    const updated = dashboardService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = () => {
    const updated = dashboardService.markAllAsRead();
    setNotifications(updated);
    setToast('All notifications marked as read.');
    setTimeout(() => setToast(''), 2500);
  };

  const handleDelete = (id) => {
    const updated = dashboardService.deleteNotification(id);
    setNotifications(updated);
  };

  const handleDeleteAll = () => {
    dashboardService.clearAllNotifications();
    setNotifications([]);
    setToast('All notifications cleared.');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <DashboardNav activeTab="notifications" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
                Expedition Notifications
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400">
              Real-time alerts regarding reservations, organizer replies, review likes, and safety advisories.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setViewMode('smart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'smart'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Center</span>
            </button>
            <button
              onClick={() => setViewMode('standard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'standard'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Standard</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="p-4 rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{toast}</span>
          </div>
        )}

        {viewMode === 'smart' ? (
          <SmartNotificationCenter />
        ) : (
          <NotificationCenter
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
