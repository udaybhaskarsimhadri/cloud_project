import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  Eye, 
  XCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Users,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingTripCard = ({ trip, onCancelTrip, onViewDetails }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Schedule conflict');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Calculate Days Remaining
  const calculateDaysRemaining = (dateStr) => {
    try {
      if (!dateStr) return 'Upcoming';
      const target = new Date(dateStr);
      const today = new Date();
      const diffTime = target - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (isNaN(diffDays)) return 'Upcoming';
      if (diffDays < 0) return 'In Progress';
      if (diffDays === 0) return 'Departs Today';
      return `${diffDays} Days Remaining`;
    } catch (e) {
      return 'Scheduled';
    }
  };

  const daysRemainingText = calculateDaysRemaining(trip.travelDate?.startDate);

  const handleSimulateDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowTicketModal(false);
      // Trigger download of text/json representation
      const blob = new Blob([
        `=======================================================\nADVENTUREX EXPEDITION TICKET - BOARDING PASS\n=======================================================\nBooking ID: ${trip.id}\nExpedition: ${trip.adventureName}\nDestination: ${trip.destination}\nDeparture: ${trip.travelDate?.startDate}\nReturn: ${trip.travelDate?.endDate}\nTravelers: ${trip.travelers?.length || 1}\nLead Traveler: ${trip.travelers?.[0]?.fullName || 'Guest'}\nGrand Total: ₹${(trip.pricing?.grandTotal || trip.pricing?.total || 8999).toLocaleString('en-IN')}\nStatus: ${trip.status}\n=======================================================\nEmergency Operations Hub: +91 1800-ADVENTURE-X\nPresent this pass along with valid photo ID at the basecamp.\n`
      ], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AdventureX-Ticket-${trip.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 1200);
  };

  const handleConfirmCancel = () => {
    if (onCancelTrip) {
      onCancelTrip(trip.id, cancelReason);
    }
    setShowCancelModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-5 items-stretch transition-all duration-200"
    >
      {/* Adventure Image */}
      <div className="relative md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 group">
        <img
          src={trip.adventureImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'}
          alt={trip.adventureName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
        
        {/* Days Remaining Pill */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-blue-600/90 text-white backdrop-blur-md shadow-md flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{daysRemainingText}</span>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 md:hidden">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">
            {trip.status || 'Confirmed'}
          </span>
        </div>
      </div>

      {/* Trip Details */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              {trip.category || 'Expedition'} • ID: {trip.id}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {trip.status || 'Confirmed'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white leading-tight">
            {trip.adventureName}
          </h3>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2.5 text-xs text-[#475569] dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{trip.destination}</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{trip.travelDate?.startDate} – {trip.travelDate?.endDate}</span>
            </span>

            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              <span>{trip.travelers?.length || 1} {trip.travelers?.length === 1 ? 'Traveler' : 'Travelers'}</span>
            </span>
          </div>
        </div>

        {/* Pricing & Organizer summary */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Expedition Leader</span>
            <span className="font-bold text-[#1E293B] dark:text-slate-200">
              {trip.organizer?.name || 'AdventureX Lead Guide'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Total Paid</span>
            <span className="font-extrabold text-sm text-[#0F172A] dark:text-white">
              ₹{(trip.pricing?.grandTotal || trip.pricing?.total || 8999).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 flex flex-wrap items-center gap-2.5 justify-end">
          {/* Cancel Booking Button */}
          {trip.status !== 'Cancelled' && (
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Booking</span>
            </button>
          )}

          {/* Download Ticket (Placeholder modal / simulated download) */}
          <button
            type="button"
            onClick={() => setShowTicketModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Download Ticket</span>
          </button>

          {/* View Booking Button */}
          <button
            type="button"
            onClick={() => onViewDetails ? onViewDetails(trip) : null}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Booking</span>
          </button>
        </div>
      </div>

      {/* Ticket Download Modal (Placeholder) */}
      <AnimatePresence>
        {showTicketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <Download className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
                  Expedition Boarding Pass
                </h4>
                <p className="text-xs text-[#475569] dark:text-slate-400">
                  Ready to download official voucher for {trip.id}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Expedition:</span>
                  <span className="font-bold text-slate-800 dark:text-white truncate max-w-[200px]">{trip.adventureName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Departure:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{trip.travelDate?.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Price:</span>
                  <span className="font-bold text-emerald-600">₹{(trip.pricing?.grandTotal || trip.pricing?.total || 8999).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSimulateDownload}
                  disabled={isDownloading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2"
                >
                  {isDownloading ? (
                    <span>Generating Ticket...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Now</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
                  Cancel Expedition Reservation?
                </h4>
                <p className="text-xs text-[#475569] dark:text-slate-400">
                  Are you sure you want to cancel booking <span className="font-bold text-slate-900 dark:text-white">{trip.id}</span>? Free refund policy applies up to 15 days before departure.
                </p>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Reason for Cancellation
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Schedule conflict">Schedule conflict</option>
                  <option value="Medical / fitness advisory">Medical / fitness advisory</option>
                  <option value="Weather / route preference change">Weather / route preference change</option>
                  <option value="Booking details modification">Booking details modification</option>
                  <option value="Other personal reason">Other personal reason</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Keep Reservation
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UpcomingTripCard;
