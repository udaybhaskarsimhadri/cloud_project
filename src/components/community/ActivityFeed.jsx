import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Ticket, 
  Star, 
  Award, 
  UserPlus, 
  Compass, 
  Clock 
} from 'lucide-react';
import { communityService } from '../../services/communityService';

const TYPE_ICONS = {
  booking: { icon: Ticket, color: 'text-emerald-500 bg-emerald-500/10' },
  review: { icon: Star, color: 'text-amber-500 bg-amber-500/10' },
  badge: { icon: Award, color: 'text-purple-500 bg-purple-500/10' },
  follow: { icon: UserPlus, color: 'text-blue-500 bg-blue-500/10' },
  adventure: { icon: Compass, color: 'text-teal-500 bg-teal-500/10' }
};

const ActivityFeed = () => {
  const activities = communityService.getActivityFeed();

  return (
    <div className="space-y-4 text-slate-800 dark:text-slate-100">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Live Expedition Pulse
          </h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full animate-pulse">
          Live Feed
        </span>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => {
          const conf = TYPE_ICONS[act.type] || TYPE_ICONS.booking;
          const Icon = conf.icon;

          return (
            <div
              key={act.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${conf.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-slate-800 dark:text-slate-200 truncate">
                    <span className="font-bold text-slate-900 dark:text-white">{act.user}</span>{' '}
                    <span className="text-slate-500 dark:text-slate-400">{act.action}</span>{' '}
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{act.target}</span>
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
