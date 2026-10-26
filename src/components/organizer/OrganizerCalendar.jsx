import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Mountain, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  X,
  Flag
} from 'lucide-react';

const OrganizerCalendar = ({ events = [] }) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(4); // 4 = May, 5 = June
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // For May 2026 (starts on Friday, 31 days)
  // For June 2026 (starts on Monday, 30 days)
  const getDaysInMonth = (monthIdx, year = 2026) => {
    return new Date(year, monthIdx + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (monthIdx, year = 2026) => {
    return new Date(year, monthIdx, 1).getDay(); // 0 = Sun, 1 = Mon ...
  };

  const daysInMonth = getDaysInMonth(currentMonthIdx);
  const firstDay = getFirstDayOfWeek(currentMonthIdx);

  const monthYearLabel = `${monthNames[currentMonthIdx]} 2026`;

  // Find events on a specific day
  const getEventsForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = currentMonthIdx + 1 < 10 ? `0${currentMonthIdx + 1}` : `${currentMonthIdx + 1}`;
    const dateStr = `2026-${formattedMonth}-${formattedDay}`;

    return events.filter((ev) => ev.date === dateStr);
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Calendar Header with Month Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Expedition Master Schedule
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Color-coded departures, basecamp returns, active tours, and regional mountain holidays.
          </p>
        </div>

        {/* Month Selector Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setCurrentMonthIdx((prev) => Math.max(0, prev - 1))}
              className="p-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-xs font-black text-[#0F172A] dark:text-white min-w-[100px] text-center">
              {monthYearLabel}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonthIdx((prev) => Math.min(11, prev + 1))}
              className="p-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend Badges */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600" />
          <span>Tour Departure</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Basecamp Return</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span>Day Tour / Flight</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500" />
          <span>Holiday Marker</span>
        </span>
      </div>

      {/* Month Days Grid */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-center py-2.5 text-xs font-black uppercase tracking-wider text-slate-500">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800">
          {/* Empty prefix cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[90px] sm:min-h-[110px] bg-slate-50/40 dark:bg-slate-900/30 p-2" />
          ))}

          {/* Month day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayEvents = getEventsForDay(dayNum);

            return (
              <div
                key={`day-${dayNum}`}
                className="min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2 bg-white dark:bg-slate-900 flex flex-col justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-black px-1.5 py-0.5 rounded-lg ${
                    dayEvents.length > 0
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {dayNum}
                  </span>
                </div>

                {/* Day Events Stack */}
                <div className="space-y-1 mt-1">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      style={{ borderLeftColor: ev.color }}
                      className="p-1 sm:p-1.5 rounded-md text-[10px] sm:text-[11px] font-bold truncate cursor-pointer bg-slate-50 dark:bg-slate-800 hover:shadow-sm border-l-2 text-[#0F172A] dark:text-white"
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: selectedEvent.color }}>
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{selectedEvent.type}</span>
                    <h4 className="text-base font-extrabold text-[#0F172A] dark:text-white">{selectedEvent.title}</h4>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedEvent.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{selectedEvent.category}</span>
                </div>
                {selectedEvent.seatsBooked && (
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Capacity Booked:</span>
                    <span className="font-bold text-emerald-600">{selectedEvent.seatsBooked} / {selectedEvent.totalSeats} Seats</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizerCalendar;
