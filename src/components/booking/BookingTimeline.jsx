import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

const BookingTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white uppercase tracking-wider">
        Expedition Status Timeline
      </h4>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {timeline.map((event, idx) => {
          const isLatest = idx === 0;
          const isCancelled = event.title.toLowerCase().includes('cancelled');

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="relative text-left"
            >
              {/* Timeline marker node */}
              <div
                className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                  isCancelled
                    ? 'bg-rose-500 ring-4 ring-rose-500/20'
                    : isLatest
                    ? 'bg-blue-600 ring-4 ring-blue-500/20'
                    : 'bg-emerald-500'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h5 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                  {event.title}
                </h5>
                <span className="text-[11px] font-semibold text-slate-400">
                  {event.timestamp}
                </span>
              </div>

              <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
                {event.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingTimeline;
