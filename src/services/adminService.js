/**
 * AdventureX - Super Admin Service
 * Provides centralized local state management & persistence for Part 9 Super Admin Dashboard.
 * Ready for future backend/AWS integration.
 */

const STORAGE_KEY_ADMIN_SETTINGS = 'adventurex_admin_settings';
const STORAGE_KEY_ADMIN_ORGANIZERS = 'adventurex_admin_organizers';
const STORAGE_KEY_ADMIN_ADVENTURES = 'adventurex_admin_adventures';
const STORAGE_KEY_ADMIN_BOOKINGS = 'adventurex_admin_bookings';
const STORAGE_KEY_ADMIN_REVIEWS = 'adventurex_admin_reviews';
const STORAGE_KEY_ADMIN_LOGS = 'adventurex_admin_logs';
const STORAGE_KEY_USERS_DB = 'adventurex_users_database';

// Initial default seed organizers
const DEFAULT_ORGANIZERS = [
  {
    id: 'org_1',
    company: 'Himalayan Expeditions Team',
    organizerName: 'Vikramaditya Rathore',
    email: 'organizer@adventurex.com',
    phone: '+91 98111 22334',
    rating: 4.96,
    reviewsCount: 312,
    verified: true,
    status: 'Approved',
    totalAdventures: 8,
    totalBookings: 184,
    joinedDate: '2025-11-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    location: 'Dehradun, Uttarakhand',
    licenseNo: 'EXP-IND-2025-883'
  },
  {
    id: 'org_2',
    company: 'Western Ghats Alpine Treks',
    organizerName: 'Pooja Kulkarni',
    email: 'pooja@westernghatstreks.in',
    phone: '+91 94220 55432',
    rating: 4.88,
    reviewsCount: 142,
    verified: true,
    status: 'Approved',
    totalAdventures: 5,
    totalBookings: 98,
    joinedDate: '2026-01-05',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    location: 'Pune, Maharashtra',
    licenseNo: 'EXP-IND-2026-119'
  },
  {
    id: 'org_3',
    company: 'Goa Coastal Watersports & Scuba',
    organizerName: 'Captain Anthony Fernandes',
    email: 'anthony@goadiving.com',
    phone: '+91 98221 44321',
    rating: 4.92,
    reviewsCount: 220,
    verified: true,
    status: 'Approved',
    totalAdventures: 4,
    totalBookings: 165,
    joinedDate: '2026-01-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    location: 'Panaji, Goa',
    licenseNo: 'EXP-IND-2026-302'
  },
  {
    id: 'org_4',
    company: 'Zanskar Winter Trails',
    organizerName: 'Tenzin Norbu',
    email: 'norbu@zanskartrails.org',
    phone: '+91 94191 77654',
    rating: 4.95,
    reviewsCount: 89,
    verified: true,
    status: 'Approved',
    totalAdventures: 3,
    totalBookings: 54,
    joinedDate: '2026-02-01',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    location: 'Leh, Ladakh',
    licenseNo: 'EXP-IND-2026-441'
  },
  {
    id: 'org_5',
    company: 'High Altitude Paragliding Club',
    organizerName: 'Rajesh Thakur',
    email: 'rajesh@birparagliding.com',
    phone: '+91 98055 33211',
    rating: 4.79,
    reviewsCount: 64,
    verified: false,
    status: 'Pending',
    totalAdventures: 2,
    totalBookings: 32,
    joinedDate: '2026-02-15',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    location: 'Bir Billing, Himachal Pradesh',
    licenseNo: 'EXP-IND-2026-Pending'
  }
];

