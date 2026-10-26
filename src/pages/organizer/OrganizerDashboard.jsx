import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Mountain, 
  TicketCheck, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import OrganizerStats from '../../components/organizer/OrganizerStats';
import QuickActions from '../../components/organizer/QuickActions';
import { organizerService } from '../../services/organizerService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OrganizerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [profile, setProfile] = useState(null);
  const [adventures, setAdventures] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      const st = organizerService.getDashboardStats();
      const prof = organizerService.getProfile();
      const advs = organizerService.getAdventures();
      const bks = organizerService.getBookings();

      setStats(st);
      setProfile(prof);
      setAdventures(advs);
      setBookings(bks);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingSpinner size="lg" text="Loading Partner Portal..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Top Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-700 text-white shadow-xl shadow-emerald-600/15 relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                Verified Tour Operator
              </span>
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Superhost Status • 4.95 Rating
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Welcome, {profile?.companyName || 'Himalayan Ridge Expeditions'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Partner portal overview: Manage your high-altitude itineraries, approve incoming reservations, and monitor revenue payouts.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">Total Earnings</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                ₹{stats?.totalEarnings?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* 1. Statistics Cards */}
        <section>
          <OrganizerStats stats={stats} />
        </section>

        {/* 2. Quick Actions */}
        <section>
          <QuickActions />
        </section>

        {/* 3. Middle Split: Pending & Recent Bookings & Active Adventures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Customer Bookings */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-[#0F172A] dark:text-white">
                  Recent Booking Requests
                </h3>
                <p className="text-xs text-slate-400">Incoming traveler reservations</p>
              </div>
              <Link
                to="/organizer/bookings"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white truncate">
                        {b.customerName}
                      </span>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                        b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-slate-500 truncate">{b.adventureName} • {b.travelDate}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-slate-900 dark:text-white block">
                      ₹{b.amount?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">{b.seats} Seats</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Expeditions Summary */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-[#0F172A] dark:text-white">
                  Active Published Adventures
                </h3>
                <p className="text-xs text-slate-400">Live inventory and available batch seats</p>
              </div>
              <Link
                to="/organizer/adventures"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Manage Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {adventures.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">
                        {a.name}
                      </h4>
                      <p className="text-slate-400 text-[11px] truncate">
                        {a.destination} • {a.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 block">
                      ₹{a.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {a.availableSeats} Seats left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
