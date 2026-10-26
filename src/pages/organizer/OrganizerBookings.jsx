import React, { useState, useEffect } from 'react';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import BookingManager from '../../components/organizer/BookingManager';
import { organizerService } from '../../services/organizerService';
import { CheckCircle2 } from 'lucide-react';

const OrganizerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const loadBookings = () => {
    const list = organizerService.getBookings();
    setBookings(list);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    organizerService.updateBookingStatus(id, newStatus);
    loadBookings();
    setToastMessage(`Booking ${id} marked as ${newStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <BookingManager
          bookings={bookings}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
};

export default OrganizerBookings;
