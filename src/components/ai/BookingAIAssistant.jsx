import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Compass, 
  CheckCircle2, 
  Lightbulb, 
  Bot,
  ExternalLink
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useAI } from '../../context/AIContext';

const BookingAIAssistant = ({ adventure }) => {
  const { openAssistant } = useAI();
  const [isOpen, setIsOpen] = useState(true);

  if (!adventure) return null;

  const explanation = aiService.explainAdventureForBooking(adventure);

  const handleAskAI = () => {
    openAssistant(
      'chat',
      `I'm booking the ${adventure.name}. Can you explain the day-by-day fitness difficulty, packing checklist, and acclimatization tips?`,
      adventure
    );
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 dark:from-emerald-950/20 dark:via-slate-900/60 dark:to-teal-950/20 backdrop-blur-md shadow-sm overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="p-4 flex items-center justify-between gap-3 border-b border-emerald-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm text-slate-900 dark:text-white">
                AI Smart Expedition Briefing
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                Live Insights
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              AI-analyzed expedition parameters, fitness readiness & seasonal advice
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAskAI}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Assistant</span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-xl hover:bg-emerald-500/10 text-slate-500 transition-colors"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 space-y-4 text-xs text-slate-700 dark:text-slate-200"
          >
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Difficulty Rating
                </span>
                <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {explanation.difficulty}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {explanation.difficultyExplanation}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Duration & Terrain
                </span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {explanation.duration}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  High-altitude trail segments with certified expedition sweepers.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Best Travel Season
                </span>
                <p className="font-bold text-sm text-teal-600 dark:text-teal-400 mt-0.5">
                  Prime Conditions
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {explanation.bestTravelSeason}
                </p>
              </div>
            </div>

            {/* Included Facilities & Preparation Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Included Facilities */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>AI Verified Inclusions</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  {explanation.includedFacilities.map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Tips */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>AI Pre-Expedition Preparation</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  {explanation.preparationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Ask AI button */}
            <div className="sm:hidden pt-2">
              <button
                onClick={handleAskAI}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Assistant about this trip</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingAIAssistant;
