import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TicketCheck, 
  Search, 
  Filter, 
  Eye, 
  XCircle, 
  RotateCcw, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  Calendar,
  IndianRupee,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const BookingManagement = ({ initialBookings = [], onBookingsUpdated }) => {
  const [bookings, setBookings] = useState(() => 
    initialBookings && initialBookings.length > 0 ? initialBookings : adminService.getBookings()
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  React.useEffect(() => {
    if (initialBookings && initialBookings.length > 0) {
      setBookings(initialBookings);
    } else {
      setBookings(adminService.getBookings());
    }
  }, [initialBookings]);

  const itemsPerPage = 6;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter & Search
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.travelerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.travelerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.organizerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.adventureTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Sort
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });

  // Pagination
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage) || 1;
  const paginatedBookings = sortedBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCancel = (id) => {
    if (window.confirm(`Are you sure you want to cancel booking ${id}?`)) {
      const updated = adminService.updateBookingStatus(id, 'Cancelled');
      if (updated) {
        setBookings(adminService.getBookings());
        if (onBookingsUpdated) onBookingsUpdated();
        showToast(`Booking ${id} marked as Cancelled.`);
      }
    }
  };

  const handleRefund = (id) => {
    if (window.confirm(`Initiate simulated refund of booking ${id}?`)) {
      const updated = adminService.updateBookingStatus(id, 'Cancelled', true);
      if (updated) {
        setBookings(adminService.getBookings());
        if (onBookingsUpdated) onBookingsUpdated();
        showToast(`Booking ${id} refunded successfully (Platform simulated reversal).`);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search booking ID, traveler, trip..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
            >
              <option value="date-desc">Trip Date (Newest)</option>
              <option value="date-asc">Trip Date (Oldest)</option>
              <option value="amount-desc">Amount (Highest)</option>
              <option value="amount-asc">Amount (Lowest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Booking ID & Date</th>
                <th className="py-3.5 px-4">Traveler</th>
                <th className="py-3.5 px-4">Organizer</th>
                <th className="py-3.5 px-4">Adventure</th>
                <th className="py-3.5 px-4">Amount (₹)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-bold">
                    No bookings found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    {/* ID & Date */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <p className="font-extrabold text-slate-900 dark:text-white font-mono">
                        {b.id}
                      </p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        Trip: {b.date}
                      </span>
                    </td>

                    {/* Traveler */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{b.travelerName}</p>
                      <span className="text-[10px] text-slate-400">{b.travelers || 1} Pax • {b.travelerEmail}</span>
                    </td>

                    {/* Organizer */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{b.organizerName}</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">{b.payoutStatus || 'Paid'}</span>
                    </td>

                    {/* Adventure */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{b.adventureTitle}</p>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-black text-slate-900 dark:text-white text-sm">
                        ₹{b.amount.toLocaleString('en-IN')}
                      </p>
                      <span className="text-[10px] text-purple-600">Fee: ₹{(b.platformFee || Math.round(b.amount * 0.15)).toLocaleString('en-IN')}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : b.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View */}
                        <button
                          type="button"
                          onClick={() => setViewingBooking(b)}
                          title="View Invoice & Itinerary"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Cancel */}
                        {b.status !== 'Cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleCancel(b.id)}
                            title="Cancel Booking"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Refund Placeholder */}
                        {b.status !== 'Cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleRefund(b.id)}
                            title="Issue Refund to Traveler"
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {sortedBookings.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedBookings.length)} of {sortedBookings.length} bookings
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-bold text-slate-800 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Booking Modal */}
      <AnimatePresence>
        {viewingBooking && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setViewingBooking(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-md">
                  <TicketCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Booking Dossier: {viewingBooking.id}
                  </h3>
                  <p className="text-xs text-slate-500">Placed on {viewingBooking.bookingDate || viewingBooking.date}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-1">
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm">{viewingBooking.adventureTitle}</p>
                  <p className="text-slate-500">Host: {viewingBooking.organizerName}</p>
                  <p className="text-purple-600 font-bold">Departure Date: {viewingBooking.date}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-black block">Traveler</span>
                    <p className="font-bold text-slate-900 dark:text-white">{viewingBooking.travelerName}</p>
                    <p className="text-slate-500">{viewingBooking.travelerEmail}</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-black block">Party Size</span>
                    <p className="font-bold text-slate-900 dark:text-white">{viewingBooking.travelers || 1} Travelers</p>
                    <p className="text-emerald-600 font-bold">{viewingBooking.status}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
                  <div className="flex justify-between font-bold text-purple-900 dark:text-purple-200">
                    <span>Total Amount Charged:</span>
                    <span>₹{viewingBooking.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Platform Commission (15%):</span>
                    <span>₹{(viewingBooking.platformFee || Math.round(viewingBooking.amount * 0.15)).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold text-[11px]">
                    <span>Organizer Payout Share:</span>
                    <span>₹{(viewingBooking.organizerShare || Math.round(viewingBooking.amount * 0.85)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {viewingBooking.status !== 'Cancelled' && (
                  <button
                    type="button"
                    onClick={() => {
                      handleRefund(viewingBooking.id);
                      setViewingBooking(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Simulate Refund
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setViewingBooking(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
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

export default BookingManagement;
