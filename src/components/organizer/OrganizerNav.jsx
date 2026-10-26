import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mountain, 
  TicketCheck, 
  Calendar, 
  TrendingUp, 
  Star, 
  UserCheck, 
  PlusCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { organizerService } from '../../services/organizerService';

const OrganizerNav = () => {
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

  useEffect(() => {
    try {
      const bookings = organizerService.getBookings();
      const pending = bookings.filter((b) => b.status === 'Pending').length;
      setPendingBookingsCount(pending);
    } catch {
      // safe fallback
    }
  }, []);

  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/organizer',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'adventures',
      name: 'Manage Adventures',
      path: '/organizer/adventures',
      icon: Mountain,
      badge: null
    },
    {
      id: 'bookings',
      name: 'Bookings',
      path: '/organizer/bookings',
      icon: TicketCheck,
      badge: pendingBookingsCount > 0 ? `${pendingBookingsCount} New` : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      path: '/organizer/calendar',
      icon: Calendar,
      badge: null
    },
    {
      id: 'revenue',
      name: 'Revenue & Analytics',
      path: '/organizer/revenue',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'reviews',
      name: 'Customer Reviews',
      path: '/organizer/reviews',
      icon: Star,
      badge: null
    },
    {
      id: 'profile',
      name: 'Organizer Profile',
      path: '/organizer/profile',
      icon: Building2,
      badge: null
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-16 sm:top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 sm:py-3 gap-2">
          {/* Partner portal brand tag */}
          <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-800 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
              Partner Portal
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/organizer'}
                  className={({ isActive }) =>
                    `px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-1 ring-blue-700/20'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                  {item.badge !== null && (
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-4 text-center leading-tight shadow-sm ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Create Adventure CTA */}
          <Link
            to="/organizer/adventures?action=new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 shrink-0 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Adventure</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizerNav;
