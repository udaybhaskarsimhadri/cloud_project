// Organizer Service for AdventureX Partner Portal
// Manages Organizer Profile, Adventures CRUD, Bookings Management, Calendar, Revenue, and Reviews
// Persisted in localStorage; structured for seamless AWS / REST backend integration.

const ORG_PROFILE_KEY = 'adventurex_organizer_profile';
const ORG_ADVENTURES_KEY = 'adventurex_organizer_adventures';
const ORG_BOOKINGS_KEY = 'adventurex_organizer_bookings';
const ORG_REVIEWS_KEY = 'adventurex_organizer_reviews';

const DEFAULT_ORG_PROFILE = {
  companyName: 'Himalayan Ridge Expeditions',
  organizerName: 'Vikramaditya Rathore',
  email: 'organizer@adventurex.com',
  phone: '+91 98111 22334',
  businessAddress: 'Old Manali Basecamp, Near Hadimba Temple Road, Manali, HP - 175131',
  yearsExperience: 14,
  certifications: [
    'IMF Certified Mountain Leader',
    'UIAGM Wilderness Guide',
    'Wilderness First Responder (WFR)',
    'ISO 21101 Adventure Safety Auditor'
  ],
  adventureCategories: ['Trekking', 'River Rafting', 'Camping', 'Paragliding'],
  profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  bio: 'Leading high-altitude Himalayan pass crossings, swift-water rafting descents, and mountaineering training courses since 2012. Over 420+ expeditions completed with an unblemished safety record.',
  rating: 4.95,
  totalToursLed: 420,
  verified: true
};

const DEFAULT_ORG_ADVENTURES = [
  {
    id: 'hampta-pass-trek',
    name: 'Hampta Pass Cross-Valley Trek',
    category: 'Trekking',
    destination: 'Manali, Himachal Pradesh',
    difficulty: 'Moderate',
    duration: '5 Days / 4 Nights',
    price: 8999,
    originalPrice: 13500,
    availableSeats: 8,
    totalSeats: 16,
    bookingsCount: 28,
    rating: 4.95,
    status: 'Active',
    ageLimit: '12 to 58 Years',
    maxGroupSize: 16,
    description: 'Hampta Pass is one of the most dramatic crossover treks in the Indian Himalayas, bridging the lush valleys of Kullu with the stark cold desert of Lahaul at 14,065 ft.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    availableDates: ['May 12 - May 16, 2026', 'May 22 - May 26, 2026', 'Jun 05 - Jun 09, 2026'],
    equipmentIncluded: ['Sleeping tents', 'Thermal sleeping bags', 'Crampons', 'Trekking poles', 'First aid kit'],
    safetyGuidelines: 'Oxygen cylinders and satellite SOS units carried on all high-pass days.',
    cancellationPolicy: '100% refund up to 15 days prior. 50% refund between 7-14 days.'
  },
  {
    id: 'solang-paragliding',
    name: 'Solang High-Glide Paragliding Flight',
    category: 'Paragliding',
    destination: 'Solang Valley, Himachal Pradesh',
    difficulty: 'Easy',
    duration: '1 Day',
    price: 3499,
    originalPrice: 4500,
    availableSeats: 12,
    totalSeats: 20,
    bookingsCount: 45,
    rating: 4.88,
    status: 'Active',
    ageLimit: '10 to 65 Years',
    maxGroupSize: 20,
    description: 'High-thermal tandem paragliding from 8,500 ft with panoramic Pir Panjal peaks and Rohtang views.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    availableDates: ['May 15, 2026', 'May 20, 2026', 'Jun 01, 2026'],
    equipmentIncluded: ['Certified Tandem Glider', 'UIAA High-Impact Helmet', 'Action Camera footage'],
    safetyGuidelines: 'Certified tandem pilots with minimum 1,500 logged flying hours.',
    cancellationPolicy: 'Full refund or date reschedule if weather conditions prevent safe flying.'
  },
  {
    id: 'rishikesh-river-rafting',
    name: 'Ganges White-Water Rapids Grade IV',
    category: 'River Rafting',
    destination: 'Rishikesh, Uttarakhand',
    difficulty: 'Challenging',
    duration: '2 Days / 1 Night',
    price: 4999,
    originalPrice: 7000,
    availableSeats: 6,
    totalSeats: 18,
    bookingsCount: 36,
    rating: 4.92,
    status: 'Active',
    ageLimit: '14 to 55 Years',
    maxGroupSize: 18,
    description: 'Navigate thrilling Grade III & IV rapids including The Wall, Roller Coaster, and Golf Course on the holy Ganges.',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
    availableDates: ['Jun 02 - Jun 03, 2026', 'Jun 10 - Jun 11, 2026'],
    equipmentIncluded: ['Rescue-grade PFD vest', 'Whitewater paddle', 'Helmets', 'Safety kayak support'],
    safetyGuidelines: 'Professional river guide escort and mandatory swim test briefing.',
    cancellationPolicy: '100% refund up to 7 days prior.'
  },
  {
    id: 'zanskar-frozen-chadar',
    name: 'Chadar Frozen River Ice Trek',
    category: 'Trekking',
    destination: 'Leh Ladakh',
    difficulty: 'Extreme',
    duration: '9 Days / 8 Nights',
    price: 18500,
    originalPrice: 24000,
    availableSeats: 0,
    totalSeats: 12,
    bookingsCount: 12,
    rating: 4.97,
    status: 'Paused',
    ageLimit: '18 to 50 Years',
    maxGroupSize: 12,
    description: 'The legendary sub-zero winter expedition walking across the frozen Zanskar river gorge in -25°C temperatures.',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    availableDates: ['Jan 15 - Jan 23, 2027', 'Feb 01 - Feb 09, 2027'],
    equipmentIncluded: ['Gortex outer layer', 'Spikes', 'Double-walled tents', 'Hyperbaric bag'],
    safetyGuidelines: 'Mandatory 3-day medical acclimatization check in Leh prior to departure.',
    cancellationPolicy: 'Non-refundable within 30 days due to government permit clearances.'
  }
];

