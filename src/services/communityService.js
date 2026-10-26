// AdventureX Community & Engagement Service
// Manages Reviews & Ratings, Community Posts, Follow System, Enhanced Wishlist,
// Notifications, Loyalty Program, Referral System, Badges, Events, and Activity Feed.
// Clean architecture ready for future AWS integration (API Gateway, DynamoDB, S3, Cognito).

import { ADVENTURES_DATA } from '../data/adventuresData';

const POSTS_KEY = 'adventurex_community_posts';
const REVIEWS_KEY = 'adventurex_reviews';
const FOLLOWS_KEY = 'adventurex_follows';
const WISHLIST_ENHANCED_KEY = 'adventurex_enhanced_wishlist';
const NOTIFICATIONS_KEY = 'adventurex_notifications';
const LOYALTY_KEY = 'adventurex_loyalty_data';
const REFERRAL_KEY = 'adventurex_referral_data';
const BADGES_KEY = 'adventurex_badges_data';
const EVENTS_KEY = 'adventurex_community_events';
const ACTIVITY_FEED_KEY = 'adventurex_activity_feed';

// ============================================================================
// DEFAULT SEED DATA
// ============================================================================

const DEFAULT_POSTS = [
  {
    id: 'post-1',
    author: {
      id: 'usr-1',
      name: 'Rohan Mehra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Mountain Explorer',
      role: 'traveler'
    },
    title: 'Surreal Sunset at Shea Goru Campsite (12,900 ft)',
    content: 'Just returned from the Hampta Pass expedition! The glacial river crossing was freezing cold but our guide Vikramaditya ensured 100% safety with technical harness lines. The transition from Kullu lush greens to Spiti cold desert was spellbinding!',
    adventureTag: 'Hampta Pass Cross-Valley Trek',
    adventureId: 'hampta-pass-trek',
    category: 'Trekking',
    location: 'Lahaul Valley, Himachal Pradesh',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    likes: 42,
    likedBy: ['usr-current'],
    commentsCount: 6,
    isFeatured: true,
    createdAt: '2026-10-24T14:30:00.000Z',
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Pooja Hegde',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
        },
        text: 'Did you need microspikes on pass day? Planning to go in two weeks!',
        createdAt: '2026-10-24T16:00:00.000Z'
      },
      {
        id: 'c-2',
        author: {
          name: 'Rohan Mehra',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        text: 'Yes! The organizer provided gaiters and microspikes at basecamp. Essential for morning snow patches.',
        createdAt: '2026-10-24T16:45:00.000Z'
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      id: 'usr-2',
      name: 'Aditi Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      badge: 'Rafting Veteran',
      role: 'traveler'
    },
    title: 'Conquering "The Wall" Rapids in Rishikesh!',
    content: 'Tackled Grade IV rapids with the AdventureX certified crew yesterday. Pure adrenaline! Highly recommend taking the riverside cliff jumping option at Magpie camp.',
    adventureTag: 'Ganga White Water Rapids',
    adventureId: 'ganga-white-water-rapids',
    category: 'River Rafting',
    location: 'Rishikesh, Uttarakhand',
    images: [
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80'
    ],
    likes: 29,
    likedBy: [],
    commentsCount: 3,
    isFeatured: false,
    createdAt: '2026-10-25T09:15:00.000Z',
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Karan Singhania',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        },
        text: 'Was the water temperature manageable with wetsuits?',
        createdAt: '2026-10-25T11:20:00.000Z'
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      id: 'org-vikram',
      name: 'Vikramaditya Rathore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'Certified Master Guide',
      role: 'organizer',
      company: 'Himalayan Ridge Expeditions'
    },
    title: 'Trail Advisory: Early Snowfall on Pin Parvati Ridge',
    content: 'All upcoming November groups please note: Temperatures are dropping to -14°C at night. Ensure 4-season down sleeping bags (-10°C comfort rating) and waterproof alpine outer shells.',
    adventureTag: 'Pin Parvati High Pass',
    adventureId: 'pin-parvati-high-pass-trek',
    category: 'Safety & Trail Advisory',
    location: 'Parvati Valley, Himachal Pradesh',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
    ],
    likes: 84,
    likedBy: ['usr-current'],
    commentsCount: 8,
    isFeatured: true,
    createdAt: '2026-10-25T18:00:00.000Z',
    comments: []
  }
];

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    adventureId: 'hampta-pass-trek',
    adventureName: 'Hampta Pass Cross-Valley Trek',
    userId: 'usr-current',
    userName: 'Aarav Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    userBadge: 'Mountain Explorer',
    rating: 5,
    title: 'Life changing experience and pristine camps!',
    comment: 'The views at Chandratal and the pass crossing were otherworldly. Guides were patient, meals were hot and delicious even at 13,000 feet, and the pulse oximeter check twice daily gave immense confidence.',
    tripDate: 'October 2026',
    verifiedBooking: true,
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 18,
    likedBy: [],
    status: 'approved', // 'approved' | 'pending' | 'flagged'
    createdAt: '2026-10-22T10:00:00.000Z',
    organizerReply: {
      author: 'Vikramaditya Rathore (Himalayan Ridge)',
      text: 'Thank you so much Aarav! It was an absolute pleasure having you on the pass. See you on the Chadar trail next winter!',
      repliedAt: '2026-10-22T15:30:00.000Z'
    }
  },
  {
    id: 'rev-2',
    adventureId: 'solang-paragliding',
    adventureName: 'Solang Valley High Fly Tandem Paragliding',
    userId: 'usr-3',
    userName: 'Neha Singhal',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    userBadge: 'First Adventure',
    rating: 5,
    title: 'Adrenaline rush above the pine tops!',
    comment: 'Pilot was ex-Air Force and made me feel completely relaxed. The GoPro 4K recording was crisp. Best ₹3,499 spent in Himachal!',
    tripDate: 'September 2026',
    verifiedBooking: true,
    photos: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80'
    ],
    likes: 12,
    likedBy: [],
    status: 'approved',
    createdAt: '2026-10-18T12:00:00.000Z',
    organizerReply: null
  },
  {
    id: 'rev-3',
    adventureId: 'ganga-white-water-rapids',
    adventureName: 'Ganga White Water Rapids: Marine Drive to Rishikesh',
    userId: 'usr-4',
    userName: 'Vikram Malhotra',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    userBadge: 'Top Traveler',
    rating: 4,
    title: 'Thrilling rapids, slight delay in pickup',
    comment: 'The rapids were exhilarating! High quality life jackets and carbon oars. Pickup from Tapovan was 20 minutes delayed, but the guide made up for it with extra cliff jumps.',
    tripDate: 'October 2026',
    verifiedBooking: true,
    photos: [],
    likes: 7,
    likedBy: [],
    status: 'approved',
    createdAt: '2026-10-20T08:30:00.000Z',
    organizerReply: {
      author: 'Ganga Adventure Hub',
      text: 'Thanks Vikram! We have synchronized our shuttle dispatches from Tapovan to ensure zero future delays.',
      repliedAt: '2026-10-20T11:00:00.000Z'
    }
  }
];

