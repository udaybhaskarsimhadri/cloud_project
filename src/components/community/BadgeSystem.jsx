import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Compass, 
  Mountain, 
  Tent, 
  Star, 
  Crown, 
  Lock, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { communityService } from '../../services/communityService';

const ICON_MAP = {
  Compass,
  Mountain,
  Tent,
  Star,
  Award,
  Crown
};

const RARITY_COLORS = {
  Common: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200',
  Rare: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Epic: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  Legendary: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
};

const BadgeSystem = () => {
  const badges = communityService.getBadges();
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              Expedition Badges & Honors
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Earn certified badges by conquering mountain passes, reviewing trails, and guiding fellow trekkers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-2xl font-black text-xs">
          <Sparkles className="w-4 h-4" />
          <span>{earnedCount} of {badges.length} Unlocked</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const Icon = ICON_MAP[badge.icon] || Award;
          const rarityStyle = RARITY_COLORS[badge.rarity] || RARITY_COLORS.Common;

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                badge.earned
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-70'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    badge.earned
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-500/20 border-amber-400'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {badge.earned ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {badge.name}
                    </h4>
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border mt-1 ${rarityStyle}`}
                  >
                    {badge.rarity}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Footer: Earned Date or Progress Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                {badge.earned ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Unlocked in {badge.earnedDate}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>Progress</span>
                      <span>
                        {badge.progress} / {badge.totalRequired}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${Math.min(100, Math.round((badge.progress / badge.totalRequired) * 100))}%`
                        }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeSystem;
