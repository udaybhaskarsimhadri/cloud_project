// Comprehensive Booking Data, Coupons, Equipment, and Add-ons for AdventureX

export const EQUIPMENT_CATALOG = [
  {
    id: 'eq-helmet',
    name: 'Safety Climbing Helmet',
    category: 'Safety',
    price: 150,
    perUnit: 'person',
    icon: 'Shield',
    description: 'CE/UIAA certified mountaineering helmet with adjustable chinstrap and ventilation.',
    recommendedFor: ['Trekking', 'Climbing', 'Rafting', 'Caving']
  },
  {
    id: 'eq-lifejacket',
    name: 'High-Buoyancy Life Jacket',
    category: 'Water Sports',
    price: 200,
    perUnit: 'person',
    icon: 'LifeBuoy',
    description: 'ISO-certified Level 100 rescue life vest with safety whistle and reflective bands.',
    recommendedFor: ['Kayaking', 'Rafting', 'Scuba', 'Water Sports']
  },
  {
    id: 'eq-sleeping-bag',
    name: 'Sub-Zero Down Sleeping Bag',
    category: 'Camping',
    price: 250,
    perUnit: 'person',
    icon: 'Moon',
    description: 'Rated down to -10°C, ultra-lightweight goose down fill with waterproof compression sack.',
    recommendedFor: ['Trekking', 'Camping', 'Expedition']
  },
  {
    id: 'eq-tent',
    name: '4-Season Alpine Camping Tent',
    category: 'Camping',
    price: 450,
    perUnit: 'tent (up to 2 guests)',
    icon: 'Tent',
    description: 'Double-walled geodesic structure engineered to withstand 65 km/h high-altitude winds.',
    recommendedFor: ['Camping', 'Trekking']
  },
  {
    id: 'eq-poles',
    name: 'Carbon-Fiber Trekking Poles',
    category: 'Trekking',
    price: 180,
    perUnit: 'pair',
    icon: 'Compass',
    description: 'Quick-lock telescopic carbon-fiber poles with ergonomic EVA foam grips and mud baskets.',
    recommendedFor: ['Trekking', 'Hiking']
  },
  {
    id: 'eq-shoes',
    name: 'Vibram-Sole Mountain Boots',
    category: 'Footwear',
    price: 350,
    perUnit: 'pair',
    icon: 'Footprints',
    description: 'Waterproof Gore-Tex high-ankle boots with deep lugs for treacherous moraine terrains.',
    recommendedFor: ['Trekking', 'Climbing']
  },
  {
    id: 'eq-gps',
    name: 'Garmin Satellite GPS Communicator',
    category: 'Navigation',
    price: 300,
    perUnit: 'unit',
    icon: 'Radio',
    description: 'Interactive SOS device with 100% global Iridium satellite network coverage and topo maps.',
    recommendedFor: ['Trekking', 'Expedition', 'Solo']
  }
];

export const MEAL_OPTIONS = [
  {
    id: 'meal-veg',
    name: 'Vegetarian Feast',
    tag: 'Included',
    price: 0,
    description: 'Wholesome hot meals prepared with locally sourced organic vegetables, lentils, dairy, and grains.',
    dietary: '100% Lacto-Vegetarian'
  },
  {
    id: 'meal-nonveg',
    name: 'Non-Vegetarian',
    tag: '+₹200 / person',
    price: 200,
    description: 'Hearty expeditions with lean poultry, eggs, and freshly caught local fish where available.',
    dietary: 'Includes Poultry & Egg'
  },
  {
    id: 'meal-vegan',
    name: '100% Plant-Based Vegan',
    tag: '+₹150 / person',
    price: 150,
    description: 'Nutrient-dense plant-powered meals, pulses, seeds, nuts, and fresh seasonal mountain produce.',
    dietary: 'Dairy-Free & Egg-Free'
  },
  {
    id: 'meal-standard',
    name: 'No Preference',
    tag: 'Included',
    price: 0,
    description: 'Chef\'s choice expedition buffet catering to balanced carbohydrate and hydration needs.',
    dietary: 'Standard Mountain Fare'
  }
];

