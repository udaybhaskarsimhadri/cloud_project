import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck,
  Home
} from 'lucide-react';

import { bookingService } from '../services/bookingService';
import SuccessAnimation from '../components/booking/SuccessAnimation';
import Toast from '../components/common/Toast';
import Button from '../components/common/Button';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [copiedId, setCopiedId] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  // If page was loaded directly, load most recent booking from storage
  useEffect(() => {
    if (!booking) {
      bookingService.getBookings().then((all) => {
        if (all && all.length > 0) {
          setBooking(all[0]);
        }
      });
    }
  }, [booking]);

  const handleCopyId = () => {
    if (booking?.id && navigator.clipboard) {
      navigator.clipboard.writeText(booking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleDownloadTicket = () => {
    setToast({
      isOpen: true,
      message: `Expedition Ticket #${booking?.id || 'ADV-2026'} downloaded successfully (PDF Simulation).`,
      type: 'success'
    });
  };

  if (!booking) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">
            No Active Booking Session
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            You can review your existing confirmed reservations in the My Bookings portal.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link to="/my-bookings">
              <Button variant="primary">Go to My Bookings</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const primaryTraveler = booking.travelers?.[0] || {};

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-12 lg:py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center relative overflow-hidden"
        >
          {/* Subtle decorative background glows */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Celebration Animation */}
          <SuccessAnimation />

          {/* Heading */}
          <div className="space-y-2 mb-8 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Reservation Confirmed
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] dark:text-white">
              You're Going on an Adventure!
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-lg mx-auto">
              Your expedition slot has been secured. A confirmation packet has been dispatched to your email address.
            </p>
          </div>

          {/* Detailed Ticket Summary Card */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-left space-y-5 mb-8 relative z-10">
            
            {/* Top row: ID and Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-700">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Booking Reference ID
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-base font-black text-[#0F172A] dark:text-white">
                    {booking.id}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                    title="Copy booking ID"
                  >
                    {copiedId ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Status: {booking.status || 'Confirmed'}</span>
              </div>
            </div>

            {/* Adventure & Destination Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Expedition
                </span>
                <p className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                  {booking.adventureName}
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {booking.destination}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Scheduled Departure
                </span>
                <p className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                  {booking.travelDate?.startDate} – {booking.travelDate?.endDate}
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  {booking.travelDate?.duration || '5 Days'}
                </span>
              </div>
            </div>

            {/* Traveler & Total Cost Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Lead Adventurer
                </span>
                <p className="font-extrabold text-sm text-[#0F172A] dark:text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {primaryTraveler.fullName || 'Lead Traveler'}
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                  {primaryTraveler.email || 'Email registered'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Total Amount Booked
                </span>
                <p className="font-extrabold text-lg text-emerald-600 dark:text-emerald-400">
                  ₹{(booking.pricing?.grandTotal || booking.pricing?.total || 8999).toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Paid locally (Simulation) • Includes all permits & tax
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={handleDownloadTicket}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1E293B] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Download Ticket (PDF)</span>
            </button>

            <Link to="/my-bookings" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full sm:w-auto py-3.5 px-7 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto py-3.5 px-5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default BookingSuccess;