const DEFAULT_FOLLOWS = {
  followingOrganizers: ['org-vikram', 'org-ganga'],
  followingTravelers: ['usr-1', 'usr-2'],
  followers: [
    {
      id: 'f-1',
      name: 'Rohan Mehra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'Mountain Explorer',
      role: 'traveler'
    },
    {
      id: 'f-2',
      name: 'Aditi Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      badge: 'Rafting Veteran',
      role: 'traveler'
    },
    {
      id: 'f-3',
      name: 'Vikramaditya Rathore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      badge: 'Organizer',
      role: 'organizer'
    }
  ]
};

const DEFAULT_ENHANCED_WISHLIST = [
  {
    adventureId: 'hampta-pass-trek',
    category: 'Himalayan Treks',
    priority: 'High',
    notes: 'Aim for June/July batch to see wildflowers in bloom.',
    addedAt: '2026-10-20T10:00:00.000Z'
  },
  {
    adventureId: 'solang-paragliding',
    category: 'Weekend Getaways',
    priority: 'Medium',
    notes: 'Book tandem high fly with GoPro footage.',
    addedAt: '2026-10-22T14:00:00.000Z'
  },
  {
    adventureId: 'zanskar-frozen-chadar',
    category: 'Bucket List',
    priority: 'High',
    notes: 'Complete cold acclimatization cardio prep before Jan.',
    addedAt: '2026-10-24T09:00:00.000Z'
  }
];