// Initial default seed adventures
const DEFAULT_ADVENTURES = [
  {
    id: 'adv_1',
    title: 'Kedarkantha Winter Summit Trek',
    organizer: 'Himalayan Expeditions Team',
    organizerId: 'org_1',
    destination: 'Sankri, Uttarakhand',
    category: 'Trekking',
    price: 8999,
    duration: '5 Days / 4 Nights',
    bookingsCount: 68,
    status: 'Approved',
    featured: true,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_2',
    title: 'Rishikesh Grade IV White-Water Rafting',
    organizer: 'Himalayan Expeditions Team',
    organizerId: 'org_1',
    destination: 'Rishikesh, Uttarakhand',
    category: 'Water Sports',
    price: 3200,
    duration: '2 Days / 1 Night',
    bookingsCount: 82,
    status: 'Approved',
    featured: true,
    rating: 4.90,
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_3',
    title: 'Netrani Island Deep Water Scuba & Snorkeling',
    organizer: 'Goa Coastal Watersports & Scuba',
    organizerId: 'org_3',
    destination: 'Murudeshwar, Karnataka',
    category: 'Scuba Diving',
    price: 5499,
    duration: '1 Full Day',
    bookingsCount: 45,
    status: 'Approved',
    featured: false,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_4',
    title: 'Bir Billing Tandem Paragliding & Camping',
    organizer: 'High Altitude Paragliding Club',
    organizerId: 'org_5',
    destination: 'Bir Billing, Himachal Pradesh',
    category: 'Paragliding',
    price: 4499,
    duration: '2 Days / 1 Night',
    bookingsCount: 39,
    status: 'Approved',
    featured: true,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_5',
    title: 'Chadar Frozen River Winter Expedition',
    organizer: 'Zanskar Winter Trails',
    organizerId: 'org_4',
    destination: 'Zanskar, Ladakh',
    category: 'Trekking',
    price: 24999,
    duration: '8 Days / 7 Nights',
    bookingsCount: 22,
    status: 'Approved',
    featured: true,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_6',
    title: 'Jim Corbett National Park 4x4 Safari',
    organizer: 'Western Ghats Alpine Treks',
    organizerId: 'org_2',
    destination: 'Nainital, Uttarakhand',
    category: 'Safari',
    price: 6800,
    duration: '3 Days / 2 Nights',
    bookingsCount: 31,
    status: 'Approved',
    featured: false,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'adv_7',
    title: 'Spiti Valley High Altitude Astronomy Camp',
    organizer: 'High Altitude Paragliding Club',
    organizerId: 'org_5',
    destination: 'Kaza, Spiti Valley',
    category: 'Camping',
    price: 11499,
    duration: '6 Days / 5 Nights',
    bookingsCount: 4,
    status: 'Pending',
    featured: false,
    rating: 4.70,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80'
  }
];

// Initial default seed bookings
const DEFAULT_BOOKINGS = [
  {
    id: 'ADVX-BK-78921',
    travelerName: 'Aarav Sharma',
    travelerEmail: 'traveler@adventurex.com',
    organizerName: 'Himalayan Expeditions Team',
    organizerId: 'org_1',
    adventureTitle: 'Kedarkantha Winter Summit Trek',
    date: '2026-11-15',
    amount: 18898,
    travelers: 2,
    status: 'Confirmed',
    payoutStatus: 'Paid',
    platformFee: 2835,
    organizerShare: 16063,
    bookingDate: '2026-10-20'
  },
  {
    id: 'ADVX-BK-78922',
    travelerName: 'Meera Nambiar',
    travelerEmail: 'meera.nambiar@gmail.com',
    organizerName: 'Himalayan Expeditions Team',
    organizerId: 'org_1',
    adventureTitle: 'Rishikesh Grade IV White-Water Rafting',
    date: '2026-11-20',
    amount: 3200,
    travelers: 1,
    status: 'Confirmed',
    payoutStatus: 'Paid',
    platformFee: 480,
    organizerShare: 2720,
    bookingDate: '2026-10-21'
  },
  {
    id: 'ADVX-BK-78923',
    travelerName: 'Rohan Deshmukh',
    travelerEmail: 'rohan.d@deshmukh.tech',
    organizerName: 'Goa Coastal Watersports & Scuba',
    organizerId: 'org_3',
    adventureTitle: 'Netrani Island Deep Water Scuba & Snorkeling',
    date: '2026-12-05',
    amount: 10998,
    travelers: 2,
    status: 'Confirmed',
    payoutStatus: 'Pending Payout',
    platformFee: 1650,
    organizerShare: 9348,
    bookingDate: '2026-10-22'
  },
  {
    id: 'ADVX-BK-78924',
    travelerName: 'Sanya Gupta',
    travelerEmail: 'sanya.g@outlook.com',
    organizerName: 'Zanskar Winter Trails',
    organizerId: 'org_4',
    adventureTitle: 'Chadar Frozen River Winter Expedition',
    date: '2027-01-12',
    amount: 49998,
    travelers: 2,
    status: 'Confirmed',
    payoutStatus: 'Pending Payout',
    platformFee: 7500,
    organizerShare: 42498,
    bookingDate: '2026-10-23'
  },
  {
    id: 'ADVX-BK-78925',
    travelerName: 'Kunal Verma',
    travelerEmail: 'kunal.v@yahoo.co.in',
    organizerName: 'Western Ghats Alpine Treks',
    organizerId: 'org_2',
    adventureTitle: 'Jim Corbett National Park 4x4 Safari',
    date: '2026-11-02',
    amount: 6800,
    travelers: 1,
    status: 'Pending',
    payoutStatus: 'Pending Payout',
    platformFee: 1020,
    organizerShare: 5780,
    bookingDate: '2026-10-24'
  },
  {
    id: 'ADVX-BK-78926',
    travelerName: 'Priya Mukherjee',
    travelerEmail: 'priya.m@gmail.com',
    organizerName: 'High Altitude Paragliding Club',
    organizerId: 'org_5',
    adventureTitle: 'Bir Billing Tandem Paragliding & Camping',
    date: '2026-10-28',
    amount: 4499,
    travelers: 1,
    status: 'Cancelled',
    payoutStatus: 'Refunded',
    platformFee: 0,
    organizerShare: 0,
    bookingDate: '2026-10-18'
  }
];

