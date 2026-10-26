import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  TicketCheck, 
  PieChart, 
  Award,
  Layers
} from 'lucide-react';

const AnalyticsCharts = () => {
  const [activeTab, setActiveTab] = useState('revenue'); // 'revenue' | 'users' | 'bookings' | 'categories'

  // Monthly trends for 2026
  const monthlyData = [
    { month: 'May', users: 140, bookings: 35, revenue: 195000, commission: 29250 },
    { month: 'Jun', users: 210, bookings: 58, revenue: 320000, commission: 48000 },
    { month: 'Jul', users: 340, bookings: 84, revenue: 490000, commission: 73500 },
    { month: 'Aug', users: 490, bookings: 110, revenue: 640000, commission: 96000 },
    { month: 'Sep', users: 650, bookings: 145, revenue: 890000, commission: 133500 },
    { month: 'Oct', users: 820, bookings: 184, revenue: 1150000, commission: 172500 },
  ];

  const categories = [
    { name: 'Trekking & Alpine', count: 48, percentage: 42, color: 'bg-blue-500' },
    { name: 'Water Sports & Rafting', count: 28, percentage: 24, color: 'bg-cyan-500' },
    { name: 'Scuba Diving & Marine', count: 18, percentage: 16, color: 'bg-emerald-500' },
    { name: 'Paragliding & Aerial', count: 12, percentage: 11, color: 'bg-amber-500' },
    { name: 'Wilderness Safaris', count: 8, percentage: 7, color: 'bg-purple-500' },
  ];

  const topOrganizers = [
    { name: 'Himalayan Expeditions Team', expeditions: 8, bookings: 184, revenue: 842000, rating: 4.96 },
    { name: 'Western Ghats Alpine Treks', expeditions: 5, bookings: 98, revenue: 412000, rating: 4.88 },
    { name: 'Goa Coastal Watersports & Scuba', expeditions: 4, bookings: 165, revenue: 580000, rating: 4.92 },
    { name: 'Zanskar Winter Trails', expeditions: 3, bookings: 54, revenue: 498000, rating: 4.95 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  const maxUsers = Math.max(...monthlyData.map(d => d.users));
  const maxBookings = Math.max(...monthlyData.map(d => d.bookings));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
      
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span>Platform Analytics & Trends</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Real-time platform performance metrics in Indian Rupees (₹)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('revenue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'revenue'
                ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Revenue (₹)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Users Growth
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Bookings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Main Chart Canvas */}
      {activeTab === 'revenue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Gross Volume vs Platform Commission (₹)</span>
            <span className="text-emerald-600 font-bold">+28.5% YoY Growth</span>
          </div>

          <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.revenue / maxRevenue) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    {/* Hover tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      ₹{d.revenue.toLocaleString('en-IN')} (Fee: ₹{d.commission.toLocaleString('en-IN')})
                    </div>
                    {/* Bar */}
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-full sm:w-10 rounded-2xl bg-gradient-to-t from-purple-700 to-indigo-500 group-hover:from-purple-600 group-hover:to-pink-500 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Total Registered Explorer & Leader Accounts</span>
            <span className="text-blue-600 font-bold">+18.2% monthly run rate</span>
          </div>

          <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.users / maxUsers) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none z-20">
                      {d.users} Users
                    </div>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-full sm:w-10 rounded-2xl bg-gradient-to-t from-blue-700 to-cyan-500 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Completed & Confirmed Expedition Bookings</span>
            <span className="text-cyan-600 font-bold">184 Total This Month</span>
          </div>

          <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
            {monthlyData.map((d) => {
              const heightPct = Math.round((d.bookings / maxBookings) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="relative w-full flex flex-col items-center justify-end h-full">
                    <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none z-20">
                      {d.bookings} Bookings
                    </div>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-full sm:w-10 rounded-2xl bg-gradient-to-t from-teal-700 to-emerald-400 group-hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Distribution list */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Adventure Category Distribution
            </h4>
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>{cat.name}</span>
                  <span>{cat.count} trips ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    style={{ width: `${cat.percentage}%` }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top Organizers Performance Leaderboard */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Top Organizer Performance
            </h4>
            <div className="space-y-2">
              {topOrganizers.map((org, i) => (
                <div key={org.name} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-black text-[10px] flex items-center justify-center">
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-none">{org.name}</p>
                      <p className="text-[10px] text-slate-500">{org.bookings} bookings • {org.rating} ★</p>
                    </div>
                  </div>
                  <span className="font-black text-purple-700 dark:text-purple-300">
                    ₹{org.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AnalyticsCharts;
