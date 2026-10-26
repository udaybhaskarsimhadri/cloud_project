import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Map, 
  Heart, 
  User, 
  HelpCircle, 
  CalendarPlus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      id: 'book-adventure',
      title: 'Book Adventure',
      description: 'Reserve your next high-altitude or river rapid trek.',
      icon: CalendarPlus,
      link: '/destinations',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Popular'
    },
    {
      id: 'explore-destinations',
      title: 'Explore Destinations',
      description: 'Browse 30+ destinations across the Himalayas & Coasts.',
      icon: Map,
      link: '/destinations',
      color: 'from-emerald-500 to-teal-600',
      badge: null
    },
    {
      id: 'view-wishlist',
      title: 'View Wishlist',
      description: 'Review your saved dream expeditions and compare.',
      icon: Heart,
      link: '/wishlist',
      color: 'from-rose-500 to-pink-600',
      badge: null
    },
    {
      id: 'edit-profile',
      title: 'Traveler Profile',
      description: 'Update health vitals, emergency contacts & preferences.',
      icon: User,
      link: '/profile',
      color: 'from-amber-500 to-orange-600',
      badge: null
    },
    {
      id: 'support-help',
      title: 'Concierge & Support',
      description: '24×7 expedition dispatch and emergency support.',
      icon: HelpCircle,
      link: '/dashboard#help',
      color: 'from-cyan-500 to-blue-600',
      badge: '24×7'
    }
  ];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
            Quick Explorer Actions
          </h3>
        </div>
        <span className="text-xs font-bold text-slate-400">Shortcut Hub</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.id}
              to={act.link}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {act.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                      {act.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white group-hover:text-blue-600 transition-colors">
                  {act.title}
                </h4>
                <p className="text-[11px] text-[#475569] dark:text-slate-400 mt-1 line-clamp-2">
                  {act.description}
                </p>
              </div>

              <div className="mt-3 pt-2 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Go now</span>
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
