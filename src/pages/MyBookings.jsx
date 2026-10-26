import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Compass, 
  Download, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Filter,
  Search,
  Package,
  Utensils,
  Car
} from 'lucide-react';

import { bookingService } from '../services/bookingService';
import BookingCard from '../components/booking/BookingCard';
import BookingTimeline from '../components/booking/BookingTimeline';
import Toast from '../components/common/Toast';
import Button from '../components/common/Button';

const STATUS_FILTERS = ['All', 'Confirmed', 'Upcoming', 'Completed', 'Cancelled'];

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Booking for Detailed Modal View
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState(null);

  // Cancellation State
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState('Change of travel schedule');
  const [isCancelling, setIsCancelling] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const triggerToast = (message, type = 'success') => {
    setToast({ isOpen: true, message, type });
  };

  const loadBookings = async () => {
    setLoading(true);
    const data = await bookingService.getBookings();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDownloadTicket = (booking) => {
    triggerToast(`Expedition Ticket #${booking.id} downloaded successfully (PDF Simulation).`, 'success');
  };

  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
  };

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;
    setIsCancelling(true);
    try {
      await bookingService.cancelBooking(bookingToCancel.id, cancelReason);
      setIsCancelling(false);
      setBookingToCancel(null);
      triggerToast('Booking Cancelled successfully.', 'info');
      loadBookings();
    } catch (err) {
      setIsCancelling(false);
      triggerToast('Failed to cancel booking.', 'error');
    }
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = activeFilter === 'All' || b.status === activeFilter;
    const matchesSearch = 
      b.adventureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 py-10 lg:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] dark:text-white">
                My Expedition Bookings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1.5">
              Review, track, download tickets, or manage your scheduled wilderness itineraries.
            </p>
          </div>

          <Link to="/destinations">
            <Button variant="primary" className="text-xs sm:text-sm py-2.5 px-5 shadow-sm">
              <Compass className="w-4 h-4 mr-2" />
              Explore More Adventures
            </Button>
          </Link>
        </div>

        {/* Filters & Search Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by expedition or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500">Loading expedition records...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#0F172A] dark:text-white">
              No Expeditions Found
            </h3>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              {searchQuery
                ? 'No bookings matching your search query. Try clearing your search.'
                : 'You currently have no scheduled adventures under this filter.'}
            </p>
            <div className="pt-2">
              <Link to="/destinations">
                <Button variant="primary" className="text-xs">Browse Expeditions</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onViewDetails={(booking) => setSelectedBookingForDetails(booking)}
                onDownloadTicket={handleDownloadTicket}
                onCancelBooking={handleCancelBooking}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBookingForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {selectedBookingForDetails.id}
                  </span>
                  <h3 className="font-extrabold text-xl text-[#0F172A] dark:text-white mt-1.5">
                    {selectedBookingForDetails.adventureName}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 space-y-6 text-xs sm:text-sm">
                
                {/* Expedition & Organizer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Destination & Dates
                    </span>
                    <p className="font-bold text-[#0F172A] dark:text-white mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      {selectedBookingForDetails.destination}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      {selectedBookingForDetails.travelDate?.startDate} – {selectedBookingForDetails.travelDate?.endDate}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Certified Organizer
                    </span>
                    <p className="font-bold text-[#0F172A] dark:text-white mt-1">
                      {selectedBookingForDetails.organizer?.name || 'Alpine Expeditions'}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      {selectedBookingForDetails.organizer?.company || 'AdventureX Lead Crew'}
                    </p>
                  </div>
                </div>

                {/* Travelers Details */}
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white mb-2">
                    Registered Travelers ({selectedBookingForDetails.travelers?.length || 1})
                  </h4>
                  <div className="space-y-2">
                    {selectedBookingForDetails.travelers?.map((t, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0F172A] dark:text-white">
                            #{idx + 1} {t.fullName}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({t.age} yrs • {t.gender} • {t.nationality})
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {t.idType}: Verified • Phone: {t.phone || 'On File'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment & Catering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Catering & Logistics
                    </span>
                    <p className="font-bold text-[#0F172A] dark:text-white">
                      Diet: {selectedBookingForDetails.mealPreference || 'Standard'}
                    </p>
                    <p className="text-slate-500 text-xs">
                      Transport: {selectedBookingForDetails.transportation || 'Self Arrival'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Rental Gear
                    </span>
                    <p className="font-bold text-[#0F172A] dark:text-white">
                      {selectedBookingForDetails.selectedEquipment?.length > 0
                        ? selectedBookingForDetails.selectedEquipment.map(e => `${e.name} (x${e.quantity})`).join(', ')
                        : 'No gear rented'}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                      Grand Total Paid
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Permits & taxes inclusive
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#0F172A] dark:text-white">
                    ₹{(selectedBookingForDetails.pricing?.grandTotal || selectedBookingForDetails.pricing?.total || 8999).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Status Timeline */}
                <BookingTimeline timeline={selectedBookingForDetails.timeline || []} />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadTicket(selectedBookingForDetails)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ticket</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {bookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#0F172A] dark:text-white">
                    Cancel Expedition Reservation
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Ref: {bookingToCancel.id}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#475569] dark:text-slate-400">
                Are you sure you want to cancel your reservation for <strong>{bookingToCancel.adventureName}</strong>? This action updates your local status and returns your slot to the staging pool.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                  Cancellation Reason
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Change of travel schedule">Change of travel schedule</option>
                  <option value="Weather or fitness concern">Weather or fitness concern</option>
                  <option value="Found alternative expedition">Found alternative expedition</option>
                  <option value="Personal / Medical emergency">Personal / Medical emergency</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingToCancel(null)}
                  disabled={isCancelling}
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  disabled={isCancelling}
                  className="w-1/2 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  {isCancelling ? 'Processing...' : 'Confirm Cancel'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

export default MyBookings;
