import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Gift, 
  ArrowRight, 
  Check, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Percent,
  CheckCircle2
} from 'lucide-react';
import { communityService } from '../../services/communityService';

const TIERS = [
  { name: 'Bronze', min: 0, max: 999, color: 'from-amber-700 to-amber-900', badge: 'bg-amber-700/10 text-amber-800' },
  { name: 'Silver', min: 1000, max: 2499, color: 'from-slate-400 to-slate-600', badge: 'bg-slate-500/10 text-slate-700' },
  { name: 'Gold', min: 2500, max: 4999, color: 'from-amber-400 to-yellow-600', badge: 'bg-amber-400/10 text-amber-700' },
  { name: 'Platinum', min: 5000, max: 99999, color: 'from-cyan-500 to-blue-600', badge: 'bg-cyan-500/10 text-cyan-700' }
];

const LoyaltyDashboard = () => {
  const [loyalty, setLoyalty] = useState(() => communityService.getLoyaltyData());
  const [redeemSuccess, setRedeemSuccess] = useState('');

  const currentTier = TIERS.find((t) => t.name === loyalty.tier) || TIERS[1];
  const progressPercent = Math.min(
    100,
    Math.round(((loyalty.points - currentTier.min) / (loyalty.nextTierPoints - currentTier.min)) * 100)
  );

  const handleRedeem = (coupon) => {
    const res = communityService.redeemPoints(coupon.cost, coupon.code);
    if (res.success) {
      setLoyalty(res.updated);
      setRedeemSuccess(`Successfully unlocked ${coupon.title}! Promo code: ${coupon.code}`);
      setTimeout(() => setRedeemSuccess(''), 4000);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Tier & Points Overview Hero */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
                Adventure Points Loyalty Program
              </span>
              <span className="text-xs text-slate-400">• Tier: {loyalty.tier}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">
                {loyalty.points?.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-bold text-emerald-400">Available Points</span>
            </div>
            <p className="text-xs text-slate-300 max-w-md">
              Earn 100 points for every ₹1,000 spent on bookings, +150 for verified photo reviews, and +500 for friend referrals.
            </p>
          </div>

          {/* Tier Badge Widget */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 min-w-[220px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Level Progression</span>
              <span className="font-black text-emerald-400">{loyalty.tier} Explorer</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              />
            </div>

            <p className="text-[10px] text-slate-400 text-right">
              {loyalty.nextTierPoints - loyalty.points} pts to next rank
            </p>
          </div>
        </div>
      </div>

      {/* Redeem Success Toast */}
      {redeemSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{redeemSuccess}</span>
        </div>
      )}

      {/* Rewards Redeem Catalog */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-emerald-500" />
            <span>Redeem Points for Expedition Discounts</span>
          </h4>
          <span className="text-[11px] text-slate-400">Instant promo code generation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loyalty.availableCoupons?.map((coupon) => {
            const canAfford = loyalty.points >= coupon.cost;
            return (
              <div
                key={coupon.code}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {coupon.cost} Points
                  </span>
                  <h5 className="font-extrabold text-base text-slate-900 dark:text-white mt-2">
                    {coupon.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Apply code <code className="font-bold text-slate-800 dark:text-slate-200">{coupon.code}</code> at booking checkout.
                  </p>
                </div>

                <button
                  onClick={() => handleRedeem(coupon)}
                  disabled={!canAfford}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    canAfford
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Percent className="w-3.5 h-3.5" />
                  <span>{canAfford ? 'Redeem Discount' : 'Need More Points'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points Ledger / History */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Points Transaction History</span>
        </h4>

        <div className="space-y-2">
          {loyalty.history?.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-[10px] text-slate-400">{item.date}</p>
              </div>
              <span
                className={`font-black text-sm ${
                  item.points > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                }`}
              >
                {item.points > 0 ? `+${item.points}` : item.points} Pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboard;
