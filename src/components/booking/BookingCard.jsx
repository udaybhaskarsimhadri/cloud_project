import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Download, 
  Eye, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import Card from '../common/Card';

const BookingCard = ({
  booking,
  onViewDetails,
  onDownloadTicket,
  onCancelBooking
}) => {
  if (!booking) return null;

  const {
    id,
    adventureName,
    adventureImage,
    destination,
    category,
    travelDate,
    travelers = [],
    pricing,
    status
  } = booking;

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Confirmed
          </span>
        );
      case 'Upcoming':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {st}
          </span>
        );
    }
  };

  const canCancel = status === 'Confirmed' || status === 'Upcoming';

  return (
    <Card className="p-0 overflow-hidden border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 flex flex-col md:flex-row">
      {/* Thumbnail */}
      <div className="relative w-full md:w-56 h-48 md:h-auto shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={adventureImage || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'}
          alt={adventureName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:hidden" />
        
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-md">
            {category || 'Expedition'}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Top row: ID and Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
              {id}
            </span>
            {getStatusBadge(status)}
          </div>

          {/* Title & Destination */}
          <h3 className="font-extrabold text-lg sm:text-xl text-[#0F172A] dark:text-white line-clamp-1 mb-1.5">
            {adventureName}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#475569] dark:text-slate-400 font-semibold mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{destination}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>{travelDate?.startDate} – {travelDate?.endDate}</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              <span>{travelers.length} {travelers.length === 1 ? 'Traveler' : 'Travelers'}</span>
            </span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-baseline gap-2">
            <span>Total Booking Value:</span>
            <span className="text-base font-black text-[#0F172A] dark:text-white">
              ₹{(pricing?.grandTotal || pricing?.total || 8999).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(booking)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={() => onDownloadTicket(booking)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#1E293B] dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Ticket</span>
          </button>

          {canCancel && (
            <button
              type="button"
              onClick={() => onCancelBooking(booking)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900 transition-colors ml-auto"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Booking</span>
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