// Initial default seed reviews
const DEFAULT_REVIEWS = [
  {
    id: 'rev_1',
    adventureTitle: 'Kedarkantha Winter Summit Trek',
    travelerName: 'Aarav Sharma',
    travelerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'Unbelievable winter summit! The crampon training and microspikes provided were top tier. Certified leads kept everyone secure through deep snow.',
    status: 'Approved',
    date: '2026-10-22',
    reply: 'Thank you Aarav! Summit day at 12,500 ft was truly magical with our batch.'
  },
  {
    id: 'rev_2',
    adventureTitle: 'Rishikesh Grade IV White-Water Rafting',
    travelerName: 'Meera Nambiar',
    travelerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'Roller Coaster rapid was insane! International standard safety kayaks escorted our boat all the way. Cliff jump at the end was unforgettable.',
    status: 'Approved',
    date: '2026-10-23',
    reply: null
  },
  {
    id: 'rev_3',
    adventureTitle: 'Bir Billing Tandem Paragliding & Camping',
    travelerName: 'Vikram Joshi',
    travelerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 4,
    review: 'Soaring at 8000 ft was breathtaking. The pilot let me steer for a few moments. Camp evening was slightly cold but bonfire made up for it.',
    status: 'Approved',
    date: '2026-10-21',
    reply: null
  },
  {
    id: 'rev_4',
    adventureTitle: 'Netrani Island Deep Water Scuba & Snorkeling',
    travelerName: 'Neha Rao',
    travelerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    rating: 2,
    review: 'Visibility was somewhat foggy due to unexpected current shifts and equipment pickup had a 30-minute delay at the harbor.',
    status: 'Pending',
    date: '2026-10-24',
    reply: null
  }
];

// Initial default seed system logs
const DEFAULT_LOGS = [
  {
    id: 'log_1',
    timestamp: '2026-10-25 21:40:12',
    category: 'Login Activity',
    user: 'admin@adventurex.com',
    action: 'Administrator Sign-In',
    status: 'Success',
    ip: '103.21.144.12'
  },
  {
    id: 'log_2',
    timestamp: '2026-10-25 20:15:00',
    category: 'Adventure Creation',
    user: 'organizer@adventurex.com',
    action: 'Submitted Kedarkantha Batch 4',
    status: 'Success',
    ip: '157.34.201.8'
  },
  {
    id: 'log_3',
    timestamp: '2026-10-25 19:30:22',
    category: 'Booking',
    user: 'Aarav Sharma (usr_traveler_1)',
    action: 'Booking Created: ADVX-BK-78921 (₹18,898)',
    status: 'Confirmed',
    ip: '122.161.42.19'
  },
  {
    id: 'log_4',
    timestamp: '2026-10-25 18:10:45',
    category: 'Registration',
    user: 'priya.m@gmail.com',
    action: 'New Traveler Account Registered',
    status: 'Verified',
    ip: '49.36.120.76'
  },
  {
    id: 'log_5',
    timestamp: '2026-10-25 16:02:18',
    category: 'Admin Action',
    user: 'admin@adventurex.com',
    action: 'Verified Organizer: Western Ghats Alpine Treks',
    status: 'Audit Approved',
    ip: '103.21.144.12'
  }
];

// Initial default platform settings
const DEFAULT_SETTINGS = {
  platformName: 'AdventureX Tourism Platform',
  supportEmail: 'support@adventurex.com',
  defaultCurrency: 'INR (₹)',
  taxPercentage: 18,
  commissionPercentage: 15,
  maintenanceMode: false,
  theme: 'System',
  autoApproveAdventures: false,
  emailNotifications: true,
  payoutCycleDays: 7
};

