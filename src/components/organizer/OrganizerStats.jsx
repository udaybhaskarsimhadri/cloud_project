import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  CheckCircle2, 
  TicketCheck, 
  Calendar, 
  TrendingUp, 
  Coins, 
  Star, 
  HeartHandshake,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OrganizerStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      id: 'total-adv',
      label: 'Total Adventures',
      value: stats.totalAdventures,
      subtext: 'Catalog expeditions',
      icon: Mountain,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-800/60',
      link: '/organizer/adventures'
    },
    {
      id: 'active-adv',
      label: 'Active Adventures',
      value: stats.activeAdventures,
      subtext: 'Published on marketplace',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60',
      link: '/organizer/adventures'
    },
    {
      id: 'total-bookings',
      label: 'Total Bookings',
      value: stats.totalBookings,
      subtext: 'Customer reservations',
      icon: TicketCheck,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-800/60',
      link: '/organizer/bookings'
    },
    {
      id: 'upcoming-tours',
      label: 'Upcoming Tours',
      value: stats.upcomingTours,
      subtext: 'Scheduled departures',
      icon: Calendar,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60',
      link: '/organizer/calendar'
    },
    {
      id: 'monthly-rev',
      label: 'Monthly Revenue',
      value: `₹${stats.monthlyRevenue.toLocaleString('en-IN')}`,
      subtext: 'Current 30-day window',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
      link: '/organizer/revenue'
    },
    {
      id: 'total-earnings',
      label: 'Total Earnings',
      value: `₹${stats.totalEarnings.toLocaleString('en-IN')}`,
      subtext: 'Lifetime partner payout',
      icon: Coins,
      color: 'from-cyan-600 to-blue-600',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200/80 dark:border-cyan-800/60',
      link: '/organizer/revenue'
    },
    {
      id: 'avg-rating',
      label: 'Average Rating',
      value: `${stats.averageRating} ★`,
      subtext: 'From verified reviews',
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      textColor: 'text-amber-500 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60',
      link: '/organizer/reviews'
    },
    {
      id: 'satisfaction',
      label: 'Customer Satisfaction',
      value: `${stats.customerSatisfaction}%`,
      subtext: 'Recommendation index',
      icon: HeartHandshake,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      bgLight: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/60',
      link: '/organizer/reviews'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className="p-5 rounded-3xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 relative overflow-hidden group"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.bgLight} shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <Link
                to={card.link}
                className="p-1.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="View details"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                {card.label}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight mt-1 truncate">
                {card.value}
              </p>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 block">
                {card.subtext}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrganizerStats;
