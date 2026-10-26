import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Building2, 
  Mountain, 
  TicketCheck, 
  CreditCard, 
  Download,
  AlertCircle
} from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import AdminStats from '../../components/admin/AdminStats';
import GlobalAdminSearch from '../../components/admin/GlobalAdminSearch';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts';
import SystemLogs from '../../components/admin/SystemLogs';
import { adminService } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [adventures, setAdventures] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    try {
      setStats(adminService.getOverviewStats());
      setUsers(adminService.getUsers());
      setOrganizers(adminService.getOrganizers());
      setAdventures(adminService.getAdventures());
      setBookings(adminService.getBookings());
      setLogs(adminService.getLogs());
    } catch (e) {
      console.error('Failed to load admin telemetry:', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      {/* Sticky Admin Sub-Nav */}
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        
        {/* Top Header Banner with Global Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="space-y-2 z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Super Administrator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Platform Command Center
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/80 font-medium">
              Monitor nationwide expeditions, manage verified organizers, audit traveler bookings, and track platform revenue in Indian Rupees (₹).
            </p>
          </div>

          <div className="w-full md:w-auto z-10">
            <GlobalAdminSearch
              users={users}
              organizers={organizers}
              adventures={adventures}
              bookings={bookings}
            />
          </div>

          {/* Decorative ambient background */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 10 Analytics Statistics Cards */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Platform Telemetry & Key Metrics
            </h2>
            <span className="text-xs text-slate-500 font-bold">
              All Financials in INR (₹)
            </span>
          </div>
          <AdminStats stats={stats} />
        </section>

        {/* Analytics Charts & Visualizations */}
        <section>
          <AnalyticsCharts />
        </section>

        {/* Quick Management Short-links */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            to="/admin/users"
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">User Accounts</p>
                <p className="text-[10px] text-slate-500">{users.length} Registered</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/organizers"
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">Organizers</p>
                <p className="text-[10px] text-slate-500">{organizers.length} Partners</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/adventures"
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">Adventures</p>
                <p className="text-[10px] text-slate-500">{adventures.length} Listed</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/admin/bookings"
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 flex items-center justify-center">
                <TicketCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 dark:text-white">Bookings</p>
                <p className="text-[10px] text-slate-500">{bookings.length} Processed</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* System Logs & Telemetry */}
        <section>
          <SystemLogs logs={logs} />
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;