const DEFAULT_SMART_NOTIFICATIONS = [
  {
    id: 'notif-101',
    type: 'booking_confirmed',
    title: 'Booking Confirmed!',
    message: 'Your slot for Hampta Pass Cross-Valley Trek is officially confirmed with certified guides.',
    link: '/dashboard',
    unread: true,
    timestamp: '10 minutes ago'
  },
  {
    id: 'notif-102',
    type: 'organizer_replied',
    title: 'Organizer Replied to Your Review',
    message: 'Vikramaditya Rathore replied: "Thank you so much Aarav! It was an absolute pleasure..."',
    link: '/community',
    unread: true,
    timestamp: '1 hour ago'
  },
  {
    id: 'notif-103',
    type: 'review_liked',
    title: 'Review Liked',
    message: 'Neha Singhal and 4 others liked your verified expedition review.',
    link: '/community',
    unread: true,
    timestamp: '3 hours ago'
  },
  {
    id: 'notif-104',
    type: 'coupon_received',
    title: 'Festive Reward Coupon Received',
    message: 'You unlocked coupon "DIWALI500" worth ₹500 off on your next high-altitude trek!',
    link: '/settings',
    unread: false,
    timestamp: '1 day ago'
  },
  {
    id: 'notif-105',
    type: 'ai_recommendation',
    title: 'AI Smart Match Recommendation',
    message: 'Based on your recent interest in high-altitude passes, AI matched "Pin Parvati Trans-Himalayan Trek".',
    link: '/destinations',
    unread: false,
    timestamp: '2 days ago'
  },
  {
    id: 'notif-106',
    type: 'admin_announcement',
    title: 'Admin Trail Safety Advisory',
    message: 'State forest department requires photo ID and medical fitness certificate on all trails above 10,000 ft.',
    link: '/community',
    unread: false,
    timestamp: '3 days ago'
  }
];

const DEFAULT_LOYALTY_DATA = {
  points: 1850,
  tier: 'Silver', // 'Bronze' (0-999) | 'Silver' (1000-2499) | 'Gold' (2500-4999) | 'Platinum' (5000+)
  nextTierPoints: 2500,
  history: [
    { id: 'pts-1', title: 'Hampta Pass Booking Bonus', points: +800, date: '2026-10-22', type: 'earned' },
    { id: 'pts-2', title: 'Verified Review Bonus with Photos', points: +150, date: '2026-10-23', type: 'earned' },
    { id: 'pts-3', title: 'Successful Friend Referral', points: +500, date: '2026-10-24', type: 'earned' },
    { id: 'pts-4', title: 'Discount Coupon Redemption', points: -300, date: '2026-10-25', type: 'redeemed' }
  ],
  availableCoupons: [
    { code: 'POINTS250', discount: 250, cost: 250, title: '₹250 Off Any Adventure' },
    { code: 'POINTS500', discount: 500, cost: 500, title: '₹500 Off Himalayan Treks' },
    { code: 'POINTS1000', discount: 1000, cost: 1000, title: '₹1,000 Off Multi-Day Expeditions' }
  ]
};

