import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentBookingsGrid = ({ bookings = [], onViewDetails }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Clock className="w-3 h-3" />
            {status}
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
            Recent Bookings
          </h3>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Your latest reservations stored in local booking storage.
          </p>
        </div>

        <Link
          to="/my-bookings"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>View All Bookings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookings.map((b) => {
            const price = b.pricing?.grandTotal || b.pricing?.total || 8999;
            return (
              <motion.div
                key={b.id}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between space-y-3 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="font-mono text-[11px] font-extrabold text-blue-600 dark:text-blue-400 truncate">
                      {b.id}
                    </span>
                    {getStatusBadge(b.status)}
                  </div>

                  <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white line-clamp-1">
                    {b.adventureName}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{b.travelDate?.startDate || 'Scheduled'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total</span>
                    <span className="text-sm font-black text-[#0F172A] dark:text-white">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewDetails && onViewDetails(b)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 border border-slate-200 dark:border-slate-600 shadow-sm transition-colors cursor-pointer"
                    title="View Booking Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-slate-400 space-y-2">
          <FileText className="w-8 h-8 mx-auto opacity-50" />
          <p className="font-bold text-xs text-slate-600 dark:text-slate-300">No recent bookings recorded</p>
        </div>
      )}
    </div>
  );
};

export default RecentBookingsGrid;