const DEFAULT_ORG_BOOKINGS = [
  {
    id: 'ADV-2026-92841',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@example.com',
    customerPhone: '+44 7700 900077',
    adventureId: 'hampta-pass-trek',
    adventureName: 'Hampta Pass Cross-Valley Trek',
    travelDate: 'May 12, 2026',
    seats: 2,
    amount: 17282,
    status: 'Confirmed',
    bookedOn: 'Apr 10, 2026',
    paymentStatus: 'Paid',
    notes: 'Requested vegan catering for 1 traveler.'
  },
  {
    id: 'ADV-2026-88102',
    customerName: 'Marcus Vance',
    customerEmail: 'marcus.v@example.com',
    customerPhone: '+1 415 555 0192',
    adventureId: 'solang-paragliding',
    adventureName: 'Solang High-Glide Paragliding Flight',
    travelDate: 'May 18, 2026',
    seats: 1,
    amount: 3720,
    status: 'Pending',
    bookedOn: 'Apr 18, 2026',
    paymentStatus: 'Pending Verification',
    notes: 'Requested morning thermal flight slot.'
  },
  {
    id: 'ADV-2026-65412',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@example.com',
    customerPhone: '+91 98200 12345',
    adventureId: 'rishikesh-river-rafting',
    adventureName: 'Ganges White-Water Rapids Grade IV',
    travelDate: 'Jun 05, 2026',
    seats: 4,
    amount: 19996,
    status: 'Confirmed',
    bookedOn: 'Apr 20, 2026',
    paymentStatus: 'Paid',
    notes: 'Corporate group of 4; all certified swimmers.'
  },
  {
    id: 'ADV-2026-44190',
    customerName: 'Rahul Sen',
    customerEmail: 'rahul.sen@example.com',
    customerPhone: '+91 98450 99887',
    adventureId: 'hampta-pass-trek',
    adventureName: 'Hampta Pass Cross-Valley Trek',
    travelDate: 'Jun 12, 2026',
    seats: 2,
    amount: 17998,
    status: 'Pending',
    bookedOn: 'Apr 21, 2026',
    paymentStatus: 'Pending Verification',
    notes: 'First-time Himalayan trekker.'
  },
  {
    id: 'ADV-2026-31209',
    customerName: 'David Miller',
    customerEmail: 'david.m@example.com',
    customerPhone: '+61 400 123 456',
    adventureId: 'solang-paragliding',
    adventureName: 'Solang High-Glide Paragliding Flight',
    travelDate: 'May 20, 2026',
    seats: 2,
    amount: 6998,
    status: 'Confirmed',
    bookedOn: 'Apr 15, 2026',
    paymentStatus: 'Paid',
    notes: 'Requested GoPro 4K recording package.'
  },
  {
    id: 'ADV-2026-20188',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerPhone: '+91 98765 43210',
    adventureId: 'zanskar-frozen-chadar',
    adventureName: 'Chadar Frozen River Ice Trek',
    travelDate: 'Jan 15, 2026',
    seats: 1,
    amount: 18500,
    status: 'Completed',
    bookedOn: 'Dec 05, 2025',
    paymentStatus: 'Paid',
    notes: 'Successfully summitted and crossed frozen Nerak fall.'
  },
  {
    id: 'ADV-2026-10928',
    customerName: 'Sophie Martin',
    customerEmail: 'sophie.m@example.com',
    customerPhone: '+33 612 345 678',
    adventureId: 'solang-paragliding',
    adventureName: 'Solang High-Glide Paragliding Flight',
    travelDate: 'Apr 15, 2026',
    seats: 2,
    amount: 7440,
    status: 'Cancelled',
    bookedOn: 'Apr 02, 2026',
    paymentStatus: 'Refunded',
    notes: 'Traveler cancelled due to connecting flight rescheduling.'
  }
];

