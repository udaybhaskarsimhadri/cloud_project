import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Tag
} from 'lucide-react';

const MONTHS = ['May', 'June', 'July', 'August'];

const BookingCalendar = ({ 
  adventure, 
  selectedBatch, 
  onSelectBatch 
}) => {
  const [activeMonthTab, setActiveMonthTab] = useState('May');

  const basePrice = adventure?.pricing?.discountPrice || adventure?.discountPrice || adventure?.price || 8999;
  const adventureDuration = adventure?.duration || '5 Days / 4 Nights';

  // Structured multi-month batches with unique dates and distinct batch pricing
  const allBatches = useMemo(() => {
    return [
      // May Batches
      { 
        id: 'may-batch-1', 
        month: 'May',
        startDate: 'May 12, 2026', 
        endDate: 'May 16, 2026', 
        duration: adventureDuration,
        price: basePrice, 
        availableSeats: 4, 
        totalSeats: 14, 
        status: 'Limited Seats',
        highlight: 'Season Opening'
      },
      { 
        id: 'may-batch-2', 
        month: 'May',
        startDate: 'May 24, 2026', 
        endDate: 'May 28, 2026', 
        duration: adventureDuration,
        price: basePrice + 500, 
        availableSeats: 9, 
        totalSeats: 14, 
        status: 'Available',
        highlight: 'Weekend Window'
      },

      // June Batches
      { 
        id: 'jun-batch-1', 
        month: 'June',
        startDate: 'Jun 05, 2026', 
        endDate: 'Jun 09, 2026', 
        duration: adventureDuration,
        price: basePrice + 350, 
        availableSeats: 12, 
        totalSeats: 14, 
        status: 'Available',
        highlight: 'Prime Weather'
      },
      { 
        id: 'jun-batch-2', 
        month: 'June',
        startDate: 'Jun 18, 2026', 
        endDate: 'Jun 22, 2026', 
        duration: adventureDuration,
        price: basePrice, 
        availableSeats: 0, 
        totalSeats: 14, 
        status: 'Sold Out'
      },

      // July Batches
      { 
        id: 'jul-batch-1', 
        month: 'July',
        startDate: 'Jul 02, 2026', 
        endDate: 'Jul 06, 2026', 
        duration: adventureDuration,
        price: basePrice + 750, 
        availableSeats: 6, 
        totalSeats: 14, 
        status: 'Available',
        highlight: 'Peak Wildflower Bloom'
      },
      { 
        id: 'jul-batch-2', 
        month: 'July',
        startDate: 'Jul 16, 2026', 
        endDate: 'Jul 20, 2026', 
        duration: adventureDuration,
        price: basePrice + 400, 
        availableSeats: 3, 
        totalSeats: 14, 
        status: 'Limited Seats'
      },

      // August Batches
      { 
        id: 'aug-batch-1', 
        month: 'August',
        startDate: 'Aug 08, 2026', 
        endDate: 'Aug 12, 2026', 
        duration: adventureDuration,
        price: Math.max(1000, basePrice - 300), 
        availableSeats: 10, 
        totalSeats: 14, 
        status: 'Available',
        highlight: 'Clear Skies & Stargazing'
      },
      { 
        id: 'aug-batch-2', 
        month: 'August',
        startDate: 'Aug 22, 2026', 
        endDate: 'Aug 26, 2026', 
        duration: adventureDuration,
        price: basePrice + 250, 
        availableSeats: 5, 
        totalSeats: 14, 
        status: 'Available'
      }
    ];
  }, [basePrice, adventureDuration]);

  // Strict month filtering: ONLY show batches belonging to activeMonthTab
  const visibleBatches = useMemo(() => {
    return allBatches.filter((b) => b.month === activeMonthTab);
  }, [allBatches, activeMonthTab]);

  const getStatusBadge = (status, seats) => {
    if (status === 'Sold Out' || seats === 0) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          Sold Out
        </span>
      );
    }
    if (status === 'Limited Seats' || seats <= 4) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          Limited Seats ({seats} left)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
        Available ({seats} seats)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] dark:text-white">
              Select Expedition Date
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Choose your preferred departure window. Batch prices vary by seasonal demand.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Available
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Limited
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Sold Out
          </span>
        </div>
      </div>

      {/* Month Filter Tabs: May, June, July, August */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MONTHS.map((m) => {
          const isActive = activeMonthTab === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setActiveMonthTab(m)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80'
              }`}
            >
              {m} 2026
            </button>
          );
        })}
      </div>

      {/* Interactive Batches Grid Filtered by Selected Month */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMonthTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {visibleBatches.map((batch) => {
            const isSoldOut = batch.status === 'Sold Out' || batch.availableSeats === 0;
            const isSelected = selectedBatch?.id === batch.id;

            return (
              <motion.div
                key={batch.id}
                whileHover={!isSoldOut ? { scale: 1.015 } : {}}
                onClick={() => {
                  if (!isSoldOut) {
                    onSelectBatch(batch);
                  }
                }}
                className={`relative p-5 rounded-3xl border transition-all duration-300 text-left ${
                  isSoldOut
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-60 cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-lg cursor-pointer'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md cursor-pointer'
                }`}
              >
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {getStatusBadge(batch.status, batch.availableSeats)}
                    {batch.highlight && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {batch.highlight}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Date Title */}
                <h4 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white mb-1">
                  {batch.startDate} – {batch.endDate}
                </h4>

                {/* Duration & Availability */}
                <div className="flex items-center gap-4 text-xs text-[#475569] dark:text-slate-400 font-semibold mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {batch.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-500" />
                    {batch.availableSeats} of {batch.totalSeats} spots left
                  </span>
                </div>

                {/* Price Display */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Batch Rate
                  </span>
                  <span className="text-base font-extrabold text-[#0F172A] dark:text-white">
                    ₹{batch.price.toLocaleString('en-IN')}{' '}
                    <span className="text-[11px] font-semibold text-slate-500">/ person</span>
                  </span>
                </div>

                {/* Seats Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSoldOut
                        ? 'bg-rose-500'
                        : batch.availableSeats <= 4
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{
                      width: `${
                        isSoldOut
                          ? 100
                          : (((batch.totalSeats) - batch.availableSeats) /
                              (batch.totalSeats)) *
                            100
                      }%`
                    }}
                  />
                </div>

                {isSoldOut && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Fully booked. Please join waitlist or pick next batch.</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selected Batch Summary Banner */}
      {selectedBatch && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-emerald-50/50 dark:from-blue-950/40 dark:to-emerald-950/30 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between flex-wrap gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                Selected Expedition Window
              </span>
              <p className="text-sm sm:text-base font-extrabold text-[#0F172A] dark:text-white">
                {selectedBatch.startDate} to {selectedBatch.endDate} ({selectedBatch.duration})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-blue-700 dark:text-blue-300">
              ₹{selectedBatch.price.toLocaleString('en-IN')} / person
            </span>
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
              ✓ Slot Reserved
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BookingCalendar;
