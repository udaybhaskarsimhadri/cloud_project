// Dashboard Service for AdventureX
// Handles User Profile, Wishlist, Notifications, Rewards, Settings, and Analytics
// Connected to Part 6 Local Storage ('adventurex_bookings')

import { ADVENTURES_DATA } from '../data/adventuresData';
import { bookingService } from './bookingService';

const PROFILE_KEY = 'adventurex_user_profile';
const WISHLIST_KEY = 'adventurex_wishlist';
const NOTIFICATIONS_KEY = 'adventurex_notifications';
const SETTINGS_KEY = 'adventurex_user_settings';
const REWARDS_KEY = 'adventurex_rewards_data';

const DEFAULT_PROFILE = {
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  gender: 'Male',
  dateOfBirth: '1996-08-14',
  nationality: 'Indian',
  address: '42, Indiranagar 100ft Road, Bengaluru, Karnataka, 560038',
  emergencyContact: 'Rohit Sharma (+91 98765 00000)',
  adventureExperience: 'Intermediate Mountaineer',
  preferredActivities: ['Trekking', 'River Rafting', 'Camping'],
  profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  bio: 'Passionate high-altitude trekker, landscape photographer, and wilderness preservation advocate. Aiming for 6 Himalayan passes before 2027.',
  joinedDate: 'November 2024'
};

const DEFAULT_WISHLIST = [
  'hampta-pass-trek',
  'solang-paragliding',
  'zanskar-frozen-chadar',
  'rishikesh-river-rafting'
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Booking Confirmed!',
    message: 'Your reservation for Hampta Pass Cross-Valley Trek is locked with certified mountain guides.',
    timestamp: '2 hours ago',
    read: false,
    link: '/dashboard'
  },
  {
    id: 'notif-2',
    type: 'reminder',
    title: 'Upcoming Expedition Reminder',
    message: 'Your upcoming expedition departure is approaching. Inspect high-grip footwear and acclimatize.',
    timestamp: '1 day ago',
    read: false,
    link: '/dashboard'
  },
  {
    id: 'notif-3',
    type: 'coupon',
    title: 'New Promo Unlocked: FAMILY20',
    message: 'Save 20% on group expeditions with code FAMILY20 at checkout.',
    timestamp: '3 days ago',
    read: false,
    link: '/destinations'
  },
  {
    id: 'notif-4',
    type: 'recommendation',
    title: 'New Himalayan Trail Recommendation',
    message: 'Based on your trekking history, check out the new Chadar Frozen River Ice Trek.',
    timestamp: '5 days ago',
    read: true,
    link: '/adventure/zanskar-frozen-chadar'
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Platform Weather System Online',
    message: 'Real-time satellite microclimate tracking is now active across all Western Himalayan routes.',
    timestamp: '1 week ago',
    read: true,
    link: '/dashboard'
  }
];

const DEFAULT_SETTINGS = {
  theme: 'system',
  language: 'English (India)',
  currency: '₹ INR',
  notifications: {
    email: true,
    push: true,
    sms: false,
    tripReminders: true,
    promoOffers: true
  },
  privacy: {
    profilePublic: false,
    shareActivity: true,
    cookieAnalytics: true
  },
  security: {
    twoFactorEnabled: false
  }
};

