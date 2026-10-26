import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Mountain, 
  TicketCheck, 
  Star, 
  CreditCard, 
  FileText, 
  Settings, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const AdminNav = () => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    try {
      const stats = adminService.getOverviewStats();
      setPendingCount(stats.pendingApprovals);
    } catch {
      // safe fallback
    }
  }, []);

  const navItems = [
    {
      id: 'dashboard',
      name: 'Overview',
      path: '/admin',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'users',
      name: 'Users',
      path: '/admin/users',
      icon: Users,
      badge: null
    },
    {
      id: 'organizers',
      name: 'Organizers',
      path: '/admin/organizers',
      icon: Building2,
      badge: null
    },
    {
      id: 'adventures',
      name: 'Adventures',
      path: '/admin/adventures',
      icon: Mountain,
      badge: pendingCount > 0 ? `${pendingCount} Review` : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'bookings',
      name: 'Bookings',
      path: '/admin/bookings',
      icon: TicketCheck,
      badge: null
    },
    {
      id: 'payments',
      name: 'Payments',
      path: '/admin/payments',
      icon: CreditCard,
      badge: null
    },
    {
      id: 'reviews',
      name: 'Reviews',
      path: '/admin/reviews',
      icon: Star,
      badge: null
    },
    {
      id: 'reports',
      name: 'Reports',
      path: '/admin/reports',
      icon: FileText,
      badge: null
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 gap-4">
          
          {/* Left: Platform Admin Identifier */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Super Admin Console
              </span>
              <span className="text-[10px] text-slate-500 font-bold -mt-0.5">
                AdventureX Platform Command
              </span>
            </div>
          </div>

          {/* Center: Scrollable Admin Tab Links */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Status Pill */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
              System Online
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminNav;
