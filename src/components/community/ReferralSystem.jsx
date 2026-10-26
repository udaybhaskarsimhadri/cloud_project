import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Copy, 
  Check, 
  Sparkles, 
  Gift, 
  Share2, 
  TrendingUp, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { communityService } from '../../services/communityService';

const ReferralSystem = () => {
  const [referral, setReferral] = useState(() => communityService.getReferralData());
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referral.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referral.inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
            AdventureX Ambassador Club
          </span>
        </div>

        <div className="max-w-xl space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black">
            Invite Friends & Earn ₹500 in Adventure Points
          </h3>
          <p className="text-xs text-slate-300">
            Share your unique invite link with fellow trekkers and outdoor lovers. When they complete their first expedition, both of you earn 500 Adventure Points!
          </p>
        </div>

        {/* Code & Link Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Your Referral Code</span>
              <p className="font-mono font-black text-lg text-emerald-400">{referral.referralCode}</p>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Direct Invite Link</span>
              <p className="text-xs text-slate-200 truncate font-mono mt-0.5">{referral.inviteLink}</p>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">Total Friends Invited</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {referral.invitedUsers}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">Joined via your link</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">Successful Expeditions</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {referral.successfulReferrals}
          </p>
          <span className="text-[11px] text-slate-500">Completed trips</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400">Total Bonus Earned</span>
          <p className="text-3xl font-black text-amber-500">
            +{referral.bonusPointsEarned}
          </p>
          <span className="text-[11px] text-slate-500">Adventure Points</span>
        </div>
      </div>

      {/* Referral Activity List */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
          <Users className="w-4 h-4 text-emerald-500" />
          <span>Your Referred Friends Status</span>
        </h4>

        <div className="space-y-2">
          {referral.referralList?.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-[10px] text-slate-400">Joined on {item.date}</p>
              </div>

              <div className="text-right">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'Booked Trip'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  {item.status}
                </span>
                <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 mt-0.5">{item.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;
