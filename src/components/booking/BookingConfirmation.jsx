import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Users, 
  MapPin, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Lock
} from 'lucide-react';
import Button from '../common/Button';

const BookingConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  adventure,
  selectedBatch,
  travelerCount = 1,
  totalAmount = 0,
  isSubmitting = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0F172A] dark:text-white">
                  Confirm Expedition Reservation
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Step 4 of 4 • Final Authorization
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Details Summary */}
          <div className="py-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
                {adventure?.name}
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#475569] dark:text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {adventure?.destination}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {selectedBatch ? `${selectedBatch.startDate} – ${selectedBatch.endDate}` : 'Dates selected'}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-500" />
                  {travelerCount} {travelerCount === 1 ? 'Adventurer' : 'Adventurers'}
                </span>
              </div>
            </div>

            {/* Total Payable */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block">
                  Total Reservation Cost
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Includes gear, taxes & ecological permits
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Section - Disabled Online Payment */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E293B] dark:text-slate-200">Payment Gateway</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Direct Reservation
                </span>
              </div>
              <button
                type="button"
                disabled
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed flex items-center justify-center gap-2 border border-slate-300/80 dark:border-slate-600 select-none opacity-85"
                title="Online Payment Coming Soon"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Online Payment Coming Soon</span>
              </button>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                Booking completes and saves locally without requiring online payment.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isSubmitting}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Securing Spot...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingConfirmation;
