import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Tag, 
  Share2, 
  Copy, 
  Check, 
  ChevronRight, 
  Lock, 
  Mountain, 
  Waves, 
  Moon,
  Gift
} from 'lucide-react';

const BADGE_ICONS = {
  Mountain: Mountain,
  Waves: Waves,
  Moon: Moon,
  Award: Award
};

const RewardCard = ({ rewards }) => {
  const [copied, setCopied] = useState(false);

  if (!rewards) return null;

  const progressPercent = Math.min(
    100,
    Math.round((rewards.currentTierPoints / rewards.nextTierPoints) * 100)
  );

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rewards.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top Banner: Level & Points */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/60">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Current Level Tier
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
                Tier 3 of 5
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
              {rewards.level}
            </h3>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              You earn 10 XP for every ₹100 spent on expeditions.
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-2 md:text-right">
          <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
            {rewards.points.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Reward XP
          </span>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Progress to Next Tier ({rewards.nextLevel})</span>
          </span>
          <span className="text-amber-600 dark:text-amber-400">
            {rewards.currentTierPoints.toLocaleString('en-IN')} / {rewards.nextTierPoints.toLocaleString('en-IN')} XP ({progressPercent}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Current: {rewards.level}</span>
          <span>Next: Unlock 20% Alpine gear rental credits at {rewards.nextTierPoints} XP</span>
        </div>
      </div>

      {/* Achievement Badges Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
            Achievement Badges ({rewards.achievementBadges.filter((b) => b.unlocked).length}/{rewards.achievementBadges.length})
          </h4>
          <span className="text-xs text-slate-400">Unlock by conquering trails</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {rewards.achievementBadges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon] || Award;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  badge.unlocked
                    ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/50'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    badge.unlocked
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Unlocked
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                <h5 className="font-extrabold text-xs sm:text-sm text-[#0F172A] dark:text-white leading-tight">
                  {badge.title}
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {badge.description}
                </p>
                {badge.earnedDate && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-2 block">
                    Earned: {badge.earnedDate}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral & Coupons Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Referral Bonus Card */}
        <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
              Referral Bonus Earned
            </span>
            <p className="font-extrabold text-sm text-[#0F172A] dark:text-white">
              Give ₹500, Get ₹500 in Expedition Credits
            </p>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block">
              Share your code: <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded font-mono">{rewards.referralCode}</code>
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Coupons Earned Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
              Coupons Earned & Active
            </span>
            <p className="font-extrabold text-sm text-[#0F172A] dark:text-white">
              3 Discounts Ready at Checkout
            </p>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">
              WELCOME10 (10%), STUDENT15 (15%), FAMILY20 (20%)
            </span>
          </div>

          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            <Tag className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
