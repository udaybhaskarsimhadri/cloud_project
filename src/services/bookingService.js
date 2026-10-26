// Booking Service for AdventureX
// Manages local persistence via localStorage and provides an async API ready for future backend/AWS integration.

import { 
  INITIAL_BOOKINGS, 
  PROMO_COUPONS, 
  EQUIPMENT_CATALOG, 
  MEAL_OPTIONS, 
  TRANSPORT_OPTIONS, 
  INSURANCE_OPTION 
} from '../data/bookingData';

const STORAGE_KEY = 'adventurex_bookings';
const WISHLIST_KEY = 'adventurex_wishlist';

// Helper to initialize storage
const initializeStorage = () => {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
  }
};

initializeStorage();

export const bookingService = {
  /**
   * Fetch all bookings from local storage
   */
  async getBookings() {
    return new Promise((resolve) => {
      try {
        initializeStorage();
        const raw = localStorage.getItem(STORAGE_KEY);
        const bookings = raw ? JSON.parse(raw) : INITIAL_BOOKINGS;
        // Sort descending by creation or travel date
        resolve(bookings);
      } catch (err) {
        console.error('Error fetching bookings from storage:', err);
        resolve(INITIAL_BOOKINGS);
      }
    });
  },

  /**
   * Fetch a single booking by ID
   */
  async getBookingById(bookingId) {
    const bookings = await this.getBookings();
    return bookings.find((b) => b.id === bookingId) || null;
  },

  /**
   * Create a new booking
   */
  async createBooking(bookingPayload) {
    return new Promise((resolve, reject) => {
      try {
        initializeStorage();
        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        // Generate unique booking ID (ADV-YYYY-XXXXX)
        const year = new Date().getFullYear();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const bookingId = `ADV-${year}-${randomNum}`;

        const newBooking = {
          id: bookingId,
          ...bookingPayload,
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
          timeline: [
            {
              title: 'Booking Confirmed',
              timestamp: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              description: 'Expedition reservation successfully registered and locked in the AdventureX network.'
            },
            {
              title: 'Safety Gear & Logistics Allocated',
              timestamp: 'Pending (T-48h)',
              description: 'Local mountain guides and rental equipment will be prepped at the base staging camp.'
            },
            {
              title: 'Expedition Departure',
              timestamp: bookingPayload.travelDate?.startDate || 'Scheduled Date',
              description: 'Reporting at trailhead staging camp for orientation and briefing.'
            }
          ]
        };

        bookings.unshift(newBooking);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));

        // Requirement: "If user books, Remove from wishlist automatically. (Local logic.)"
        if (bookingPayload.adventureId) {
          this.removeFromWishlist(bookingPayload.adventureId);
        }

        resolve(newBooking);
      } catch (err) {
        console.error('Failed to create booking:', err);
        reject(err);
      }
    });
  },

  /**
   * Cancel an existing booking locally
   */
  async cancelBooking(bookingId, cancelReason = 'Traveler requested cancellation') {
    return new Promise((resolve, reject) => {
      try {
        initializeStorage();
        const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = bookings.findIndex((b) => b.id === bookingId);

        if (index === -1) {
          return reject(new Error('Booking record not found.'));
        }

        const updatedTimeline = [
          ...(bookings[index].timeline || []),
          {
            title: 'Expedition Cancelled',
            timestamp: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            description: `Cancellation processed locally. Reason: ${cancelReason}`
          }
        ];

        bookings[index] = {
          ...bookings[index],
          status: 'Cancelled',
          cancelledAt: new Date().toISOString(),
          cancelReason,
          timeline: updatedTimeline
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        resolve(bookings[index]);
      } catch (err) {
        console.error('Failed to cancel booking:', err);
        reject(err);
      }
    });
  },

  /**
   * Validate promo coupon
   */
  validateCoupon(code, travelerCount = 1, subtotal = 0) {
    if (!code || !code.trim()) {
      return { valid: false, message: 'Please enter a coupon code.' };
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = PROMO_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { valid: false, message: 'Invalid promo code. Try WELCOME10, STUDENT15, or FAMILY20.' };
    }

    const discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);

    return {
      valid: true,
      couponCode: coupon.code,
      discountPercent: coupon.discountPercent,
      discountAmount,
      description: coupon.description,
      message: `Coupon ${coupon.code} applied! ${coupon.discountPercent}% discount active.`
    };
  },

  /**
   * Wishlist helper
   */
  removeFromWishlist(adventureId) {
    try {
      if (typeof window === 'undefined') return;
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) {
        const list = JSON.parse(raw);
        const filtered = list.filter((id) => id !== adventureId);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
      }
    } catch (e) {
      console.warn('Could not update wishlist storage', e);
    }
  },

  getEquipmentCatalog() {
    return EQUIPMENT_CATALOG;
  },

  getMealOptions() {
    return MEAL_OPTIONS;
  },

  getTransportOptions() {
    return TRANSPORT_OPTIONS;
  },

  getInsuranceOption() {
    return INSURANCE_OPTION;
  },

  getPromoCoupons() {
    return PROMO_COUPONS;
  }
};

export default bookingService;