export const adminService = {
  // -------------------------------------------------------------
  // PLATFORM SETTINGS
  // -------------------------------------------------------------
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ADMIN_SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(newSettings) {
    localStorage.setItem(STORAGE_KEY_ADMIN_SETTINGS, JSON.stringify(newSettings));
    this.addLog('Admin Action', 'admin@adventurex.com', 'Platform Configuration Updated', 'Success');
    return newSettings;
  },

  // -------------------------------------------------------------
  // USERS MANAGEMENT
  // -------------------------------------------------------------
  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
      let users = raw ? JSON.parse(raw) : [];

      if (!users || users.length === 0) {
        // Fallback default users
        users = [
          {
            id: 'usr_traveler_1',
            name: 'Aarav Sharma',
            email: 'traveler@adventurex.com',
            role: 'traveler',
            status: 'Active',
            country: 'India',
            phone: '+91 98765 43210',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            createdAt: '2026-01-15T10:00:00Z',
            bookingsCount: 3
          },
          {
            id: 'usr_organizer_1',
            name: 'Vikramaditya Rathore',
            email: 'organizer@adventurex.com',
            role: 'organizer',
            status: 'Active',
            country: 'India',
            phone: '+91 98111 22334',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            createdAt: '2026-01-10T08:30:00Z',
            bookingsCount: 0
          },
          {
            id: 'usr_admin_1',
            name: 'System Administrator',
            email: 'admin@adventurex.com',
            role: 'admin',
            status: 'Active',
            country: 'India',
            phone: '+91 99999 88888',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
            createdAt: '2025-12-01T00:00:00Z',
            bookingsCount: 0
          },
          {
            id: 'usr_traveler_2',
            name: 'Meera Nambiar',
            email: 'meera.nambiar@gmail.com',
            role: 'traveler',
            status: 'Active',
            country: 'India',
            phone: '+91 98450 11223',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            createdAt: '2026-02-14T11:20:00Z',
            bookingsCount: 1
          },
          {
            id: 'usr_traveler_3',
            name: 'Rohan Deshmukh',
            email: 'rohan.d@deshmukh.tech',
            role: 'traveler',
            status: 'Suspended',
            country: 'India',
            phone: '+91 98200 44556',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            createdAt: '2026-02-18T14:45:00Z',
            bookingsCount: 2
          }
        ];
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      }

      // Ensure every user has a status
      return users.map(u => ({
        ...u,
        status: u.status || 'Active'
      }));
    } catch {
      return [];
    }
  },

  updateUser(id, updates) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      this.addLog('Admin Action', 'admin@adventurex.com', `Updated user: ${users[idx].email}`, 'Success');
      return users[idx];
    }
    return null;
  },

  toggleUserStatus(id) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
      const current = users[idx].status || 'Active';
      const newStatus = current === 'Active' ? 'Suspended' : 'Active';
      users[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      this.addLog('Admin Action', 'admin@adventurex.com', `Changed user status to ${newStatus} for ${users[idx].email}`, 'Success');
      return users[idx];
    }
    return null;
  },

  deleteUser(id) {
    let users = this.getUsers();
    const target = users.find(u => u.id === id);
    users = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
    if (target) {
      this.addLog('Admin Action', 'admin@adventurex.com', `Deleted user account: ${target.email}`, 'Success');
    }
    return true;
  },

  // -------------------------------------------------------------
  // ORGANIZERS MANAGEMENT
  // -------------------------------------------------------------
  getOrganizers() {
    try {
      // 1. Read all registered users from the registration database
      let dbUsers = [];
      try {
        const rawUsers = localStorage.getItem(STORAGE_KEY_USERS_DB);
        if (rawUsers) {
          dbUsers = JSON.parse(rawUsers);
        }
      } catch (e) {
        console.error('Error reading users db:', e);
      }

      // If dbUsers is empty, ensure default organizer account is seeded
      if (!dbUsers || dbUsers.length === 0) {
        dbUsers = [
          {
            id: 'usr_organizer_1',
            name: 'Vikramaditya Rathore',
            company: 'Himalayan Expeditions Team',
            email: 'organizer@adventurex.com',
            role: 'organizer',
            phone: '+91 98111 22334',
            country: 'India',
            status: 'Approved',
            verified: true,
            createdAt: '2026-01-10T08:30:00Z'
          }
        ];
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(dbUsers));
      }

      // 2. Read stored admin organizer records (contains approvals/modifications)
      let storedAdminOrgs = [];
      try {
        const rawAdminOrgs = localStorage.getItem(STORAGE_KEY_ADMIN_ORGANIZERS);
        if (rawAdminOrgs) {
          const parsed = JSON.parse(rawAdminOrgs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            storedAdminOrgs = parsed;
          }
        }
      } catch (e) {
        console.error('Error reading admin organizers:', e);
      }

      // If storedAdminOrgs is empty, start from DEFAULT_ORGANIZERS
      if (storedAdminOrgs.length === 0) {
        storedAdminOrgs = [...DEFAULT_ORGANIZERS];
      }

      // 3. Read organizer profile if customized in the portal
      let orgProfile = null;
      try {
        const rawProfile = localStorage.getItem('adventurex_organizer_profile');
        if (rawProfile) orgProfile = JSON.parse(rawProfile);
      } catch (e) {}

      // 4. Read all adventures (including ones created by organizers) and bookings
      const allAdventures = this.getAdventures();
      const allBookings = this.getBookings();

      // 5. Filter all organizer accounts from the registration database
      const registeredOrganizers = dbUsers.filter(
        (u) => (u.role || '').toLowerCase() === 'organizer'
      );

      // 6. Merge registered organizers into the list
      const mergedOrgsMap = new Map();

      // First load seeded / stored admin organizers by email
      storedAdminOrgs.forEach((org) => {
        const key = (org.email || '').toLowerCase().trim();
        if (key) mergedOrgsMap.set(key, { ...org });
      });

      // Now ensure every single registered organizer from the database is included
      registeredOrganizers.forEach((regUser) => {
        const key = (regUser.email || '').toLowerCase().trim();
        const existing = mergedOrgsMap.get(key);

        if (existing) {
          // Update with latest registration data
          mergedOrgsMap.set(key, {
            ...existing,
            company: existing.company || regUser.company || `${regUser.name}'s Expeditions`,
            organizerName: regUser.name || existing.organizerName,
            phone: regUser.phone || existing.phone,
            avatar: regUser.avatar || existing.avatar,
            location: regUser.country || existing.location,
            status: existing.status || regUser.status || 'Approved',
            email: regUser.email
          });
        } else {
          // Brand new registered organizer! Automatically register into management table
          const newOrg = {
            id: regUser.id || `org_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            company: regUser.company || regUser.companyName || `${regUser.name}'s Expeditions`,
            organizerName: regUser.name || 'Expedition Host',
            email: regUser.email,
            phone: regUser.phone || '+91 98765 43210',
            rating: 5.0,
            reviewsCount: 0,
            verified: regUser.emailVerified || false,
            status: regUser.status || 'Approved',
            totalAdventures: 0,
            totalBookings: 0,
            joinedDate: regUser.createdAt ? regUser.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
            avatar: regUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(regUser.name)}`,
            location: regUser.country || 'India',
            licenseNo: `EXP-IND-${Date.now().toString().slice(-4)}`
          };
          mergedOrgsMap.set(key, newOrg);
        }
      });

      // 7. If active organizer profile exists, enrich organizer@adventurex.com
      if (orgProfile) {
        const key = (orgProfile.email || 'organizer@adventurex.com').toLowerCase().trim();
        const existing = mergedOrgsMap.get(key);
        if (existing) {
          mergedOrgsMap.set(key, {
            ...existing,
            company: orgProfile.companyName || existing.company,
            organizerName: orgProfile.organizerName || existing.organizerName,
            phone: orgProfile.phone || existing.phone,
            rating: orgProfile.rating || existing.rating,
            verified: orgProfile.verified !== undefined ? orgProfile.verified : existing.verified,
            avatar: orgProfile.profilePicture || existing.avatar,
            location: orgProfile.businessAddress || existing.location
          });
        }
      }

      // 8. Dynamically calculate total adventures and bookings for every organizer
      const finalList = Array.from(mergedOrgsMap.values()).map((org) => {
        const orgEmail = (org.email || '').toLowerCase().trim();
        const orgComp = (org.company || org.companyName || '').toLowerCase().trim();
        const orgLead = (org.organizerName || org.name || '').toLowerCase().trim();
        const orgId = org.id;

        // Count matching adventures (including newly created ones)
        const matchingAdventures = allAdventures.filter((adv) => {
          const advOrg = (adv.organizer || adv.company || '').toLowerCase().trim();
          const advEmail = (adv.organizerEmail || '').toLowerCase().trim();
          const advLead = (adv.organizerName || '').toLowerCase().trim();
          const advOrgId = adv.organizerId;

          return (
            (advOrgId && advOrgId === orgId) ||
            (advEmail && advEmail === orgEmail) ||
            (advOrg && orgComp && (advOrg === orgComp || orgComp.includes(advOrg) || advOrg.includes(orgComp))) ||
            (advLead && orgLead && (advLead === orgLead || orgLead.includes(advLead))) ||
            (orgEmail === 'organizer@adventurex.com' && (
              adv.id?.startsWith('hampta') || 
              adv.id?.startsWith('solang') || 
              adv.id?.startsWith('adv_1') || 
              adv.id?.startsWith('adv_2') || 
              advOrg.includes('himalayan')
            ))
          );
        });

        // Count matching bookings
        const matchingBookings = allBookings.filter((b) => {
          const bOrg = (b.organizerName || '').toLowerCase().trim();
          const bEmail = (b.organizerEmail || '').toLowerCase().trim();
          const bOrgId = b.organizerId;

          return (
            (bOrgId && bOrgId === orgId) ||
            (bEmail && bEmail === orgEmail) ||
            (bOrg && orgComp && (bOrg === orgComp || orgComp.includes(bOrg) || bOrg.includes(bOrg))) ||
            (orgEmail === 'organizer@adventurex.com' && (
              b.id?.startsWith('ADV-') || 
              b.id?.includes('78921') || 
              b.id?.includes('78922') ||
              bOrg.includes('himalayan')
            ))
          );
        });

        return {
          ...org,
          company: org.company || org.companyName || `${org.organizerName || 'Partner'}'s Expeditions`,
          organizerName: org.organizerName || org.name || 'Expedition Host',
          phone: org.phone || '+91 98765 43210',
          rating: org.rating || 4.9,
          reviewsCount: org.reviewsCount !== undefined ? org.reviewsCount : 12,
          verified: org.verified !== undefined ? org.verified : (org.status === 'Approved'),
          status: org.status || 'Approved',
          totalAdventures: matchingAdventures.length || org.totalAdventures || 0,
          totalBookings: matchingBookings.length || org.totalBookings || 0
        };
      });

      // Save back merged list to ensure cache integrity
      localStorage.setItem(STORAGE_KEY_ADMIN_ORGANIZERS, JSON.stringify(finalList));
      return finalList;
    } catch (e) {
      console.error('Error fetching synchronized organizers:', e);
      return DEFAULT_ORGANIZERS;
    }
  },

  updateOrganizerStatus(id, newStatus) {
    const orgs = this.getOrganizers();
    const idx = orgs.findIndex(o => o.id === id);
    if (idx !== -1) {
      orgs[idx].status = newStatus;
      if (newStatus === 'Approved') orgs[idx].verified = true;
      if (newStatus === 'Rejected') orgs[idx].verified = false;
      localStorage.setItem(STORAGE_KEY_ADMIN_ORGANIZERS, JSON.stringify(orgs));

      // Synchronize status back to the main users database
      try {
        const rawUsers = localStorage.getItem(STORAGE_KEY_USERS_DB);
        if (rawUsers) {
          const users = JSON.parse(rawUsers);
          const userIdx = users.findIndex(u => 
            u.id === id || 
            (u.email && orgs[idx].email && u.email.toLowerCase() === orgs[idx].email.toLowerCase())
          );
          if (userIdx !== -1) {
            users[userIdx].status = newStatus === 'Suspended' ? 'Suspended' : 'Active';
            if (newStatus === 'Approved') users[userIdx].verified = true;
            localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
          }
        }
      } catch (err) {
        console.error('Error syncing user status:', err);
      }

      this.addLog('Admin Action', 'admin@adventurex.com', `Organizer ${orgs[idx].company} set to ${newStatus}`, 'Success');
      return orgs[idx];
    }
    return null;
  },

  // -------------------------------------------------------------
  // ADVENTURES MANAGEMENT
  // -------------------------------------------------------------
  getAdventures() {
    try {
      let adminAdvs = [];
      const rawAdmin = localStorage.getItem(STORAGE_KEY_ADMIN_ADVENTURES);
      if (rawAdmin) {
        try {
          const parsed = JSON.parse(rawAdmin);
          if (Array.isArray(parsed) && parsed.length > 0) {
            adminAdvs = parsed;
          }
        } catch (e) {}
      }

      if (adminAdvs.length === 0) {
        adminAdvs = [...DEFAULT_ADVENTURES];
      }

      // Also dynamically read adventures created by organizers in Part 8
      let orgAdvs = [];
      try {
        const rawOrg = localStorage.getItem('adventurex_organizer_adventures');
        if (rawOrg) {
          const parsed = JSON.parse(rawOrg);
          if (Array.isArray(parsed)) orgAdvs = parsed;
        }
      } catch (e) {}

      // Organizer active profile for branding
      let orgProfile = null;
      try {
        const rawProf = localStorage.getItem('adventurex_organizer_profile');
        if (rawProf) orgProfile = JSON.parse(rawProf);
      } catch (e) {}

      // Merge organizer adventures into the list
      const advMap = new Map();
      adminAdvs.forEach((a) => advMap.set(a.id, a));

      orgAdvs.forEach((oa) => {
        const id = oa.id || `adv-${Date.now()}`;
        if (!advMap.has(id)) {
          advMap.set(id, {
            id,
            title: oa.name || oa.title || 'Mountain Expedition',
            name: oa.name || oa.title || 'Mountain Expedition',
            organizer: oa.organizer || orgProfile?.companyName || 'Himalayan Ridge Expeditions',
            organizerEmail: oa.organizerEmail || orgProfile?.email || 'organizer@adventurex.com',
            organizerName: oa.organizerName || orgProfile?.organizerName || 'Vikramaditya Rathore',
            organizerId: oa.organizerId || 'org_1',
            destination: oa.destination || 'Himachal Pradesh',
            category: oa.category || 'Trekking',
            price: oa.price || 8999,
            duration: oa.duration || '5 Days / 4 Nights',
            bookingsCount: oa.bookingsCount || 0,
            status: oa.status === 'Active' ? 'Approved' : (oa.status || 'Approved'),
            featured: oa.featured || false,
            rating: oa.rating || 5.0,
            image: oa.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
          });
        }
      });

      const merged = Array.from(advMap.values());
      return merged;
    } catch {
      return DEFAULT_ADVENTURES;
    }
  },

  updateAdventureStatus(id, status) {
    const advs = this.getAdventures();
    const idx = advs.findIndex(a => a.id === id);
    if (idx !== -1) {
      advs[idx].status = status;
      localStorage.setItem(STORAGE_KEY_ADMIN_ADVENTURES, JSON.stringify(advs));
      this.addLog('Admin Action', 'admin@adventurex.com', `Adventure ${advs[idx].title} set to ${status}`, 'Success');
      return advs[idx];
    }
    return null;
  },

  toggleAdventureFeatured(id) {
    const advs = this.getAdventures();
    const idx = advs.findIndex(a => a.id === id);
    if (idx !== -1) {
      advs[idx].featured = !advs[idx].featured;
      localStorage.setItem(STORAGE_KEY_ADMIN_ADVENTURES, JSON.stringify(advs));
      this.addLog('Admin Action', 'admin@adventurex.com', `Adventure ${advs[idx].title} featured=${advs[idx].featured}`, 'Success');
      return advs[idx];
    }
    return null;
  },

  deleteAdventure(id) {
    let advs = this.getAdventures();
    const target = advs.find(a => a.id === id);
    advs = advs.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY_ADMIN_ADVENTURES, JSON.stringify(advs));
    if (target) {
      this.addLog('Admin Action', 'admin@adventurex.com', `Deleted adventure: ${target.title}`, 'Success');
    }
    return true;
  },

  // -------------------------------------------------------------
  // BOOKINGS MANAGEMENT
  // -------------------------------------------------------------
  getBookings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ADMIN_BOOKINGS);
      return data ? JSON.parse(data) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  },

  updateBookingStatus(id, status, refund = false) {
    const bks = this.getBookings();
    const idx = bks.findIndex(b => b.id === id);
    if (idx !== -1) {
      bks[idx].status = status;
      if (refund) {
        bks[idx].payoutStatus = 'Refunded';
      }
      localStorage.setItem(STORAGE_KEY_ADMIN_BOOKINGS, JSON.stringify(bks));
      this.addLog('Admin Action', 'admin@adventurex.com', `Booking ${id} status updated to ${status} ${refund ? '(Refund processed)' : ''}`, 'Success');
      return bks[idx];
    }
    return null;
  },

  // -------------------------------------------------------------
  // REVIEWS MODERATION
  // -------------------------------------------------------------
  getReviews() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ADMIN_REVIEWS);
      return data ? JSON.parse(data) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  },

  updateReviewStatus(id, status) {
    const revs = this.getReviews();
    const idx = revs.findIndex(r => r.id === id);
    if (idx !== -1) {
      revs[idx].status = status;
      localStorage.setItem(STORAGE_KEY_ADMIN_REVIEWS, JSON.stringify(revs));
      this.addLog('Admin Action', 'admin@adventurex.com', `Review #${id} moderated to ${status}`, 'Success');
      return revs[idx];
    }
    return null;
  },

  deleteReview(id) {
    let revs = this.getReviews();
    revs = revs.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY_ADMIN_REVIEWS, JSON.stringify(revs));
    this.addLog('Admin Action', 'admin@adventurex.com', `Deleted review #${id}`, 'Success');
    return true;
  },

  replyReview(id, replyText) {
    const revs = this.getReviews();
    const idx = revs.findIndex(r => r.id === id);
    if (idx !== -1) {
      revs[idx].reply = replyText;
      localStorage.setItem(STORAGE_KEY_ADMIN_REVIEWS, JSON.stringify(revs));
      return revs[idx];
    }
    return null;
  },

  // -------------------------------------------------------------
  // SYSTEM AUDIT LOGS
  // -------------------------------------------------------------
  getLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ADMIN_LOGS);
      return data ? JSON.parse(data) : DEFAULT_LOGS;
    } catch {
      return DEFAULT_LOGS;
    }
  },

  addLog(category, user, action, status = 'Success') {
    try {
      const logs = this.getLogs();
      const newLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        category,
        user,
        action,
        status,
        ip: '103.21.144.12'
      };
      logs.unshift(newLog);
      // Keep recent 100 logs
      if (logs.length > 100) logs.pop();
      localStorage.setItem(STORAGE_KEY_ADMIN_LOGS, JSON.stringify(logs));
      return newLog;
    } catch {
      return null;
    }
  },

  // -------------------------------------------------------------
  // ADMIN ANALYTICS & STATS AGGREGATOR
  // -------------------------------------------------------------
  getOverviewStats() {
    const users = this.getUsers();
    const organizers = this.getOrganizers();
    const adventures = this.getAdventures();
    const bookings = this.getBookings();
    const settings = this.getSettings();

    const totalUsers = users.length;
    const totalOrganizers = organizers.length;
    const totalAdventures = adventures.length;
    const activeAdventures = adventures.filter(a => a.status === 'Approved').length;
    const totalBookings = bookings.length;
    
    // Total gross volume
    const grossRevenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => sum + b.amount, 0);

    // Platform Commission (e.g. 15%)
    const commissionPct = settings.commissionPercentage || 15;
    const platformRevenue = Math.round((grossRevenue * commissionPct) / 100);
    const organizerEarnings = grossRevenue - platformRevenue;

    const pendingApprovals = organizers.filter(o => o.status === 'Pending').length +
      adventures.filter(a => a.status === 'Pending').length;

    const cancelledTrips = bookings.filter(b => b.status === 'Cancelled').length;

    // Average rating
    const avgRating = (adventures.reduce((sum, a) => sum + (a.rating || 4.8), 0) / (adventures.length || 1)).toFixed(2);

    return {
      totalUsers,
      totalOrganizers,
      totalAdventures,
      activeAdventures,
      totalBookings,
      monthlyRevenue: grossRevenue,
      platformRevenue,
      organizerEarnings,
      averageRating: avgRating,
      pendingApprovals,
      cancelledTrips,
      commissionPct
    };
  },

  // -------------------------------------------------------------
  // PAYMENTS SUMMARY
  // -------------------------------------------------------------
  getPaymentsSummary() {
    const bookings = this.getBookings();
    const settings = this.getSettings();
    const commissionPct = settings.commissionPercentage || 15;

    const confirmed = bookings.filter(b => b.status === 'Confirmed');
    const totalRevenue = confirmed.reduce((sum, b) => sum + b.amount, 0);
    const platformCommission = Math.round((totalRevenue * commissionPct) / 100);
    const organizerEarnings = totalRevenue - platformCommission;

    const pendingPayouts = confirmed
      .filter(b => b.payoutStatus === 'Pending Payout')
      .reduce((sum, b) => sum + (b.organizerShare || Math.round(b.amount * 0.85)), 0);

    const refundRequests = bookings
      .filter(b => b.status === 'Cancelled')
      .reduce((sum, b) => sum + b.amount, 0);

    const recentTransactions = bookings.map(b => ({
      id: `TXN-${b.id.replace('ADVX-BK-', '')}`,
      bookingId: b.id,
      traveler: b.travelerName,
      organizer: b.organizerName,
      adventure: b.adventureTitle,
      amount: b.amount,
      platformFee: Math.round(b.amount * (commissionPct / 100)),
      organizerShare: b.amount - Math.round(b.amount * (commissionPct / 100)),
      status: b.payoutStatus || 'Completed',
      date: b.bookingDate || b.date
    }));

    return {
      totalRevenue,
      platformCommission,
      organizerEarnings,
      pendingPayouts,
      refundRequests,
      recentTransactions
    };
  },

  // -------------------------------------------------------------
  // REPORTS GENERATOR
  // -------------------------------------------------------------
  getReports(period = 'monthly') {
    const baseStats = this.getOverviewStats();
    
    const multipliers = {
      daily: { multiplier: 0.05, label: 'Today (24h)' },
      weekly: { multiplier: 0.28, label: 'Current Week' },
      monthly: { multiplier: 1.0, label: 'October 2026' },
      yearly: { multiplier: 9.4, label: 'Year to Date 2026' }
    };

    const current = multipliers[period] || multipliers.monthly;

    return {
      period: current.label,
      newRegistrations: Math.round(baseStats.totalUsers * current.multiplier * 0.6) || 12,
      completedExpeditions: Math.round(baseStats.totalBookings * current.multiplier * 0.8) || 28,
      grossVolume: Math.round(baseStats.monthlyRevenue * current.multiplier),
      netCommission: Math.round(baseStats.platformRevenue * current.multiplier),
      cancellationRate: '3.4%',
      partnerPayouts: Math.round(baseStats.organizerEarnings * current.multiplier)
    };
  }
};

export default adminService;