const DEFAULT_REFERRAL_DATA = {
  referralCode: 'ADVX-AARAV26',
  inviteLink: 'https://adventurex.in/register?ref=ADVX-AARAV26',
  invitedUsers: 8,
  successfulReferrals: 3,
  bonusPointsEarned: 1500,
  referralList: [
    { name: 'Karan Malhotra', date: '2026-10-15', status: 'Booked Trip', reward: '+500 pts' },
    { name: 'Priya Joshi', date: '2026-10-18', status: 'Booked Trip', reward: '+500 pts' },
    { name: 'Sameer Verma', date: '2026-10-22', status: 'Booked Trip', reward: '+500 pts' },
    { name: 'Ananya Roy', date: '2026-10-24', status: 'Joined', reward: 'Pending booking' }
  ]
};

const DEFAULT_BADGES = [
  {
    id: 'badge-first',
    name: 'First Adventure',
    description: 'Completed your maiden expedition with certified guides.',
    icon: 'Compass',
    earned: true,
    earnedDate: 'October 2026',
    rarity: 'Common'
  },
  {
    id: 'badge-mountain',
    name: 'Mountain Explorer',
    description: 'Summited or crossed high-altitude passes above 12,000 ft.',
    icon: 'Mountain',
    earned: true,
    earnedDate: 'October 2026',
    rarity: 'Rare'
  },
  {
    id: 'badge-camping',
    name: 'Camping Expert',
    description: 'Spent 5+ wilderness nights under zero-light-pollution dark skies.',
    icon: 'Tent',
    earned: true,
    earnedDate: 'October 2026',
    rarity: 'Rare'
  },
  {
    id: 'badge-reviews',
    name: '100 Reviews',
    description: 'Documented 100 helpful verified trail reviews with gear insights.',
    icon: 'Star',
    earned: false,
    progress: 24,
    totalRequired: 100,
    rarity: 'Epic'
  },
  {
    id: 'badge-top-traveler',
    name: 'Top Traveler',
    description: 'Ranked among the top 5% most active adventure explorers in India.',
    icon: 'Award',
    earned: true,
    earnedDate: 'October 2026',
    rarity: 'Epic'
  },
  {
    id: 'badge-legend',
    name: 'Adventure Legend',
    description: 'Conquered 10+ Grade IV expeditions including Chadar and Pin Parvati.',
    icon: 'Crown',
    earned: false,
    progress: 3,
    totalRequired: 10,
    rarity: 'Legendary'
  }
];

const DEFAULT_EVENTS = [
  {
    id: 'evt-1',
    title: 'Himalayan Dark Sky Stargazing Meetup & Camp',
    category: 'Meetup',
    date: 'Nov 14 - Nov 16, 2026',
    location: 'Spiti Valley, Himachal Pradesh',
    host: 'Astrophotography Club & AdventureX',
    seatsLeft: 6,
    price: 4999,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-2',
    title: 'Winter Wilderness Survival & Glacier Safety Workshop',
    category: 'Workshop',
    date: 'Dec 05 - Dec 07, 2026',
    location: 'Manali High Altitude Institute',
    host: 'UIAGM Certified Instructors',
    seatsLeft: 12,
    price: 3499,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'evt-3',
    title: 'Ganga White Water Kayaking & Rescue Webinar',
    category: 'Webinar',
    date: 'Nov 20, 2026 (7:00 PM IST)',
    location: 'Online Live Stream',
    host: 'National Rafting Federation',
    seatsLeft: 85,
    price: 0,
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80'
  }
];

const DEFAULT_ACTIVITY_FEED = [
  {
    id: 'act-1',
    type: 'booking',
    user: 'Rohan Mehra',
    action: 'booked',
    target: 'Hampta Pass Cross-Valley Trek',
    time: '15 minutes ago'
  },
  {
    id: 'act-2',
    type: 'review',
    user: 'Aarav Sharma',
    action: 'rated 5 stars for',
    target: 'Hampta Pass Cross-Valley Trek',
    time: '45 minutes ago'
  },
  {
    id: 'act-3',
    type: 'badge',
    user: 'Aditi Deshmukh',
    action: 'unlocked badge',
    target: 'Mountain Explorer',
    time: '2 hours ago'
  },
  {
    id: 'act-4',
    type: 'follow',
    user: 'Pooja Hegde',
    action: 'started following organizer',
    target: 'Vikramaditya Rathore',
    time: '3 hours ago'
  },
  {
    id: 'act-5',
    type: 'adventure',
    user: 'Himalayan Ridge',
    action: 'opened new winter batch for',
    target: 'Kedarkantha Summit Expedition',
    time: '5 hours ago'
  }
];

