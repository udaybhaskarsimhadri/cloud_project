import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Mountain, 
  CheckCircle2, 
  TicketCheck, 
  TrendingUp, 
  IndianRupee, 
  Star, 
  Clock, 
  XCircle,
  ArrowUpRight
} from 'lucide-react';

const AdminStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      id: 'total-users',
      title: 'Total Users',
      value: stats.totalUsers,
      sub: '+14% this month',
      subColor: 'text-emerald-600 dark:text-emerald-400',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      bgGlow: 'bg-blue-500/10'
    },
    {
      id: 'total-organizers',
      title: 'Total Organizers',
      value: stats.totalOrganizers,
      sub: '5 verified hosts',
      subColor: 'text-purple-600 dark:text-purple-400',
      icon: Building2,
      color: 'from-purple-600 to-pink-600',
      bgGlow: 'bg-purple-500/10'
    },
    {
      id: 'total-adventures',
      title: 'Total Adventures',
      value: stats.totalAdventures,
      sub: `${stats.activeAdventures} active on catalog`,
      subColor: 'text-blue-600 dark:text-blue-400',
      icon: Mountain,
      color: 'from-teal-600 to-emerald-600',
      bgGlow: 'bg-teal-500/10'
    },
    {
      id: 'active-adventures',
      title: 'Active Adventures',
      value: stats.activeAdventures,
      sub: 'Approved & bookable',
      subColor: 'text-emerald-600 dark:text-emerald-400',
      icon: CheckCircle2,
      color: 'from-emerald-600 to-green-600',
      bgGlow: 'bg-emerald-500/10'
    },
    {
      id: 'total-bookings',
      title: 'Total Bookings',
      value: stats.totalBookings,
      sub: '+22.4% vs last period',
      subColor: 'text-blue-600 dark:text-blue-400',
      icon: TicketCheck,
      color: 'from-cyan-600 to-blue-600',
      bgGlow: 'bg-cyan-500/10'
    },
    {
      id: 'monthly-revenue',
      title: 'Gross Volume (₹)',
      value: `₹${(stats.monthlyRevenue || 0).toLocaleString('en-IN')}`,
      sub: 'Total customer bookings',
      subColor: 'text-emerald-600 dark:text-emerald-400',
      icon: IndianRupee,
      color: 'from-emerald-600 to-teal-700',
      bgGlow: 'bg-emerald-500/10'
    },
    {
      id: 'platform-revenue',
      title: 'Platform Revenue (₹)',
      value: `₹${(stats.platformRevenue || 0).toLocaleString('en-IN')}`,
      sub: `${stats.commissionPct}% commission take`,
      subColor: 'text-purple-600 dark:text-purple-400',
      icon: TrendingUp,
      color: 'from-indigo-600 to-purple-600',
      bgGlow: 'bg-indigo-500/10'
    },
    {
      id: 'average-rating',
      title: 'Average Rating',
      value: `${stats.averageRating} ★`,
      sub: 'Across all verified trips',
      subColor: 'text-amber-600 dark:text-amber-400',
      icon: Star,
      color: 'from-amber-500 to-orange-500',
      bgGlow: 'bg-amber-500/10'
    },
    {
      id: 'pending-approvals',
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      sub: 'Awaiting moderation',
      subColor: 'text-amber-600 dark:text-amber-400',
      icon: Clock,
      color: 'from-amber-600 to-red-600',
      bgGlow: 'bg-amber-500/10'
    },
    {
      id: 'cancelled-trips',
      title: 'Cancelled Trips',
      value: stats.cancelledTrips,
      sub: 'Refunds recorded',
      subColor: 'text-rose-600 dark:text-rose-400',
      icon: XCircle,
      color: 'from-rose-600 to-pink-600',
      bgGlow: 'bg-rose-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
      {statCards.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
                {item.title}
              </span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.value}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <span className={item.subColor}>{item.sub}</span>
              </div>
            </div>

            {/* Subtle corner highlight */}
            <div className={`absolute -right-6 -bottom-6 w-16 h-16 rounded-full ${item.bgGlow} blur-xl group-hover:scale-150 transition-transform duration-300 pointer-events-none`} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdminStats;