const DEFAULT_ORG_REVIEWS = [
  {
    id: 'rev-1',
    customerName: 'Elena Rostova',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    adventure: 'Hampta Pass Cross-Valley Trek',
    rating: 5,
    date: 'Apr 12, 2026',
    review: 'Vikramaditya and his team are phenomenal guides! The campsite at Shea Goru was breathtaking, safety equipment was top notch, and the food prepared at 14,000 ft was incredible. Truly unforgettable.',
    organizerReply: 'Thank you so much Elena! It was an absolute pleasure leading your group across the pass. Hope to see you on the Pin Parvati route next!'
  },
  {
    id: 'rev-2',
    customerName: 'Aarav Sharma',
    customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    adventure: 'Chadar Frozen River Ice Trek',
    rating: 5,
    date: 'Jan 28, 2026',
    review: 'The extreme winter trek of a lifetime. Vikramaditya’s cold-weather survival instructions and daily health vitals monitoring kept everyone safe in -25°C. 10/10 recommendation.',
    organizerReply: 'Honored Aarav! You tackled the icy sheet with outstanding determination and spirit. Stay adventurous!'
  },
  {
    id: 'rev-3',
    customerName: 'Pooja Iyer',
    customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    adventure: 'Ganges White-Water Rapids Grade IV',
    rating: 5,
    date: 'Mar 22, 2026',
    review: 'The Wall rapid was pure adrenaline! Guides gave clear safety commands and were right there in the safety kayaks. Best rafting experience in Rishikesh.',
    organizerReply: null
  },
  {
    id: 'rev-4',
    customerName: 'Marcus Vance',
    customerPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    adventure: 'Solang High-Glide Paragliding Flight',
    rating: 4.8,
    date: 'Apr 19, 2026',
    review: 'Smooth launch, awesome 20-minute flight time, and the 4K GoPro footage was handed over immediately upon landing. Great professionalism.',
    organizerReply: null
  }
];

