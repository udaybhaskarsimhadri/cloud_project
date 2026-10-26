import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Tag, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';

const SmartSearchHelper = ({ searchQuery = '', onSelectDestination }) => {
  const suggestions = aiService.getSmartSearchSuggestions(searchQuery);

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-50/60 dark:bg-slate-900/60 backdrop-blur-md p-4 space-y-3 text-xs mb-6">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
        <Sparkles className="w-4 h-4" />
        <span>AI Smart Search Alternatives & Suggestions</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Similar Destinations */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Similar Destinations
          </span>
          <div className="space-y-1.5">
            {suggestions.similar?.map((dest) => (
              <button
                key={dest.id}
                onClick={() => onSelectDestination ? onSelectDestination(dest.name) : null}
                className="w-full flex items-center justify-between text-left hover:text-blue-500 text-[11px] font-medium text-slate-700 dark:text-slate-200 group"
              >
                <span className="truncate">{dest.name}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Popular Alternatives */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Popular Alternatives
          </span>
          <div className="space-y-1.5">
            {suggestions.popularAlternatives?.map((adv) => (
              <Link
                key={adv.id}
                to={`/adventure/${adv.id}`}
                className="flex items-center justify-between hover:text-blue-500 text-[11px] font-medium text-slate-700 dark:text-slate-200 group"
              >
                <span className="truncate">{adv.name}</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-1">
                  ₹{adv.price?.toLocaleString('en-IN')}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Budget Alternatives */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Budget Deals (under ₹5,000)
          </span>
          <div className="space-y-1.5">
            {suggestions.budgetAlternatives?.map((adv) => (
              <Link
                key={adv.id}
                to={`/adventure/${adv.id}`}
                className="flex items-center justify-between hover:text-blue-500 text-[11px] font-medium text-slate-700 dark:text-slate-200 group"
              >
                <span className="truncate">{adv.name}</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-1">
                  ₹{adv.price?.toLocaleString('en-IN')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSearchHelper;
