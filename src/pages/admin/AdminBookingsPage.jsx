import React, { useState, useEffect } from 'react';
import { TicketCheck } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import BookingManagement from '../../components/admin/BookingManagement';
import { adminService } from '../../services/adminService';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState(() => adminService.getBookings());

  const refreshBookings = () => {
    setBookings(adminService.getBookings());
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  const totalVolume = bookings
    .filter(b => b.status === 'Confirmed')
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Booking Management & Invoices
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
                ₹{totalVolume.toLocaleString('en-IN')} Confirmed Volume
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Supervise all platform reservations, manage traveler refunds, track payment allocations, and cancel flagged orders
            </p>
          </div>
        </div>

        {/* Booking Management Module */}
        <BookingManagement
          initialBookings={bookings}
          onBookingsUpdated={refreshBookings}
        />
      </main>
    </div>
  );
};

export default AdminBookingsPage;
