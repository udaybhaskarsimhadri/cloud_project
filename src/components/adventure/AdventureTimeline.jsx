import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Compass,
  Footprints,
  Flame,
  Clock
} from 'lucide-react';

const AdventureTimeline = ({ itinerary = [] }) => {
  const [expandedDay, setExpandedDay] = useState(1);

  if (!itinerary || itinerary.length === 0) return null;

  const toggleDay = (day) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
              Expedition Itinerary
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Carefully curated day-by-day expedition progression planned for acclimatization and maximum safety.
          </p>
        </div>
        <span className="hidden sm:inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          {itinerary.length} Days Plan
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-3 sm:ml-4">
        {itinerary.map((dayPlan, idx) => {
          const isExpanded = expandedDay === dayPlan.day;
          return (
            <motion.div
              key={dayPlan.day}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Circular timeline node marker */}
              <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-md ${
                isExpanded
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white ring-4 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400'
              }`}>
                <span>D{dayPlan.day}</span>
              </div>

              {/* Day Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleDay(dayPlan.day)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Day {dayPlan.day}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {dayPlan.activities?.length || 3} Milestones
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
                      {dayPlan.title}
                    </h4>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-5 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
                        <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
                          {dayPlan.description}
                        </p>

                        {/* Milestones / Activities */}
                        {dayPlan.activities && dayPlan.activities.length > 0 && (
                          <div className="space-y-2 pt-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-slate-200 block">
                              Daily Highlights & Schedule:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {dayPlan.activities.map((act, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-semibold shadow-xs"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  <span>{act}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdventureTimeline;
