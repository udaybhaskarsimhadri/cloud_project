import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck2, 
  Compass, 
  CheckCircle2, 
  Heart, 
  Award, 
  Tag, 
  Coins, 
  MapPin, 
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardStats = ({ summary }) => {
  if (!summary) return null;

  const statCards = [
    {
      id: 'total-bookings',
      label: 'Total Bookings',
      value: summary.totalBookings,
      subtext: 'Lifetime reservations',
      icon: CalendarCheck2,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-800/60',
      link: '/my-bookings'
    },
    {
      id: 'upcoming-trips',
      label: 'Upcoming Trips',
      value: summary.upcomingCount,
      subtext: 'Ready for departure',
      icon: Compass,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-800/60',
      link: '/dashboard#upcoming'
    },
    {
      id: 'completed-adventures',
      label: 'Completed Adventures',
      value: summary.completedCount,
      subtext: 'Peaks & trails conquered',
      icon: CheckCircle2,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgLight: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200/80 dark:border-cyan-800/60',
      link: '/my-bookings'
    },
    {
      id: 'wishlist-count',
      label: 'Saved in Wishlist',
      value: summary.wishlistCount,
      subtext: 'Dream adventures',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      bgLight: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-800/60',
      link: '/wishlist'
    },
    {
      id: 'reward-points',
      label: 'Reward Points',
      value: `${summary.rewardPoints.toLocaleString('en-IN')} XP`,
      subtext: 'Level: Alpine Explorer',
      icon: Award,
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/60',
      link: '/dashboard#rewards'
    },
    {
      id: 'coupons-available',
      label: 'Active Coupons',
      value: summary.couponsAvailable,
      subtext: 'WELCOME10, STUDENT15...',
      icon: Tag,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-800/60',
      link: '/destinations'
    },
    {
      id: 'money-saved',
      label: 'Total Money Saved',
      value: `₹${summary.totalMoneySaved.toLocaleString('en-IN')}`,
      subtext: 'Discounts & perks applied',
      icon: Coins,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgLight: 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
      link: '/my-bookings'
    },
    {
      id: 'fav-destination',
      label: 'Top Destination',
      value: summary.favoriteDestination,
      subtext: 'Most explored region',
      icon: MapPin,
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgLight: 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
      link: '/destinations'
    }
  ];

  return (
    <div className="space-y-6">
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
              className={`p-5 rounded-3xl border bg-white dark:bg-slate-900 shadow-sm transition-all duration-200 relative overflow-hidden group`}
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

      {/* Recent Activity Bar */}
      {summary.recentActivity && summary.recentActivity.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                Recent Platform Activity
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Live Real-Time Feed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {summary.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    {act.action}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {act.time}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#1E293B] dark:text-slate-200 truncate">
                  {act.target}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardStats;