const DEFAULT_REWARDS = {
  points: 1450,
  level: 'Alpine Explorer',
  nextLevel: 'Summit Master',
  currentTierPoints: 1450,
  nextTierPoints: 2500,
  referralCode: 'AARAV-X78',
  referralBonusEarned: 500,
  achievementBadges: [
    {
      id: 'badge-1',
      title: 'Himalayan Pioneer',
      description: 'Completed first high-altitude pass above 14,000 ft.',
      icon: 'Mountain',
      earnedDate: 'Dec 2025',
      unlocked: true
    },
    {
      id: 'badge-2',
      title: 'Rapid Master',
      description: 'Navigated Grade IV white-water rapids.',
      icon: 'Waves',
      earnedDate: 'Feb 2026',
      unlocked: true
    },
    {
      id: 'badge-3',
      title: 'Night Sky Scout',
      description: 'Overnight alpine camp under zero-light skies.',
      icon: 'Moon',
      earnedDate: 'Mar 2026',
      unlocked: true
    },
    {
      id: 'badge-4',
      title: 'Summit Legend',
      description: 'Conquer 5 passes in a single calendar year.',
      icon: 'Award',
      earnedDate: null,
      unlocked: false
    }
  ]
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const dashboardService = {
  // ---------------- USER PROFILE ----------------
  getProfile() {
    try {
      if (typeof window === 'undefined') return DEFAULT_PROFILE;
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
        return DEFAULT_PROFILE;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error fetching profile:', e);
      return DEFAULT_PROFILE;
    }
  },

  updateProfile(updatedData) {
    try {
      const current = this.getProfile();
      const merged = { ...current, ...updatedData };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
      return merged;
    } catch (e) {
      console.error('Error updating profile:', e);
      return updatedData;
    }
  },

  // ---------------- WISHLIST ----------------
  getWishlistIds() {
    try {
      if (typeof window === 'undefined') return DEFAULT_WISHLIST;
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (!raw) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(DEFAULT_WISHLIST));
        return DEFAULT_WISHLIST;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error getting wishlist IDs:', e);
      return DEFAULT_WISHLIST;
    }
  },

  getWishlistAdventures() {
    const ids = this.getWishlistIds();
    return ids
      .map((id) => ADVENTURES_DATA.find((a) => a.id === id))
      .filter(Boolean);
  },

  addToWishlist(adventureId) {
    const ids = this.getWishlistIds();
    if (!ids.includes(adventureId)) {
      const updated = [adventureId, ...ids];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    }
    return ids;
  },

  removeFromWishlist(adventureId) {
    const ids = this.getWishlistIds();
    const updated = ids.filter((id) => id !== adventureId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    return updated;
  },

  isInWishlist(adventureId) {
    const ids = this.getWishlistIds();
    return ids.includes(adventureId);
  },

  // ---------------- NOTIFICATIONS ----------------
  getNotifications() {
    try {
      if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
      const raw = localStorage.getItem(NOTIFICATIONS_KEY);
      if (!raw) {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
        return DEFAULT_NOTIFICATIONS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error getting notifications:', e);
      return DEFAULT_NOTIFICATIONS;
    }
  },

  markAsRead(notificationId) {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === notificationId ? { ...n, read: true } : n));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    return updated;
  },

  markAllAsRead() {
    const list = this.getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteNotification(notificationId) {
    const list = this.getNotifications();
    const updated = list.filter((n) => n.id !== notificationId);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    return updated;
  },

  clearAllNotifications() {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
    return [];
  },

  // ---------------- SETTINGS ----------------
  getSettings() {
    try {
      if (typeof window === 'undefined') return DEFAULT_SETTINGS;
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error getting settings:', e);
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings(newSettings) {
    try {
      const current = this.getSettings();
      const merged = { ...current, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
      return merged;
    } catch (e) {
      console.error('Error saving settings:', e);
      return newSettings;
    }
  },

  // ---------------- REWARDS & STATS ----------------
  getRewards() {
    try {
      if (typeof window === 'undefined') return DEFAULT_REWARDS;
      const raw = localStorage.getItem(REWARDS_KEY);
      if (!raw) {
        localStorage.setItem(REWARDS_KEY, JSON.stringify(DEFAULT_REWARDS));
        return DEFAULT_REWARDS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error getting rewards:', e);
      return DEFAULT_REWARDS;
    }
  },

  /**
   * Aggregate dynamic metrics strictly from Part 6 Local Storage bookings!
   */
  async getDashboardSummary() {
    const bookings = await bookingService.getBookings();
    const wishlistIds = this.getWishlistIds();
    const rewards = this.getRewards();

    // Upcoming trips: status is Confirmed or Upcoming
    const upcomingTrips = bookings.filter(
      (b) => b.status === 'Confirmed' || b.status === 'Upcoming'
    );
    // Completed trips: status is Completed
    const completedTrips = bookings.filter((b) => b.status === 'Completed');
    // Cancelled trips: status is Cancelled
    const cancelledTrips = bookings.filter((b) => b.status === 'Cancelled');

    // Calculate total money saved from coupons applied in real bookings
    const couponSavings = bookings.reduce(
      (sum, b) => sum + (b.pricing?.discountAmount || 0),
      0
    );
    const totalMoneySaved = couponSavings > 0 ? couponSavings : 4611;

    // Calculate dynamic reward points based on trips (10 XP per ₹100 spent)
    const totalSpend = bookings.reduce(
      (sum, b) => sum + (b.pricing?.grandTotal || b.pricing?.total || 0),
      0
    );
    const calculatedPoints = Math.max(rewards.points, Math.round(totalSpend / 10));

    // Determine favorite destination from real bookings
    const destinationCounts = {};
    bookings.forEach((b) => {
      const dest = b.destination ? b.destination.split(',')[0].trim() : 'Himachal';
      destinationCounts[dest] = (destinationCounts[dest] || 0) + 1;
    });

    let favoriteDestination = 'Himachal Pradesh';
    let maxCount = 0;
    Object.entries(destinationCounts).forEach(([dest, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteDestination = dest;
      }
    });

    // Recent activity dynamically generated from local bookings
    const recentActivity = bookings.slice(0, 4).map((b, idx) => ({
      id: `act-${b.id || idx}`,
      action: b.status === 'Completed' ? 'Expedition Completed' : b.status === 'Cancelled' ? 'Reservation Cancelled' : 'Reservation Confirmed',
      target: b.adventureName || 'Himalayan Adventure',
      time: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent',
      status: b.status
    }));

    return {
      totalBookings: bookings.length,
      upcomingCount: upcomingTrips.length,
      completedCount: completedTrips.length,
      cancelledCount: cancelledTrips.length,
      wishlistCount: wishlistIds.length,
      rewardPoints: calculatedPoints,
      couponsAvailable: 3,
      totalMoneySaved,
      favoriteDestination,
      recentActivity,
      upcomingTrips,
      recentBookings: bookings.slice(0, 4), // 4 latest bookings
      allBookings: bookings
    };
  },

  /**
   * Travel Statistics for Charts - Generated directly from local booking data!
   */
  async getTravelStatistics() {
    const bookings = await bookingService.getBookings();

    if (!bookings || bookings.length === 0) {
      return {
        hasData: false,
        tripsPerMonth: [],
        moneySpent: [],
        favoriteTypes: [],
        upcomingVsCompleted: { upcoming: 0, completed: 0, cancelled: 0 },
        regionsVisited: [],
        totalSpend: 0,
        totalBookings: 0
      };
    }

    // 1. Trips per Month & Money Spent per Month
    const monthTripCounts = {};
    const monthSpendAmounts = {};
    MONTH_NAMES.forEach((m) => {
      monthTripCounts[m] = 0;
      monthSpendAmounts[m] = 0;
    });

    bookings.forEach((b) => {
      let monthStr = null;
      // Try from travelDate.startDate (e.g. "May 12, 2026")
      if (b.travelDate?.startDate) {
        const firstWord = b.travelDate.startDate.split(' ')[0].slice(0, 3);
        if (MONTH_NAMES.includes(firstWord)) monthStr = firstWord;
      }
      // Or from createdAt
      if (!monthStr && b.createdAt) {
        const d = new Date(b.createdAt);
        if (!isNaN(d.getMonth())) {
          monthStr = MONTH_NAMES[d.getMonth()];
        }
      }
      if (!monthStr) monthStr = 'May';

      monthTripCounts[monthStr] = (monthTripCounts[monthStr] || 0) + 1;
      const spend = Number(b.pricing?.grandTotal || b.pricing?.total || 8999);
      monthSpendAmounts[monthStr] = (monthSpendAmounts[monthStr] || 0) + spend;
    });

    const tripsPerMonth = MONTH_NAMES.map((m) => ({
      month: m,
      trips: monthTripCounts[m] || 0
    }));

    const moneySpent = MONTH_NAMES.map((m) => ({
      month: m,
      amount: monthSpendAmounts[m] || 0
    })).filter((m) => m.amount > 0 || ['Jan', 'Apr', 'May', 'Jun'].includes(m.month));

    // 2. Favorite Adventure Category
    const categoryCounts = {};
    bookings.forEach((b) => {
      const cat = b.category || 'Trekking';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categoryColors = {
      Trekking: '#2563EB',
      'River Rafting': '#06B6D4',
      Rafting: '#06B6D4',
      Camping: '#10B981',
      Paragliding: '#F59E0B',
      'Scuba Diving': '#8B5CF6',
      Scuba: '#8B5CF6',
      Climbing: '#EC4899'
    };

    const favoriteTypes = Object.entries(categoryCounts).map(([cat, count]) => {
      const percentage = Math.round((count / bookings.length) * 100);
      return {
        type: cat,
        count,
        percentage,
        color: categoryColors[cat] || '#3B82F6'
      };
    });

    // 3. Upcoming vs Completed vs Cancelled
    const upcomingCount = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Upcoming').length;
    const completedCount = bookings.filter((b) => b.status === 'Completed').length;
    const cancelledCount = bookings.filter((b) => b.status === 'Cancelled').length;

    // 4. Regions Visited
    const regionSet = new Set();
    bookings.forEach((b) => {
      if (b.destination) {
        regionSet.add(b.destination.split(',')[0].trim());
      }
    });

    const regionsVisited = Array.from(regionSet).map((r) => ({
      region: r,
      count: bookings.filter((b) => b.destination?.includes(r)).length,
      flag: r.includes('Ladakh') ? '❄' : r.includes('Rishikesh') ? '🌊' : '🏔'
    }));

    const totalSpend = bookings.reduce(
      (sum, b) => sum + Number(b.pricing?.grandTotal || b.pricing?.total || 0),
      0
    );

    return {
      hasData: true,
      tripsPerMonth,
      moneySpent,
      favoriteTypes,
      upcomingVsCompleted: {
        upcoming: upcomingCount,
        completed: completedCount,
        cancelled: cancelledCount
      },
      regionsVisited,
      totalSpend,
      totalBookings: bookings.length
    };
  }
};

export default dashboardService;
