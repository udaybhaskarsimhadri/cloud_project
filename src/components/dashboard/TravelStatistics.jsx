import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  MapPin, 
  Award, 
  Mountain, 
  Coins,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarCheck2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelStatistics = ({ stats }) => {
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' | 'spending'
  const [hoveredMonth, setHoveredMonth] = useState(null);

  // If no data exists, show beautiful empty state instead of errors!
  if (!stats || !stats.hasData || stats.totalBookings === 0) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
            No Travel Statistics Yet
          </h4>
          <p className="text-xs text-[#475569] dark:text-slate-400 max-w-sm mx-auto">
            Book your first Himalayan trek or rafting expedition to generate your personal travel analytics and charts.
          </p>
        </div>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
        >
          <span>Explore Adventures</span>
        </Link>
      </div>
    );
  }

  const maxTrips = Math.max(...(stats.tripsPerMonth?.map((m) => m.trips) || [1]), 2);
  const maxSpend = Math.max(...(stats.moneySpent?.map((m) => m.amount) || [10000]), 10000);
  const uvCount = stats.upcomingVsCompleted || { upcoming: 0, completed: 0, cancelled: 0 };
  const totalStatusTrips = Math.max(1, uvCount.upcoming + uvCount.completed + uvCount.cancelled);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Travel Statistics & Analytics
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Generated directly from your local booking records.
          </p>
        </div>

        {/* Chart View Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('monthly')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Trips Per Month
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('spending')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'spending'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Money Spent (₹)
          </button>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {activeTab === 'monthly' ? 'Monthly Expedition Volume' : 'Monthly Expedition Spend (INR)'}
          </span>
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
            {activeTab === 'monthly' 
              ? `Total: ${stats.totalBookings} Expeditions` 
              : `Total: ₹${(stats.totalSpend || 0).toLocaleString('en-IN')}`}
          </span>
        </div>

        {/* Animated Bar Visualizer */}
        <div className="h-48 sm:h-52 flex items-end justify-between gap-1 sm:gap-3 pt-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          {activeTab === 'monthly' ? (
            stats.tripsPerMonth.map((item, idx) => {
              const heightPercent = item.trips > 0 ? Math.max(15, Math.round((item.trips / maxTrips) * 100)) : 8;
              const isHovered = hoveredMonth === item.month;

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {isHovered && (
                    <div className="absolute -top-10 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-20 pointer-events-none">
                      {item.trips} {item.trips === 1 ? 'Trip' : 'Trips'} ({item.month})
                    </div>
                  )}

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.02 }}
                    className={`w-full max-w-[32px] rounded-t-xl transition-all duration-200 ${
                      item.trips > 0
                        ? isHovered
                          ? 'bg-blue-700 shadow-md scale-105'
                          : 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700/60'
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })
          ) : (
            stats.moneySpent.map((item, idx) => {
              const heightPercent = item.amount > 0 ? Math.max(15, Math.round((item.amount / maxSpend) * 100)) : 8;
              const isHovered = hoveredMonth === item.month;

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {isHovered && (
                    <div className="absolute -top-10 px-2.5 py-1 rounded-lg bg-emerald-950 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-20 pointer-events-none">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </div>
                  )}

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.03 }}
                    className={`w-full max-w-[40px] rounded-t-xl transition-all duration-200 ${
                      item.amount > 0
                        ? isHovered
                          ? 'bg-emerald-700 shadow-md scale-105'
                          : 'bg-gradient-to-t from-emerald-600 to-teal-500 shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700/60'
                    }`}
                  />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Secondary Analytics Row: Favorite Category & Upcoming vs Completed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Favorite Adventure Category */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                Favorite Adventure Category
              </h4>
            </div>
            <span className="text-[11px] font-bold text-slate-400">Activity Share</span>
          </div>

          <div className="space-y-3">
            {stats.favoriteTypes?.map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#1E293B] dark:text-slate-200">
                    {item.type} ({item.count} {item.count === 1 ? 'expedition' : 'expeditions'})
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming vs Completed vs Cancelled */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                Upcoming vs Completed Trips
              </h4>
            </div>
            <span className="text-[11px] font-bold text-slate-400">Status Ratio</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-center">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">Upcoming</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">{uvCount.upcoming}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 block">Completed</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">{uvCount.completed}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-center">
              <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 block">Cancelled</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">{uvCount.cancelled}</span>
            </div>
          </div>

          {/* Visual Ratio Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>Status Distribution</span>
              <span>{Math.round(((uvCount.upcoming + uvCount.completed) / totalStatusTrips) * 100)}% Active Ratio</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
              <div 
                className="bg-blue-600 h-full"
                style={{ width: `${(uvCount.upcoming / totalStatusTrips) * 100}%` }}
                title={`Upcoming: ${uvCount.upcoming}`}
              />
              <div 
                className="bg-emerald-500 h-full"
                style={{ width: `${(uvCount.completed / totalStatusTrips) * 100}%` }}
                title={`Completed: ${uvCount.completed}`}
              />
              <div 
                className="bg-rose-500 h-full"
                style={{ width: `${(uvCount.cancelled / totalStatusTrips) * 100}%` }}
                title={`Cancelled: ${uvCount.cancelled}`}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TravelStatistics;
