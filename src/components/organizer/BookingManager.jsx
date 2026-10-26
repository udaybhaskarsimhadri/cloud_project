import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Check, 
  X, 
  User, 
  Mail, 
  Phone, 
  FileText
} from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const BookingManager = ({
  bookings = [],
  onUpdateStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending Approval
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
            Completed
          </span>
        );
      case 'Cancelled':
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
            <XCircle className="w-3 h-3 text-rose-600" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) => {
        const matchesSearch = 
          b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.adventureName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' ? true : b.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.bookedOn || 0);
        const dateB = new Date(b.bookedOn || 0);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [bookings, searchTerm, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
            Customer Booking Management
          </h3>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Approve pending reservations, inspect traveler logs, and manage capacities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID, customer, trek..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort Button */}
          <button
            type="button"
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider text-[11px]">
              <th className="py-3 px-4">Booking ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Adventure</th>
              <th className="py-3 px-4">Travel Date</th>
              <th className="py-3 px-4 text-center">Seats</th>
              <th className="py-3 px-4 text-right">Amount (₹)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {b.id}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-[#0F172A] dark:text-white">
                      {b.customerName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {b.customerPhone}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-800 dark:text-slate-200 font-bold">
                    {b.adventureName}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {b.travelDate}
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-white">
                    {b.seats}
                  </td>

                  <td className="py-3.5 px-4 text-right font-black text-[#0F172A] dark:text-white whitespace-nowrap">
                    ₹{b.amount?.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(b.status)}
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* View Details */}
                      <button
                        type="button"
                        onClick={() => setSelectedBookingDetails(b)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Full Booking Log"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Approve Booking (if pending) */}
                      {b.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(b.id, 'Confirmed')}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Approve Reservation"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      {/* Reject Booking (if pending) */}
                      {b.status === 'Pending' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(b.id, 'Rejected')}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Reject Reservation"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Cancel Booking (if confirmed) */}
                      {b.status === 'Confirmed' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(b.id, 'Cancelled')}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Cancel Reservation"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-12 text-center text-slate-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-bold text-sm text-slate-600 dark:text-slate-300">No bookings match filter criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <span>
            Page <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({filteredBookings.length} total)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBookingForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {selectedBookingForDetails.id}
                  </span>
                  <h4 className="text-base font-extrabold text-[#0F172A] dark:text-white">
                    {selectedBookingForDetails.adventureName}
                  </h4>
                </div>
                <button onClick={() => setSelectedBookingForDetails(null)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Customer Contact</span>
                  <p className="font-bold text-slate-800 dark:text-white">{selectedBookingForDetails.customerName}</p>
                  <p className="text-slate-500">{selectedBookingForDetails.customerEmail}</p>
                  <p className="text-slate-500">{selectedBookingForDetails.customerPhone}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Reservation Info</span>
                  <p className="font-bold text-slate-800 dark:text-white">Departure: {selectedBookingForDetails.travelDate}</p>
                  <p className="text-slate-500">Seats: {selectedBookingForDetails.seats} Adventurers</p>
                  <p className="text-emerald-600 font-extrabold">Amount: ₹{selectedBookingForDetails.amount?.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {selectedBookingForDetails.notes && (
                <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                  <span className="font-bold block mb-0.5">Customer Notes & Special Requests:</span>
                  <p>{selectedBookingForDetails.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForDetails(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
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

export default BookingManager;
