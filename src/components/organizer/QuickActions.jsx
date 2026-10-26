import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  TicketCheck, 
  Calendar, 
  TrendingUp, 
  Star, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = ({ onCreateAdventure }) => {
  const actions = [
    {
      id: 'create-adv',
      title: 'Create Adventure',
      description: 'Publish a new high-altitude trek, rafting, or glide slot.',
      icon: PlusCircle,
      link: '/organizer/adventures?action=new',
      color: 'from-emerald-600 to-teal-600',
      badge: 'New'
    },
    {
      id: 'manage-bookings',
      title: 'Manage Bookings',
      description: 'Review and approve customer reservations & rosters.',
      icon: TicketCheck,
      link: '/organizer/bookings',
      color: 'from-blue-600 to-indigo-600',
      badge: null
    },
    {
      id: 'calendar-schedule',
      title: 'Expedition Calendar',
      description: 'Check monthly departure dates and capacity markers.',
      icon: Calendar,
      link: '/organizer/calendar',
      color: 'from-purple-500 to-violet-600',
      badge: null
    },
    {
      id: 'revenue-reports',
      title: 'Revenue Analytics',
      description: 'Track partner payouts, commissions and sales trends.',
      icon: TrendingUp,
      link: '/organizer/revenue',
      color: 'from-emerald-500 to-teal-700',
      badge: '₹ INR'
    },
    {
      id: 'reviews-feedback',
      title: 'Customer Reviews',
      description: 'Read reviews and post official host responses.',
      icon: Star,
      link: '/organizer/reviews',
      color: 'from-amber-500 to-orange-600',
      badge: '4.95 ★'
    }
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
            Partner Quick Actions
          </h3>
        </div>
        <span className="text-xs font-bold text-slate-400">Host Shortcuts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.id}
              to={act.link}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {act.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {act.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white group-hover:text-emerald-600 transition-colors">
                  {act.title}
                </h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400 mt-1 line-clamp-2">
                  {act.description}
                </p>
              </div>

              <div className="mt-3 pt-2 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
