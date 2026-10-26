import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  UserPlus, 
  Mountain, 
  ChevronRight, 
  ChevronDown,
  LogOut, 
  ShieldCheck,
  LayoutDashboard,
  TicketCheck,
  Heart,
  Bell,
  Settings,
  Sparkles,
  Calendar,
  TrendingUp,
  Star,
  Users,
  Building2,
  CreditCard,
  FileText
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { NAV_LINKS } from '../../utils/constants';
import { dashboardService } from '../../services/dashboardService';
import Button from '../common/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const scrollY = useScrollPosition();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const dropdownRef = useRef(null);
  const isScrolled = scrollY > 20;

  // Sync badges for notifications and wishlist
  useEffect(() => {
    try {
      const notifs = dashboardService.getNotifications();
      setUnreadCount(notifs.filter((n) => !n.read).length);
      const wIds = dashboardService.getWishlistIds();
      setWishlistCount(wIds.length);
    } catch (e) {
      // safe fallback
    }
  }, [location.pathname]);

  // Click outside listener to dismiss profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const isCurrentPage = (path) => location.pathname === path;

  const isOrganizer = (user?.role || '').toLowerCase() === 'organizer';
  const isAdmin = (user?.role || '').toLowerCase() === 'admin';

  // Desktop navigation links with dynamic Dashboard destination
  const desktopNavLinks = NAV_LINKS.map((link) => {
    if (link.name === 'Dashboard') {
      return {
        ...link,
        path: isAdmin ? '/admin' : isOrganizer ? '/organizer' : '/dashboard',
        name: isAdmin ? 'Admin Portal' : isOrganizer ? 'Organizer Portal' : 'Dashboard'
      };
    }
    return link;
  });

  // Dropdown navigation menu items for Traveler
  const travelerMenuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'bookings',
      name: 'Bookings',
      path: '/my-bookings',
      icon: TicketCheck,
      badge: null
    },
    {
      id: 'wishlist',
      name: 'Wishlist',
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
      id: 'profile',
      name: 'Profile',
      path: '/profile',
      icon: User,
      badge: null
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  // Dropdown navigation menu items for Organizer
  const organizerMenuItems = [
    {
      id: 'organizer-dashboard',
      name: 'Organizer Dashboard',
      path: '/organizer',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'organizer-adventures',
      name: 'Manage Adventures',
      path: '/organizer/adventures',
      icon: Compass,
      badge: null
    },
    {
      id: 'organizer-bookings',
      name: 'Bookings',
      path: '/organizer/bookings',
      icon: TicketCheck,
      badge: null
    },
    {
      id: 'organizer-calendar',
      name: 'Calendar',
      path: '/organizer/calendar',
      icon: Calendar,
      badge: null
    },
    {
      id: 'organizer-revenue',
      name: 'Revenue',
      path: '/organizer/revenue',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'organizer-reviews',
      name: 'Reviews',
      path: '/organizer/reviews',
      icon: Star,
      badge: null
    },
    {
      id: 'organizer-profile',
      name: 'Organizer Profile',
      path: '/organizer/profile',
      icon: User,
      badge: null
    }
  ];

  // Dropdown navigation menu items for Admin
  const adminMenuItems = [
    {
      id: 'admin-dashboard',
      name: 'Admin Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'admin-users',
      name: 'User Management',
      path: '/admin/users',
      icon: Users,
      badge: null
    },
    {
      id: 'admin-organizers',
      name: 'Organizers',
      path: '/admin/organizers',
      icon: Building2,
      badge: null
    },
    {
      id: 'admin-adventures',
      name: 'Adventures',
      path: '/admin/adventures',
      icon: Mountain,
      badge: null
    },
    {
      id: 'admin-bookings',
      name: 'Bookings',
      path: '/admin/bookings',
      icon: TicketCheck,
      badge: null
    },
    {
      id: 'admin-payments',
      name: 'Payments & Revenue',
      path: '/admin/payments',
      icon: CreditCard,
      badge: null
    },
    {
      id: 'admin-reports',
      name: 'Reports & Audit',
      path: '/admin/reports',
      icon: FileText,
      badge: null
    },
    {
      id: 'admin-settings',
      name: 'Platform Settings',
      path: '/admin/settings',
      icon: Settings,
      badge: null
    }
  ];

  const userMenuItems = isAdmin ? adminMenuItems : isOrganizer ? organizerMenuItems : travelerMenuItems;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-md py-3'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: AdventureX Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group focus:outline-none"
              onClick={() => {
                setMobileMenuOpen(false);
                setDropdownOpen(false);
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Mountain className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    Adventure
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                    X
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 -mt-1">
                  Tourism Platform
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/90 dark:bg-slate-800/90 p-1.5 rounded-full border border-slate-300/80 dark:border-slate-700 backdrop-blur-sm">
              {desktopNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 lg:px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions (Role Shortcuts, Theme, Profile Dropdown, Mobile Menu Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Traveler Shortcuts: Wishlist & Notifications */}
              {!isOrganizer && !isAdmin && (
                <>
                  <Link
                    to="/wishlist"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/wishlist')
                        ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 text-rose-600 dark:text-rose-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Saved Wishlist"
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isCurrentPage('/wishlist') ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/notifications"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/notifications')
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Expedition Notifications"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {/* Organizer Shortcuts: Calendar & Bookings */}
              {isOrganizer && !isAdmin && (
                <>
                  <Link
                    to="/organizer/calendar"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/organizer/calendar')
                        ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Expedition Calendar"
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>

                  <Link
                    to="/organizer/bookings"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/organizer/bookings')
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Guest Bookings"
                  >
                    <TicketCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </>
              )}

              {/* Admin Shortcuts: Command Console & Settings */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/admin')
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-300 text-purple-600 dark:text-purple-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Admin Command Console"
                  >
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </Link>

                  <Link
                    to="/admin/settings"
                    className={`relative p-2 sm:p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isCurrentPage('/admin/settings')
                        ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-300 text-purple-600 dark:text-purple-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700'
                    }`}
                    title="Platform Settings"
                  >
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </>
              )}

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2 sm:p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors focus:outline-none cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
                )}
              </button>

              {/* User Profile Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                {isAuthenticated && user ? (
                  /* Authenticated User Trigger Pill */
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-2 pl-2 pr-2.5 sm:pr-3 py-1.5 rounded-2xl border transition-all cursor-pointer ${
                      dropdownOpen
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 ring-2 ring-blue-500/25 shadow-sm'
                        : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                      alt={user.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover ring-2 ring-blue-500/30"
                    />
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {user.name}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 capitalize -mt-0.5">
                        {user.role || 'Traveler'}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                ) : (
                  /* Guest User Trigger / Actions */
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                        dropdownOpen
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 text-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                      }`}
                      title="User Menu"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="hidden sm:inline">Account</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <Button
                      variant="primary"
                      size="sm"
                      className="hidden sm:inline-flex shadow-sm"
                      icon={UserPlus}
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </Button>
                  </div>
                )}

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-64 sm:w-72 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden"
                    >
                      {/* Header with User Info */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/50 dark:to-indigo-950/30 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                            alt={user?.name || 'Explorer'}
                            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-sm"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-extrabold text-[#0F172A] dark:text-white truncate">
                              {user?.name || (isAdmin ? 'System Administrator' : isOrganizer ? 'Himalayan Expeditions Team' : 'Aarav Sharma')}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {user?.email || (isAdmin ? 'admin@adventurex.com' : isOrganizer ? 'organizer@adventurex.com' : 'traveler@adventurex.com')}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>{isAdmin ? 'Super Administrator' : isOrganizer ? 'Certified Host Partner' : 'Alpine Member'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Items (Highlight active page) */}
                      <div className="p-2 space-y-0.5 text-xs">
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          const active = isCurrentPage(item.path);

                          return (
                            <Link
                              key={item.id}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition-colors cursor-pointer ${
                                active
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-l-4 border-blue-600'
                                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className={`w-4 h-4 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                                <span>{item.name}</span>
                              </div>

                              {item.badge !== null && (
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer: Logout or Auth Buttons */}
                      <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                        {isAuthenticated && user ? (
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout from Account</span>
                          </button>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 p-1">
                            <button
                              type="button"
                              onClick={() => {
                                setDropdownOpen(false);
                                navigate('/login');
                              }}
                              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white text-center"
                            >
                              Login
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDropdownOpen(false);
                                navigate('/register');
                              }}
                              className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white text-center shadow-sm"
                            >
                              Register
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto"
            >
              {/* Primary Navigation Links */}
              <div className="flex flex-col space-y-1 pt-1">
                {desktopNavLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </NavLink>
                ))}
              </div>

              {/* Account Section in Mobile Menu */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block px-4 mb-2">
                  {isAdmin ? 'Super Administrator Console' : isOrganizer ? 'Organizer Portal & Management' : 'Explorer Account & Dashboard'}
                </span>

                <div className="space-y-1">
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isCurrentPage(item.path);

                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                          active
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-l-4 border-blue-600'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </div>

                        {item.badge !== null && (
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Auth Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/30"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 capitalize">
                          Role: {user.role || 'Traveler'}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      fullWidth
                      icon={LogOut}
                      onClick={handleLogout}
                      className="text-rose-600 border-rose-200 hover:bg-rose-50"
                    >
                      Logout from Account
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      fullWidth
                      icon={User}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Login to Account
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      icon={UserPlus}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/register');
                      }}
                    >
                      Create Free Account
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
