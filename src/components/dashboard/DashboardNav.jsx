import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Heart, 
  Bell, 
  Settings, 
  TicketCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';

const DashboardNav = ({ activeTab = 'overview' }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    try {
      const notifs = dashboardService.getNotifications();
      setUnreadCount(notifs.filter((n) => !n.read).length);
      const wIds = dashboardService.getWishlistIds();
      setWishlistCount(wIds.length);
    } catch (e) {
      console.warn('Could not load counts', e);
    }
  }, []);

  const navItems = [
    {
      id: 'overview',
      name: 'Dashboard Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'profile',
      name: 'User Profile',
      path: '/profile',
      icon: User,
      badge: null
    },
    {
      id: 'wishlist',
      name: 'Saved Wishlist',
      path: '/wishlist',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      id: 'bookings',
      name: 'My Bookings',
      path: '/my-bookings',
      icon: TicketCheck,
      badge: null
    },
    {
      id: 'settings',
      name: 'Settings & Security',
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-16 sm:top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2 sm:py-3 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
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

          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Alpine Member • 1,450 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