// Helper to initialize local storage safely
function getOrInit(key, defaultData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultData;
  }
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error setting ${key} in storage:`, e);
  }
}

// ============================================================================
// COMMUNITY SERVICE API
// ============================================================================

export const communityService = {
  // --------------------------------------------------------------------------
  // 1. REVIEWS & RATINGS
  // --------------------------------------------------------------------------
  getReviews(adventureId = null) {
    const all = getOrInit(REVIEWS_KEY, DEFAULT_REVIEWS);
    if (adventureId) {
      return all.filter((r) => r.adventureId === adventureId);
    }
    return all;
  },

  getAverageRating(adventureId) {
    const reviews = this.getReviews(adventureId);
    if (!reviews || reviews.length === 0) return { rating: 4.9, count: 120 };
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const avg = (sum / reviews.length).toFixed(1);
    return { rating: Number(avg), count: reviews.length };
  },

  addReview({ adventureId, adventureName, rating, title, comment, photos = [], tripDate = 'October 2026' }) {
    const reviews = this.getReviews();
    const newReview = {
      id: 'rev-' + Date.now(),
      adventureId,
      adventureName: adventureName || 'Adventure Expedition',
      userId: 'usr-current',
      userName: 'Aarav Sharma',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      userBadge: 'Mountain Explorer',
      rating: Number(rating) || 5,
      title: title || 'Incredible experience!',
      comment,
      photos: Array.isArray(photos) ? photos : [],
      tripDate,
      verifiedBooking: true,
      likes: 0,
      likedBy: [],
      status: 'approved',
      createdAt: new Date().toISOString(),
      organizerReply: null
    };

    const updated = [newReview, ...reviews];
    setStorage(REVIEWS_KEY, updated);

    // Reward loyalty points for review with photos
    this.addLoyaltyPoints(photos.length > 0 ? 150 : 50, 'Verified Review Submission');

    // Add to activity feed
    this.addActivity({
      type: 'review',
      user: 'Aarav Sharma',
      action: `rated ${rating} stars for`,
      target: adventureName || 'Adventure Expedition'
    });

    return updated;
  },

  updateReview(reviewId, { rating, title, comment, photos }) {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        return {
          ...r,
          rating: rating !== undefined ? Number(rating) : r.rating,
          title: title !== undefined ? title : r.title,
          comment: comment !== undefined ? comment : r.comment,
          photos: photos !== undefined ? photos : r.photos,
          editedAt: new Date().toISOString()
        };
      }
      return r;
    });
    setStorage(REVIEWS_KEY, updated);
    return updated;
  },

  deleteReview(reviewId) {
    const reviews = this.getReviews();
    const updated = reviews.filter((r) => r.id !== reviewId);
    setStorage(REVIEWS_KEY, updated);
    return updated;
  },

  likeReview(reviewId, userId = 'usr-current') {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        const liked = r.likedBy?.includes(userId);
        return {
          ...r,
          likes: liked ? Math.max(0, r.likes - 1) : r.likes + 1,
          likedBy: liked ? r.likedBy.filter((id) => id !== userId) : [...(r.likedBy || []), userId]
        };
      }
      return r;
    });
    setStorage(REVIEWS_KEY, updated);
    return updated;
  },

  replyToReview(reviewId, replyText, organizerName = 'Expedition Leader') {
    const reviews = this.getReviews();
    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        return {
          ...r,
          organizerReply: {
            author: organizerName,
            text: replyText,
            repliedAt: new Date().toISOString()
          }
        };
      }
      return r;
    });
    setStorage(REVIEWS_KEY, updated);

    // Trigger notification
    this.addNotification({
      type: 'organizer_replied',
      title: 'Organizer Replied to Review',
      message: `${organizerName} replied to your review: "${replyText.slice(0, 60)}..."`,
      link: '/community'
    });

    return updated;
  },

  moderateReview(reviewId, newStatus) { // 'approved' | 'flagged' | 'deleted'
    if (newStatus === 'deleted') {
      return this.deleteReview(reviewId);
    }
    const reviews = this.getReviews();
    const updated = reviews.map((r) => (r.id === reviewId ? { ...r, status: newStatus } : r));
    setStorage(REVIEWS_KEY, updated);
    return updated;
  },

  // --------------------------------------------------------------------------
  // 2. COMMUNITY POSTS & DISCUSSIONS
  // --------------------------------------------------------------------------
  getPosts(category = 'All') {
    const all = getOrInit(POSTS_KEY, DEFAULT_POSTS);
    if (!category || category === 'All') return all;
    return all.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
  },

  createPost({ title, content, category = 'Trekking', location = 'Himalayas', adventureTag = '', adventureId = '', images = [] }) {
    const posts = this.getPosts('All');
    const newPost = {
      id: 'post-' + Date.now(),
      author: {
        id: 'usr-current',
        name: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        badge: 'Mountain Explorer',
        role: 'traveler'
      },
      title,
      content,
      adventureTag,
      adventureId,
      category,
      location,
      images: Array.isArray(images) ? images : [],
      likes: 0,
      likedBy: [],
      commentsCount: 0,
      comments: [],
      isFeatured: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newPost, ...posts];
    setStorage(POSTS_KEY, updated);

    // Reward points for community contribution
    this.addLoyaltyPoints(50, 'Community Trip Story Published');

    return updated;
  },

  updatePost(postId, { title, content, category, location, images }) {
    const posts = this.getPosts('All');
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          title: title !== undefined ? title : p.title,
          content: content !== undefined ? content : p.content,
          category: category !== undefined ? category : p.category,
          location: location !== undefined ? location : p.location,
          images: images !== undefined ? images : p.images,
          editedAt: new Date().toISOString()
        };
      }
      return p;
    });
    setStorage(POSTS_KEY, updated);
    return updated;
  },

  deletePost(postId) {
    const posts = this.getPosts('All');
    const updated = posts.filter((p) => p.id !== postId);
    setStorage(POSTS_KEY, updated);
    return updated;
  },

  toggleLikePost(postId, userId = 'usr-current') {
    const posts = this.getPosts('All');
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const liked = p.likedBy?.includes(userId);
        return {
          ...p,
          likes: liked ? Math.max(0, p.likes - 1) : p.likes + 1,
          likedBy: liked ? p.likedBy.filter((id) => id !== userId) : [...(p.likedBy || []), userId]
        };
      }
      return p;
    });
    setStorage(POSTS_KEY, updated);
    return updated;
  },

  addComment(postId, commentText) {
    if (!commentText || !commentText.trim()) return this.getPosts('All');
    const posts = this.getPosts('All');
    const newComment = {
      id: 'c-' + Date.now(),
      author: {
        id: 'usr-current',
        name: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      text: commentText.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        const comments = [...(p.comments || []), newComment];
        return {
          ...p,
          comments,
          commentsCount: comments.length
        };
      }
      return p;
    });

    setStorage(POSTS_KEY, updated);
    return updated;
  },

  featurePost(postId, isFeatured = true) {
    const posts = this.getPosts('All');
    const updated = posts.map((p) => (p.id === postId ? { ...p, isFeatured } : p));
    setStorage(POSTS_KEY, updated);
    return updated;
  },

  // --------------------------------------------------------------------------
  // 3. FOLLOW SYSTEM
  // --------------------------------------------------------------------------
  getFollows() {
    return getOrInit(FOLLOWS_KEY, DEFAULT_FOLLOWS);
  },

  toggleFollowOrganizer(organizerId) {
    const data = this.getFollows();
    const isFollowing = data.followingOrganizers?.includes(organizerId);
    const updated = {
      ...data,
      followingOrganizers: isFollowing
        ? data.followingOrganizers.filter((id) => id !== organizerId)
        : [...(data.followingOrganizers || []), organizerId]
    };
    setStorage(FOLLOWS_KEY, updated);
    return updated;
  },

  toggleFollowTraveler(travelerId) {
    const data = this.getFollows();
    const isFollowing = data.followingTravelers?.includes(travelerId);
    const updated = {
      ...data,
      followingTravelers: isFollowing
        ? data.followingTravelers.filter((id) => id !== travelerId)
        : [...(data.followingTravelers || []), travelerId]
    };
    setStorage(FOLLOWS_KEY, updated);
    return updated;
  },

  // --------------------------------------------------------------------------
  // 4. ENHANCED WISHLIST
  // --------------------------------------------------------------------------
  getEnhancedWishlist() {
    const items = getOrInit(WISHLIST_ENHANCED_KEY, DEFAULT_ENHANCED_WISHLIST);
    // Enrich with actual adventure data
    return items.map((item) => {
      const adv = ADVENTURES_DATA.find((a) => a.id === item.adventureId) || {
        id: item.adventureId,
        name: 'Expedition Package',
        price: 8999,
        destination: 'Himalayas',
        category: 'Trekking',
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'],
        duration: '5 Days / 4 Nights',
        difficulty: 'Moderate'
      };
      return {
        ...adv,
        ...item
      };
    });
  },

  addToEnhancedWishlist(adventureId, category = 'Bucket List', priority = 'Medium', notes = '') {
    const list = getOrInit(WISHLIST_ENHANCED_KEY, DEFAULT_ENHANCED_WISHLIST);
    const existingIndex = list.findIndex((i) => i.adventureId === adventureId);
    let updated;
    if (existingIndex >= 0) {
      updated = list.map((item, idx) => (idx === existingIndex ? { ...item, category, priority, notes } : item));
    } else {
      updated = [...list, { adventureId, category, priority, notes, addedAt: new Date().toISOString() }];
    }
    setStorage(WISHLIST_ENHANCED_KEY, updated);
    return this.getEnhancedWishlist();
  },

  updateWishlistItem(adventureId, updates) {
    const list = getOrInit(WISHLIST_ENHANCED_KEY, DEFAULT_ENHANCED_WISHLIST);
    const updated = list.map((item) => (item.adventureId === adventureId ? { ...item, ...updates } : item));
    setStorage(WISHLIST_ENHANCED_KEY, updated);
    return this.getEnhancedWishlist();
  },

  removeFromEnhancedWishlist(adventureId) {
    const list = getOrInit(WISHLIST_ENHANCED_KEY, DEFAULT_ENHANCED_WISHLIST);
    const updated = list.filter((i) => i.adventureId !== adventureId);
    setStorage(WISHLIST_ENHANCED_KEY, updated);
    return this.getEnhancedWishlist();
  },

  // --------------------------------------------------------------------------
  // 5. SMART NOTIFICATIONS
  // --------------------------------------------------------------------------
  getNotifications() {
    return getOrInit(NOTIFICATIONS_KEY, DEFAULT_SMART_NOTIFICATIONS);
  },

  addNotification({ type, title, message, link = '/dashboard' }) {
    const list = this.getNotifications();
    const newNotif = {
      id: 'notif-' + Date.now(),
      type,
      title,
      message,
      link,
      unread: true,
      timestamp: 'Just now'
    };
    const updated = [newNotif, ...list];
    setStorage(NOTIFICATIONS_KEY, updated);
    return updated;
  },

  markAsRead(id) {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, unread: false } : n));
    setStorage(NOTIFICATIONS_KEY, updated);
    return updated;
  },

  markAllAsRead() {
    const list = this.getNotifications();
    const updated = list.map((n) => ({ ...n, unread: false }));
    setStorage(NOTIFICATIONS_KEY, updated);
    return updated;
  },

  deleteNotification(id) {
    const list = this.getNotifications();
    const updated = list.filter((n) => n.id !== id);
    setStorage(NOTIFICATIONS_KEY, updated);
    return updated;
  },

  clearAllNotifications() {
    setStorage(NOTIFICATIONS_KEY, []);
    return [];
  },

  // --------------------------------------------------------------------------
  // 6. LOYALTY & ADVENTURE POINTS
  // --------------------------------------------------------------------------
  getLoyaltyData() {
    return getOrInit(LOYALTY_KEY, DEFAULT_LOYALTY_DATA);
  },

  addLoyaltyPoints(amount, reason = 'Expedition Reward') {
    const data = this.getLoyaltyData();
    const newTotal = (data.points || 0) + amount;
    
    // Tier calculation: Bronze (0-999), Silver (1000-2499), Gold (2500-4999), Platinum (5000+)
    let newTier = 'Bronze';
    let nextTierPoints = 1000;
    if (newTotal >= 5000) {
      newTier = 'Platinum';
      nextTierPoints = 10000;
    } else if (newTotal >= 2500) {
      newTier = 'Gold';
      nextTierPoints = 5000;
    } else if (newTotal >= 1000) {
      newTier = 'Silver';
      nextTierPoints = 2500;
    }

    const updated = {
      ...data,
      points: newTotal,
      tier: newTier,
      nextTierPoints,
      history: [
        {
          id: 'pts-' + Date.now(),
          title: reason,
          points: +amount,
          date: new Date().toISOString().slice(0, 10),
          type: 'earned'
        },
        ...(data.history || [])
      ]
    };

    setStorage(LOYALTY_KEY, updated);
    return updated;
  },

  redeemPoints(pointsCost, couponCode) {
    const data = this.getLoyaltyData();
    if (data.points < pointsCost) return { success: false, message: 'Insufficient points' };

    const newTotal = data.points - pointsCost;
    const updated = {
      ...data,
      points: newTotal,
      history: [
        {
          id: 'pts-' + Date.now(),
          title: `Redeemed Coupon ${couponCode}`,
          points: -pointsCost,
          date: new Date().toISOString().slice(0, 10),
          type: 'redeemed'
        },
        ...(data.history || [])
      ]
    };

    setStorage(LOYALTY_KEY, updated);
    return { success: true, updated };
  },

  // --------------------------------------------------------------------------
  // 7. REFERRAL SYSTEM
  // --------------------------------------------------------------------------
  getReferralData() {
    return getOrInit(REFERRAL_KEY, DEFAULT_REFERRAL_DATA);
  },

  // --------------------------------------------------------------------------
  // 8. BADGES & ACHIEVEMENTS
  // --------------------------------------------------------------------------
  getBadges() {
    return getOrInit(BADGES_KEY, DEFAULT_BADGES);
  },

  // --------------------------------------------------------------------------
  // 9. EVENTS
  // --------------------------------------------------------------------------
  getEvents() {
    return getOrInit(EVENTS_KEY, DEFAULT_EVENTS);
  },

  // --------------------------------------------------------------------------
  // 10. ACTIVITY FEED
  // --------------------------------------------------------------------------
  getActivityFeed() {
    return getOrInit(ACTIVITY_FEED_KEY, DEFAULT_ACTIVITY_FEED);
  },

  addActivity(activity) {
    const feed = this.getActivityFeed();
    const updated = [
      {
        id: 'act-' + Date.now(),
        time: 'Just now',
        ...activity
      },
      ...feed
    ].slice(0, 20);
    setStorage(ACTIVITY_FEED_KEY, updated);
    return updated;
  }
};
