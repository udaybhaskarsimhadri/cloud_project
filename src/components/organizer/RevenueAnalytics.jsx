import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Coins, 
  BarChart3, 
  PieChart, 
  Award, 
  ArrowUpRight, 
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

const RevenueAnalytics = ({ revenueData }) => {
  const [activeMetric, setActiveMetric] = useState('revenue'); // 'revenue' | 'bookings'
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!revenueData) return null;

  const maxRevenue = Math.max(...revenueData.monthlyRevenue.map((m) => m.revenue), 100000);
  const maxBookings = Math.max(...revenueData.monthlyRevenue.map((m) => m.bookings), 20);

  return (
    <div className="space-y-6">
      {/* Top Total Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">
            Total Net Earnings
          </span>
          <p className="text-3xl sm:text-4xl font-black">
            ₹{revenueData.totalEarnings.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-100 block">
            Direct partner payout processed to bank
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">
            Active Month Revenue
          </span>
          <p className="text-3xl font-black text-[#0F172A] dark:text-white">
            ₹{(revenueData.monthlyRevenue[revenueData.monthlyRevenue.length - 1]?.revenue || 83000).toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-600 font-bold block">
            +18.4% vs last month
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs uppercase font-bold text-slate-400">
            Total Bookings Handled
          </span>
          <p className="text-3xl font-black text-[#0F172A] dark:text-white">
            {revenueData.monthlyRevenue.reduce((s, m) => s + m.bookings, 0)}
          </p>
          <span className="text-[11px] text-blue-600 font-bold block">
            Across 4 active adventure routes
          </span>
        </div>
      </div>

      {/* Main Revenue Bar Chart */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
              Revenue Growth & Booking Volume
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Monthly partner gross earnings and customer reservation counts.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveMetric('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeMetric === 'revenue'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Revenue (₹)
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('bookings')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeMetric === 'bookings'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Bookings Count
            </button>
          </div>
        </div>

        {/* Animated Bar Chart */}
        <div className="h-48 sm:h-52 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          {revenueData.monthlyRevenue.map((item, idx) => {
            const heightPercent = 
              activeMetric === 'revenue'
                ? Math.max(15, Math.round((item.revenue / maxRevenue) * 100))
                : Math.max(15, Math.round((item.bookings / maxBookings) * 100));

            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.month}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-lg whitespace-nowrap z-20 pointer-events-none">
                    {activeMetric === 'revenue'
                      ? `₹${item.revenue.toLocaleString('en-IN')}`
                      : `${item.bookings} Bookings`} ({item.month})
                  </div>
                )}

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                    activeMetric === 'revenue'
                      ? isHovered
                        ? 'bg-emerald-700 shadow-md scale-105'
                        : 'bg-gradient-to-t from-emerald-600 to-teal-500'
                      : isHovered
                      ? 'bg-blue-700 shadow-md scale-105'
                      : 'bg-gradient-to-t from-blue-600 to-indigo-500'
                  }`}
                />
                <span className="text-[11px] font-bold text-slate-500 mt-2">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Row: Revenue by Category & Top Performing Adventures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Revenue by Category */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
              Revenue by Activity Category
            </h4>
            <span className="text-xs text-slate-400">Share Ratio</span>
          </div>

          <div className="space-y-3">
            {revenueData.revenueByCategory.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#1E293B] dark:text-slate-200">{cat.category}</span>
                  <span className="text-slate-500">₹{cat.amount.toLocaleString('en-IN')} ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Adventures */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
              Top Performing Adventures
            </h4>
            <span className="text-xs text-slate-400">Lifetime Revenue</span>
          </div>

          <div className="space-y-2.5">
            {revenueData.topPerformingAdventures.map((adv, idx) => (
              <div
                key={adv.name}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <span className="font-extrabold text-[#0F172A] dark:text-white block truncate">
                    {idx + 1}. {adv.name}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {adv.bookings} Bookings • {adv.rating} ★
                  </span>
                </div>

                <span className="font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                  ₹{adv.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
          Recent Settlement Transactions
        </h4>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Adventure</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {revenueData.recentTransactions.map((tx) => (
                <tr key={tx.txId} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{tx.txId}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{tx.date}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{tx.customer}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-[180px] truncate">{tx.adventure}</td>
                  <td className="py-3.5 px-4 text-slate-500">{tx.method}</td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600">₹{tx.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tx.status === 'Settled'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
