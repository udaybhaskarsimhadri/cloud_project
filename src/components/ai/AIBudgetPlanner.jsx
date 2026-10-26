import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IndianRupee, 
  Sparkles, 
  PieChart, 
  ShieldAlert, 
  ArrowRight, 
  ExternalLink,
  Users,
  Calendar,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';

const BUDGET_PRESETS = [15000, 25000, 50000, 80000, 120000];

const AIBudgetPlanner = () => {
  const [totalBudget, setTotalBudget] = useState(30000);
  const [travelers, setTravelers] = useState(2);
  const [duration, setDuration] = useState(5);

  const budgetData = aiService.calculateBudgetPlan(totalBudget, travelers, duration);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-emerald-500/10 border border-blue-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Expedition Budget Optimizer</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Enter your target adventure fund in ₹ INR. Our AI calculates a realistic expense distribution across permits, travel, mountain lodging, food, gear, and safety reserves.
        </p>
      </div>

      {/* Interactive Budget Form */}
      <div className="space-y-4 text-xs">
        {/* Total Budget Input */}
        <div>
          <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
            Total Available Budget (₹ INR)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 font-bold text-slate-400">₹</span>
            <input
              type="number"
              step="1000"
              min="5000"
              max="500000"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-100 font-bold text-sm"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {BUDGET_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTotalBudget(preset)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  totalBudget === preset
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ₹{preset.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Travelers & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Travelers
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Solo Adventurer' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Expedition Duration
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
              >
                {[3, 4, 5, 6, 7, 10, 14].map((d) => (
                  <option key={d} value={d}>
                    {d} Days
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Summary Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>AI Per-Person Fund</span>
          <span>{duration} Days • {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}</span>
        </div>
        <div className="text-2xl font-black text-emerald-400">
          ₹{budgetData.perPerson?.toLocaleString('en-IN')}
          <span className="text-xs font-normal text-slate-400 ml-1.5">/ person</span>
        </div>
        <div className="text-[11px] text-slate-300">
          Grand Total: <span className="font-bold text-white">₹{budgetData.totalBudget?.toLocaleString('en-IN')}</span> across all participants.
        </div>
      </div>

      {/* Expense Allocation Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <span>Calculated Category Allocations</span>
          <span className="text-[10px] text-slate-400">100% Accounted</span>
        </div>

        {/* Visual Progress Stacked Bar */}
        <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div style={{ width: '38%' }} className="bg-emerald-500" title="Adventure: 38%" />
          <div style={{ width: '22%' }} className="bg-blue-500" title="Travel: 22%" />
          <div style={{ width: '18%' }} className="bg-teal-500" title="Accommodation: 18%" />
          <div style={{ width: '10%' }} className="bg-amber-500" title="Food: 10%" />
          <div style={{ width: '6%' }} className="bg-purple-500" title="Equipment: 6%" />
          <div style={{ width: '6%' }} className="bg-rose-500" title="Emergency: 6%" />
        </div>

        {/* Detailed Itemized Rows */}
        <div className="space-y-2">
          {budgetData.breakdown.map((item) => (
            <div
              key={item.category}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      item.color === 'emerald'
                        ? 'bg-emerald-500'
                        : item.color === 'blue'
                        ? 'bg-blue-500'
                        : item.color === 'teal'
                        ? 'bg-teal-500'
                        : item.color === 'amber'
                        ? 'bg-amber-500'
                        : item.color === 'purple'
                        ? 'bg-purple-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400">({item.percentage}%)</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-slate-900 dark:text-white">
                  ₹{item.amount?.toLocaleString('en-IN')}
                </span>
                <p className="text-[9px] text-slate-400">per person</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Saving & Optimization Tips */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold">
          <Lightbulb className="w-4 h-4 shrink-0" />
          <span>AI Money-Saving Recommendations</span>
        </div>
        <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
          {budgetData.optimizationTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Matched Adventures under this budget */}
      {budgetData.matchedAdventures?.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Adventures Fitting Your Per-Person Budget
          </span>
          <div className="space-y-2">
            {budgetData.matchedAdventures.map((adv) => (
              <div
                key={adv.id}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-bold truncate text-slate-800 dark:text-slate-100">
                    {adv.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {adv.destination} • {adv.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    ₹{adv.price?.toLocaleString('en-IN')}
                  </span>
                  <Link
                    to={`/adventure/${adv.id}`}
                    className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBudgetPlanner;
