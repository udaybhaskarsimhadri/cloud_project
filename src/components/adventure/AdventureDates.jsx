import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const statusBadgeStyles = {
  Open: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  'Almost Full': 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
  'Sold Out': 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800'
};

const AdventureDates = ({ batches = [] }) => {
  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || null);
  const [selectedMonth, setSelectedMonth] = useState('May 2026');

  const months = ['May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
              Upcoming Batches & Dates
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Confirmed fixed departure departures with live seat availability counters.
          </p>
        </div>

        {/* Month Selector Pills (UI only) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          {months.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMonth(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMonth === m
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map((batch) => {
          const isSelected = selectedBatch === batch.id;
          const isSoldOut = batch.status === 'Sold Out';

          return (
            <div
              key={batch.id}
              onClick={() => !isSoldOut && setSelectedBatch(batch.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                  : isSoldOut
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {batch.endDate || 'Confirmed Batch'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${statusBadgeStyles[batch.status] || statusBadgeStyles.Open}`}>
                    {batch.status}
                  </span>
                </div>

                <h4 className="text-base font-black text-[#0F172A] dark:text-white">
                  {batch.startDate}
                </h4>

                {/* Seats Left Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{isSoldOut ? 'No Seats Left' : `${batch.availableSeats} Seats Left`}</span>
                    </span>
                    <span className="text-slate-400">{batch.totalSeats} Total</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSoldOut
                          ? 'bg-rose-500 w-full'
                          : batch.status === 'Almost Full'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${isSoldOut ? 100 : Math.min(100, Math.round(((batch.totalSeats - batch.availableSeats) / batch.totalSeats) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className={`font-bold ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500'}`}>
                  {isSelected ? '✓ Selected Batch' : isSoldOut ? 'Batch Full' : 'Select Departure'}
                </span>
                <span className="text-[11px] text-slate-400">Guaranteed Departure</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdventureDates;