export const TRANSPORT_OPTIONS = [
  {
    id: 'trans-pickup',
    name: 'Airport / Rail Hub Pickup & Transfer',
    price: 250,
    description: 'Shared AC 4x4 or tempo transfer directly from the nearest transport junction to basecamp.'
  },
  {
    id: 'trans-self',
    name: 'Self-Arrival at Trailhead Base',
    price: 0,
    description: 'You will arrange your own logistics and rendezvous directly at the designated staging point.'
  }
];

export const INSURANCE_OPTION = {
  id: 'ins-comprehensive',
  name: 'AdventureShield™ Medical & Heli-Evac Cover',
  price: 299,
  coverage: '₹5,00,000 emergency evacuation, medical hospitalization, lost gear and trip cancellation.'
};

export const PROMO_COUPONS = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    description: '10% instant discount on your expedition'
  },
  {
    code: 'STUDENT15',
    discountPercent: 15,
    description: '15% student & youth expedition discount'
  },
  {
    code: 'FAMILY20',
    discountPercent: 20,
    description: '20% group & family discount'
  },
  {
    code: 'ADVENTURE10',
    discountPercent: 10,
    description: '10% seasonal loyalty bonus for summit seekers'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'ADV-2026-89421',
    adventureId: 'hampta-pass-trek',
    adventureName: 'Hampta Pass Cross-Valley Trek',
    adventureImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    destination: 'Manali, Himachal Pradesh',
    category: 'Trekking',
    organizer: {
      name: 'Vikramaditya Rathore',
      company: 'Himalayan Ridge Expeditions'
    },
    travelDate: {
      startDate: 'May 12, 2026',
      endDate: 'May 16, 2026',
      duration: '5 Days / 4 Nights'
    },
    travelers: [
      {
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        phone: '+91 98765 43210',
        age: 28,
        gender: 'Male',
        nationality: 'Indian',
        idType: 'Aadhaar Card',
        emergencyContact: 'Rohit Sharma (+91 98765 00000)',
        medicalConditions: 'Mild dust allergy (carries inhaler)'
      },
      {
        fullName: 'Pooja Verma',
        email: 'pooja.verma@example.com',
        phone: '+91 98765 43211',
        age: 26,
        gender: 'Female',
        nationality: 'Indian',
        idType: 'Passport',
        emergencyContact: 'Rohit Sharma (+91 98765 00000)',
        medicalConditions: 'None'
      }
    ],
    selectedEquipment: [
      { id: 'eq-poles', name: 'Carbon-Fiber Trekking Poles', quantity: 2, price: 18 },
      { id: 'eq-sleeping-bag', name: 'Sub-Zero Down Sleeping Bag', quantity: 2, price: 25 }
    ],
    mealPreference: 'Vegetarian Feast',
    transportation: 'Airport / Rail Hub Pickup & Transfer',
    insuranceIncluded: true,
    pricing: {
      baseRatePerPerson: 8999,
      travelerCount: 2,
      adventureCost: 17998,
      equipmentCost: 86,
      transportCost: 50,
      insuranceCost: 58,
      subtotal: 18192,
      taxes: 909,
      couponCode: 'WELCOME10',
      discountAmount: 1819,
      grandTotal: 17282
    },
    status: 'Confirmed',
    createdAt: '2026-04-10T09:30:00.000Z',
    timeline: [
      { title: 'Booking Confirmed', timestamp: '2026-04-10 09:30 AM', description: 'Expedition reservation locked and verified by AdventureX.' },
      { title: 'Safety Gear Reserved', timestamp: '2026-04-10 11:15 AM', description: 'Mountaineering equipment allocated at Manali basecamp.' },
      { title: 'Logistics Briefing Sent', timestamp: '2026-04-11 02:00 PM', description: 'Trailhead rendezvous packet sent via SMS & email.' },
      { title: 'Expedition Departure', timestamp: 'May 12, 2026', description: 'Reporting at Rambagh Circle staging base at 06:00 AM.' }
    ]
  },
  {
    id: 'ADV-2026-76102',
    adventureId: 'solang-paragliding',
    adventureName: 'Solang High-Glide Paragliding Flight',
    adventureImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    destination: 'Solang Valley, Himachal Pradesh',
    category: 'Paragliding',
    organizer: {
      name: 'Capt. Rakesh Thapa',
      company: 'AeroSky Himalayan Flights'
    },
    travelDate: {
      startDate: 'Jun 20, 2026',
      endDate: 'Jun 20, 2026',
      duration: '1 Day'
    },
    travelers: [
      {
        fullName: 'Elena Rostova',
        email: 'elena.rostova@example.com',
        phone: '+44 7700 900077',
        age: 31,
        gender: 'Female',
        nationality: 'United Kingdom',
        idType: 'Passport',
        emergencyContact: 'Dmitri Rostov (+44 7700 900078)',
        medicalConditions: 'None'
      }
    ],
    selectedEquipment: [
      { id: 'eq-helmet', name: 'Safety Climbing Helmet', quantity: 1, price: 15 }
    ],
    mealPreference: 'No Preference',
    transportation: 'Self-Arrival at Trailhead Base',
    insuranceIncluded: true,
    pricing: {
      baseRatePerPerson: 3499,
      travelerCount: 1,
      adventureCost: 3499,
      equipmentCost: 15,
      transportCost: 0,
      insuranceCost: 29,
      subtotal: 3543,
      taxes: 177,
      couponCode: null,
      discountAmount: 0,
      grandTotal: 3720
    },
    status: 'Upcoming',
    createdAt: '2026-04-18T14:20:00.000Z',
    timeline: [
      { title: 'Booking Confirmed', timestamp: '2026-04-18 02:20 PM', description: 'High-glide slot locked with certified tandem pilot.' },
      { title: 'Weather Window Forecast', timestamp: 'Pending (T-48h)', description: 'Thermal airflow report will be monitored prior to launch.' }
    ]
  },
  {
    id: 'ADV-2025-45129',
    adventureId: 'zanskar-frozen-chadar',
    adventureName: 'Chadar Frozen River Ice Trek',
    adventureImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    destination: 'Leh Ladakh',
    category: 'Trekking',
    organizer: {
      name: 'Tenzing Norbu',
      company: 'Zanskar Winter Nomads'
    },
    travelDate: {
      startDate: 'Jan 15, 2026',
      endDate: 'Jan 23, 2026',
      duration: '9 Days / 8 Nights'
    },
    travelers: [
      {
        fullName: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        phone: '+91 98765 43210',
        age: 28,
        gender: 'Male',
        nationality: 'Indian',
        idType: 'Aadhaar Card',
        emergencyContact: 'Rohit Sharma (+91 98765 00000)',
        medicalConditions: 'None'
      }
    ],
    selectedEquipment: [
      { id: 'eq-sleeping-bag', name: 'Sub-Zero Down Sleeping Bag', quantity: 1, price: 25 },
      { id: 'eq-shoes', name: 'Vibram-Sole Mountain Boots', quantity: 1, price: 35 }
    ],
    mealPreference: 'Vegetarian Feast',
    transportation: 'Airport / Rail Hub Pickup & Transfer',
    insuranceIncluded: true,
    pricing: {
      baseRatePerPerson: 18500,
      travelerCount: 1,
      adventureCost: 18500,
      equipmentCost: 60,
      transportCost: 25,
      insuranceCost: 29,
      subtotal: 18614,
      taxes: 930,
      couponCode: 'STUDENT15',
      discountAmount: 2792,
      grandTotal: 16752
    },
    status: 'Completed',
    createdAt: '2025-12-05T10:10:00.000Z',
    timeline: [
      { title: 'Booking Confirmed', timestamp: '2025-12-05 10:10 AM', description: 'Winter ice slot secured.' },
      { title: 'Expedition Completed', timestamp: '2026-01-23 05:00 PM', description: 'Successfully crossed the frozen Nerak waterfall.' }
    ]
  }
];