export const organizerService = {
  // ---------------- PROFILE ----------------
  getProfile() {
    try {
      if (typeof window === 'undefined') return DEFAULT_ORG_PROFILE;
      const raw = localStorage.getItem(ORG_PROFILE_KEY);
      if (!raw) {
        localStorage.setItem(ORG_PROFILE_KEY, JSON.stringify(DEFAULT_ORG_PROFILE));
        return DEFAULT_ORG_PROFILE;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ORG_PROFILE;
    }
  },

  updateProfile(profileData) {
    try {
      const current = this.getProfile();
      const updated = { ...current, ...profileData };
      localStorage.setItem(ORG_PROFILE_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return profileData;
    }
  },

  // ---------------- ADVENTURES CRUD ----------------
  getAdventures() {
    try {
      if (typeof window === 'undefined') return DEFAULT_ORG_ADVENTURES;
      const raw = localStorage.getItem(ORG_ADVENTURES_KEY);
      if (!raw) {
        localStorage.setItem(ORG_ADVENTURES_KEY, JSON.stringify(DEFAULT_ORG_ADVENTURES));
        return DEFAULT_ORG_ADVENTURES;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ORG_ADVENTURES;
    }
  },

  getAdventureById(id) {
    const list = this.getAdventures();
    return list.find((a) => a.id === id) || null;
  },

  createAdventure(advData) {
    const list = this.getAdventures();
    const id = advData.id || `adv-${Date.now()}`;
    const profile = this.getProfile();
    let activeUser = {};
    try {
      const rawUser = localStorage.getItem('adventurex_auth_user');
      if (rawUser) activeUser = JSON.parse(rawUser);
    } catch (e) {}

    const newAdventure = {
      ...advData,
      id,
      title: advData.name || advData.title,
      organizer: advData.organizer || profile.companyName || activeUser.name || 'Himalayan Ridge Expeditions',
      organizerEmail: advData.organizerEmail || profile.email || activeUser.email || 'organizer@adventurex.com',
      organizerName: advData.organizerName || profile.organizerName || activeUser.name || 'Vikramaditya Rathore',
      organizerId: activeUser.id || 'org_1',
      rating: 5.0,
      bookingsCount: 0,
      status: advData.status || 'Active',
      image: advData.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    };
    const updated = [newAdventure, ...list];
    localStorage.setItem(ORG_ADVENTURES_KEY, JSON.stringify(updated));
    return newAdventure;
  },

  updateAdventure(id, updatedFields) {
    const list = this.getAdventures();
    const updated = list.map((a) => (a.id === id ? { ...a, ...updatedFields } : a));
    localStorage.setItem(ORG_ADVENTURES_KEY, JSON.stringify(updated));
    return updated.find((a) => a.id === id);
  },

  duplicateAdventure(id) {
    const list = this.getAdventures();
    const item = list.find((a) => a.id === id);
    if (!item) return null;

    const copy = {
      ...item,
      id: `${item.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${item.name} (Copy)`,
      bookingsCount: 0,
      status: 'Draft'
    };
    const updated = [copy, ...list];
    localStorage.setItem(ORG_ADVENTURES_KEY, JSON.stringify(updated));
    return copy;
  },

  deleteAdventure(id) {
    const list = this.getAdventures();
    const updated = list.filter((a) => a.id !== id);
    localStorage.setItem(ORG_ADVENTURES_KEY, JSON.stringify(updated));
    return updated;
  },

  // ---------------- BOOKINGS MANAGEMENT ----------------
  getBookings() {
    try {
      if (typeof window === 'undefined') return DEFAULT_ORG_BOOKINGS;
      const raw = localStorage.getItem(ORG_BOOKINGS_KEY);
      if (!raw) {
        localStorage.setItem(ORG_BOOKINGS_KEY, JSON.stringify(DEFAULT_ORG_BOOKINGS));
        return DEFAULT_ORG_BOOKINGS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ORG_BOOKINGS;
    }
  },

  updateBookingStatus(id, newStatus) {
    const list = this.getBookings();
    const updated = list.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    localStorage.setItem(ORG_BOOKINGS_KEY, JSON.stringify(updated));
    return updated.find((b) => b.id === id);
  },

  // ---------------- CALENDAR ----------------
  getCalendarEvents() {
    const bookings = this.getBookings();
    const adventures = this.getAdventures();

    const events = [
      {
        id: 'ev-1',
        title: 'Hampta Pass Batch 1 Departure',
        date: '2026-05-12',
        type: 'departure',
        category: 'Trekking',
        adventureName: 'Hampta Pass Cross-Valley Trek',
        seatsBooked: 14,
        totalSeats: 16,
        color: '#2563EB'
      },
      {
        id: 'ev-2',
        title: 'Hampta Pass Batch 1 Return',
        date: '2026-05-16',
        type: 'return',
        category: 'Trekking',
        adventureName: 'Hampta Pass Cross-Valley Trek',
        color: '#10B981'
      },
      {
        id: 'ev-3',
        title: 'Solang Paragliding High Thermal Day',
        date: '2026-05-18',
        type: 'tour',
        category: 'Paragliding',
        adventureName: 'Solang High-Glide Paragliding Flight',
        seatsBooked: 12,
        totalSeats: 20,
        color: '#F59E0B'
      },
      {
        id: 'ev-4',
        title: 'Ganges White-Water Rapids Launch',
        date: '2026-06-05',
        type: 'departure',
        category: 'River Rafting',
        adventureName: 'Ganges White-Water Rapids Grade IV',
        seatsBooked: 16,
        totalSeats: 18,
        color: '#06B6D4'
      },
      {
        id: 'ev-5',
        title: 'World Environment Day (Eco Trail Clean)',
        date: '2026-06-05',
        type: 'holiday',
        category: 'Eco Event',
        color: '#059669'
      },
      {
        id: 'ev-6',
        title: 'Himachal Tourism Day Special',
        date: '2026-05-24',
        type: 'holiday',
        category: 'Regional Holiday',
        color: '#8B5CF6'
      }
    ];

    return events;
  },

  // ---------------- REVENUE ----------------
  getRevenueData() {
    return {
      totalEarnings: 384500,
      monthlyRevenue: [
        { month: 'Jan', revenue: 74000, bookings: 4 },
        { month: 'Feb', revenue: 18500, bookings: 1 },
        { month: 'Mar', revenue: 42000, bookings: 6 },
        { month: 'Apr', revenue: 68900, bookings: 11 },
        { month: 'May', revenue: 98100, bookings: 15 },
        { month: 'Jun', revenue: 83000, bookings: 12 }
      ],
      revenueByCategory: [
        { category: 'Trekking', percentage: 52, amount: 199940, color: '#2563EB' },
        { category: 'River Rafting', percentage: 24, amount: 92280, color: '#06B6D4' },
        { category: 'Paragliding', percentage: 14, amount: 53830, color: '#F59E0B' },
        { category: 'Camping', percentage: 10, amount: 38450, color: '#10B981' }
      ],
      topPerformingAdventures: [
        {
          name: 'Hampta Pass Cross-Valley Trek',
          bookings: 28,
          revenue: 251972,
          rating: 4.95,
          category: 'Trekking'
        },
        {
          name: 'Ganges White-Water Rapids Grade IV',
          bookings: 36,
          revenue: 179964,
          rating: 4.92,
          category: 'River Rafting'
        },
        {
          name: 'Solang High-Glide Paragliding Flight',
          bookings: 45,
          revenue: 157455,
          rating: 4.88,
          category: 'Paragliding'
        },
        {
          name: 'Chadar Frozen River Ice Trek',
          bookings: 12,
          revenue: 222000,
          rating: 4.97,
          category: 'Trekking'
        }
      ],
      recentTransactions: [
        {
          txId: 'TXN-2026-991',
          date: 'Apr 21, 2026',
          customer: 'Rahul Sen',
          adventure: 'Hampta Pass Cross-Valley Trek',
          amount: 17998,
          method: 'UPI / Direct Bank',
          status: 'Settled'
        },
        {
          txId: 'TXN-2026-984',
          date: 'Apr 20, 2026',
          customer: 'Priya Patel',
          adventure: 'Ganges White-Water Rapids Grade IV',
          amount: 19996,
          method: 'Credit Card (Simulated)',
          status: 'Settled'
        },
        {
          txId: 'TXN-2026-962',
          date: 'Apr 18, 2026',
          customer: 'Marcus Vance',
          adventure: 'Solang High-Glide Paragliding Flight',
          amount: 3720,
          method: 'NetBanking',
          status: 'Pending'
        },
        {
          txId: 'TXN-2026-921',
          date: 'Apr 10, 2026',
          customer: 'Elena Rostova',
          adventure: 'Hampta Pass Cross-Valley Trek',
          amount: 17282,
          method: 'International Card',
          status: 'Settled'
        }
      ]
    };
  },

  // ---------------- REVIEWS ----------------
  getReviews() {
    try {
      if (typeof window === 'undefined') return DEFAULT_ORG_REVIEWS;
      const raw = localStorage.getItem(ORG_REVIEWS_KEY);
      if (!raw) {
        localStorage.setItem(ORG_REVIEWS_KEY, JSON.stringify(DEFAULT_ORG_REVIEWS));
        return DEFAULT_ORG_REVIEWS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ORG_REVIEWS;
    }
  },

  addOrganizerReply(reviewId, replyText) {
    const list = this.getReviews();
    const updated = list.map((r) => (r.id === reviewId ? { ...r, organizerReply: replyText } : r));
    localStorage.setItem(ORG_REVIEWS_KEY, JSON.stringify(updated));
    return updated;
  },

  // ---------------- STATS AGGREGATION ----------------
  getDashboardStats() {
    const adventures = this.getAdventures();
    const bookings = this.getBookings();
    const rev = this.getRevenueData();
    const reviews = this.getReviews();

    const activeAdventures = adventures.filter((a) => a.status === 'Active').length;
    const upcomingTours = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length;
    const monthlyRev = rev.monthlyRevenue[rev.monthlyRevenue.length - 1]?.revenue || 83000;

    return {
      totalAdventures: adventures.length,
      activeAdventures,
      totalBookings: bookings.length,
      upcomingTours,
      monthlyRevenue: monthlyRev,
      totalEarnings: rev.totalEarnings,
      averageRating: 4.95,
      customerSatisfaction: 99.2,
      recentBookings: bookings.slice(0, 5)
    };
  }
};

export default organizerService;
