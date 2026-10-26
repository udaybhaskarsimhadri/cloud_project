import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  Users, 
  CheckCircle2, 
  X, 
  Download,
  AlertCircle
} from 'lucide-react';
import DashboardNav from '../components/dashboard/DashboardNav';
import UserProfileCard from '../components/dashboard/UserProfileCard';
import DashboardStats from '../components/dashboard/DashboardStats';
import UpcomingTripCard from '../components/dashboard/UpcomingTripCard';
import RecentBookingsGrid from '../components/dashboard/RecentBookingsGrid';
import BookingHistoryTable from '../components/dashboard/BookingHistoryTable';
import TravelStatistics from '../components/dashboard/TravelStatistics';
import RewardCard from '../components/dashboard/RewardCard';
import QuickActions from '../components/dashboard/QuickActions';
import AccountSecurity from '../components/dashboard/AccountSecurity';
import HelpCenter from '../components/dashboard/HelpCenter';
import { dashboardService } from '../services/dashboardService';
import { bookingService } from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [travelStats, setTravelStats] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Load all dashboard state dynamically from Part 6 Local Storage ('adventurex_bookings')
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [sum, tStats] = await Promise.all([
        dashboardService.getDashboardSummary(),
        dashboardService.getTravelStatistics()
      ]);
      setSummary(sum);
      setTravelStats(tStats);
      setRewards(dashboardService.getRewards());
      setProfile(dashboardService.getProfile());
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleCancelTrip = async (bookingId, reason) => {
    try {
      await bookingService.cancelBooking(bookingId, reason);
      setToastMessage(`Booking ${bookingId} has been cancelled.`);
      await loadDashboardData();
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error('Cancel trip error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingSpinner size="lg" text="Loading Explorer Dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      {/* Secondary Dashboard Navigation Header */}
      <DashboardNav activeTab="overview" />

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* 1. Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-xl shadow-blue-500/15 relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                Verified Explorer
              </span>
              <span className="text-xs text-blue-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Level 3: {rewards?.level || 'Alpine Explorer'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Welcome Back, {profile?.fullName?.split(' ')[0] || 'Adventurer'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Track your upcoming departures, gear allocations, rewards XP, and personal travel statistics.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-200 block">Reward Balance</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                {rewards?.points.toLocaleString('en-IN')} XP
              </span>
            </div>
          </div>
        </div>

        {/* 2. User Profile Card */}
        <section>
          <UserProfileCard profile={profile} rewards={rewards} />
        </section>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 3. Dashboard Statistics Cards */}
        <section>
          <DashboardStats summary={summary} />
        </section>

        {/* 4. Quick Actions */}
        <section>
          <QuickActions />
        </section>

        {/* 5. Upcoming Trips Section */}
        <section id="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                Upcoming Trips ({summary?.upcomingTrips?.length || 0})
              </h2>
              <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
                Every booked future expedition ready for departure.
              </p>
            </div>
          </div>

          {summary?.upcomingTrips && summary.upcomingTrips.length > 0 ? (
            <div className="space-y-4">
              {summary.upcomingTrips.map((trip) => (
                <UpcomingTripCard
                  key={trip.id}
                  trip={trip}
                  onCancelTrip={handleCancelTrip}
                  onViewDetails={(t) => setSelectedBookingDetails(t)}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <Compass className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                No Upcoming Trips Scheduled
              </h4>
              <p className="text-xs text-[#475569] dark:text-slate-400">
                You do not have any active departures right now. Explore new Himalayan trails!
              </p>
            </div>
          )}
        </section>

        {/* 6. Recent Bookings Grid */}
        <section>
          <RecentBookingsGrid
            bookings={summary?.recentBookings || []}
            onViewDetails={(b) => setSelectedBookingDetails(b)}
          />
        </section>

        {/* 7. Travel Statistics & Charts (Generated directly from local bookings) */}
        <section>
          <TravelStatistics stats={travelStats} />
        </section>

        {/* 8. Rewards Center */}
        <section id="rewards">
          <RewardCard rewards={rewards} />
        </section>

        {/* 9. Booking History Table */}
        <section>
          <BookingHistoryTable
            bookings={summary?.allBookings || []}
            onViewDetails={(b) => setSelectedBookingDetails(b)}
          />
        </section>

        {/* 10. Account Security */}
        <section>
          <AccountSecurity />
        </section>

        {/* 11. Help Center */}
        <section>
          <HelpCenter />
        </section>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBookingDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    {selectedBookingDetails.id}
                  </span>
                  <h3 className="text-lg font-black text-[#0F172A] dark:text-white">
                    {selectedBookingDetails.adventureName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBookingDetails(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Destination */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Destination</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedBookingDetails.destination}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[11px]">Travel Dates</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {selectedBookingDetails.travelDate?.startDate} – {selectedBookingDetails.travelDate?.endDate}
                  </span>
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Registered Adventurers</span>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  {selectedBookingDetails.travelers?.map((t, i) => (
                    <div key={i} className="p-2.5 flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-white">{t.fullName}</span>
                      <span className="text-slate-400">{t.age} yrs • {t.gender} • {t.nationality}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300 block">Total Reservation Value</span>
                  <span className="text-[11px] text-slate-500">Includes all gear, permits & taxes</span>
                </div>
                <span className="text-2xl font-black text-[#0F172A] dark:text-white">
                  ₹{(selectedBookingDetails.pricing?.grandTotal || selectedBookingDetails.pricing?.total || 8999).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingDetails(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
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

export default Dashboard;
