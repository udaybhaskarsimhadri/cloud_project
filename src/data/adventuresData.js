// Comprehensive 30+ Adventures Dataset for AdventureX Adventure Details Module

export const ADVENTURES_DATA = [
  {
    id: 'hampta-pass-trek',
    name: 'Hampta Pass Cross-Valley Trek',
    category: 'Trekking',
    destination: 'Manali, Himachal Pradesh',
    destinationId: 'manali',
    difficulty: 'Moderate',
    duration: '5 Days / 4 Nights',
    price: 8999,
    originalPrice: 13500,
    rating: 4.9,
    reviewsCount: 384,
    organizer: {
      name: 'Vikramaditya Rathore',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Himalayan Ridge Expeditions',
      yearsExperience: 14,
      completedTrips: 420,
      rating: 4.95,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Pahari'],
      about: 'Former Indian Army Mountain Warfare instructor and UIAGM-certified guide with 14 Himalayan pass expeditions completed safely.'
    },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Hampta Pass is one of the most dramatic crossover treks in the Indian Himalayas. Beginning in the lush, pine-fringed valleys of Kullu, it ascends through glacial valleys and narrow gorges to cross over into the stark, barren desert landscapes of Lahaul at 14,065 feet. The contrasting terrains and the turquoise glacial waters of Chandratal make this a bucket-list journey.',
    experienceSummary: 'A 35-kilometer high-altitude crossing that takes you from lush alpine wildflower meadows to cold, moon-like moraines within 5 thrilling days.',
    highlights: [
      'Dramatic pass crossing at 14,065 ft with panoramic Pir Panjal views',
      'Shea Goru riverside camp surrounded by vertical granite cliffs',
      'Excursion to the legendary high-altitude crescent Chandratal Lake',
      'Thrilling glacial stream river-crossing under expert safety supervision',
      'Stargazing beneath zero-light pollution Himalayan dark skies'
    ],
    suitableFor: ['First-time high-altitude trekkers', 'Landscape photographers', 'Solo adventurers', 'Nature lovers'],
    ageRecommendations: '12 to 58 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (steep rocky sections on pass day)',
      duration: '5 Days / 4 Nights',
      groupSize: '8 - 14 Participants per batch',
      minimumAge: '12 Years',
      fitnessLevel: 'Good cardiovascular endurance (capable of walking 5-7 hours daily)',
      languagesSupported: ['English', 'Hindi', 'Pahari'],
      cancellationPolicy: '100% refund up to 15 days prior. 50% refund between 7-14 days. Weather rescheduling guaranteed without fees.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Manali to Jobra Drive & Trek to Chika',
        description: 'Meet at Manali Basecamp (2,050m) early morning. Scenic mountain drive to Jobra followed by a gentle 2-hour acclimatization trek through pine and birch forests to Chika campsite.',
        activities: ['Gear inspection & health vitals check', 'Scenic 45-minute drive past Prini village', 'Camp setup beside Rani Nullah stream', 'Evening orientation and acclimatization walk']
      },
      {
        day: 2,
        title: 'Chika to Balu Ka Ghera',
        description: 'Trek along the boulder-strewn river valley toward Balu Ka Ghera (3,700m). Cross vibrant rhododendron patches and multiple snowmelt streams.',
        activities: ['Morning stretching & briefing', 'Stream crossing with guide safety line', 'Traversing sandy riverbeds', 'Night camping on alpine moraines under Dhauladhar peaks']
      },
      {
        day: 3,
        title: 'Pass Day: Balu Ka Ghera to Shea Goru via Hampta Pass',
        description: 'The big summit day. An early 5:00 AM start ascending zig-zag snow ridges to Hampta Pass (4,287m / 14,065ft). Descend down into the serene Lahaul Valley.',
        activities: ['Steep snow & scree ascent to the ridge', 'Celebration & panoramic photos at Hampta Pass', 'Technical descent on microspikes', 'Camp at Shea Goru, the coldest campsite of the trek']
      },
      {
        day: 4,
        title: 'Shea Goru to Chatru & Drive to Chandratal Lake',
        description: 'Cross the chilly glacial stream at Shea Goru early morning. Descend down to the roadhead at Chatru. Drive to the breathtaking crescent-shaped Chandratal Lake.',
        activities: ['Cold-water stream crossing protocol', 'Scenic descent into Chandra River basin', 'Jeep ride along rugged Spiti road to Chandratal', 'Sunset photography by the turquoise lake']
      },
      {
        day: 5,
        title: 'Chatru to Manali via Atal Tunnel',
        description: 'Wake up to crisp morning tea at Chatru. Embark on the return drive to Manali through the world-famous Atal Tunnel, concluding the expedition by 3:00 PM.',
        activities: ['Breakfast & certificate presentation', 'Drive through Atal Tunnel (9.02 km)', 'Drop-off at Manali Mall Road with fond memories']
      }
    ],
    whatsIncluded: [
      'All 4 nights accommodation in high-grade 4-season alpine tents (twin sharing)',
      'All meals from Day 1 lunch to Day 5 breakfast (vegetarian, high-calorie)',
      'Certified UIAGM / BMC Trek Leader and local mountain support staff',
      'Microspikes, gaiters, and technical ropes for pass crossing',
      'Oxygen cylinder, pulse oximeter, and comprehensive wilderness first-aid kit',
      'State forest permits and ecological camping fees',
      'Drop and pickup transportation between Manali and trailheads'
    ],
    notIncluded: [
      'Travel insurance and high-altitude medical evacuation coverage',
      'Offloading of personal backpack (available for ₹2,500 extra)',
      'Personal trekking gear (boots, down jackets, poles)',
      'Any extra meals or snacks purchased at wayside dhabas',
      'Tips and gratuities for mountain support crew'
    ],
    whatToBring: [
      '45-55L Waterproof Rucksack with rain cover',
      'Sturdy high-ankle trekking boots with deep lug soles',
      '3-layer thermal clothing: base layer, fleece, and down jacket (-10°C rated)',
      'Waterproof trekking pants & windcheater jacket',
      'UV 400 polarized sunglasses and lip balm SPF 30+',
      'Two 1-liter reusable water flasks',
      'LED Headlamp with spare rechargeable batteries',
      'Personal medication and blister care kit'
    ],
    safetyGuidelines: {
      medicalAdvice: 'Diamox is recommended for altitude sickness upon consultation with your physician. Daily oxygen and pulse checks are mandatory.',
      emergencyContacts: 'Local Search & Rescue HQ: +91 1902-252244 | AdventureX 24x7 Dispatch: 1800-112-999',
      fitnessRequirements: 'Should be able to run 4 km in 30 minutes without breathlessness before starting.',
      safetyEquipment: 'Satellite radio communicator, multi-gas burners, sterile dressing kits, and emergency stretcher carried by crew.',
      weatherPrecautions: 'Trek leaders have absolute authority to modify routes during sudden blizzards or landslides.'
    },
    availableDates: [
      { id: 'b1', startDate: 'May 12, 2026', endDate: 'May 16, 2026', availableSeats: 4, totalSeats: 14, status: 'Almost Full' },
      { id: 'b2', startDate: 'May 24, 2026', endDate: 'May 28, 2026', availableSeats: 9, totalSeats: 14, status: 'Open' },
      { id: 'b3', startDate: 'Jun 05, 2026', endDate: 'Jun 09, 2026', availableSeats: 12, totalSeats: 14, status: 'Open' },
      { id: 'b4', startDate: 'Jun 18, 2026', endDate: 'Jun 22, 2026', availableSeats: 0, totalSeats: 14, status: 'Sold Out' },
      { id: 'b5', startDate: 'Jul 02, 2026', endDate: 'Jul 06, 2026', availableSeats: 6, totalSeats: 14, status: 'Open' }
    ],
    pricing: {
      originalPrice: 13500,
      discountPrice: 8999,
      taxes: 450,
      groupDiscount: '10% discount on groups of 4 or more',
      studentDiscount: '₹500 flat off with valid University / College ID',
      breakdown: [
        { item: 'Base Expedition & Certified Guide Fee', amount: 5200 },
        { item: 'High-Altitude Tent & Gear Logistics', amount: 2000 },
        { item: 'All Alpine Meals & Hydration Provisions', amount: 1349 },
        { item: 'Forest Entry & Trail Ecological Tax (GST 5%)', amount: 450 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', caption: 'Hampta Pass summit crest under brilliant morning light' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: 'Shea Goru campsite beside the glacial river' },
      { type: 'video', thumbnail: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', url: '#', caption: 'Drone 4K: Crossing the ridge between Kullu and Lahaul' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80', caption: 'Trek team navigating the Balu Ka Ghera moraines' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun Devgan',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The transition from green Jobra to the desert of Shea Goru felt like stepping into another planet! Vikram was an extraordinary leader whose safety precautions made everyone feel confident.',
        tripDate: 'April 2026'
      },
      {
        id: 2,
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        country: 'United Kingdom',
        rating: 5,
        review: 'Chandratal Lake on the final evening was spellbinding. The food was warm, hygienic, and surprisingly delicious at 13,000 feet. Absolutely top-tier operation.',
        tripDate: 'March 2026'
      },
      {
        id: 3,
        name: 'Karan Mehra',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 4.8,
        review: 'A must-do Himalayan classic. Shea Goru morning stream crossing was bone-chilling but adrenaline-filled. Cannot wait for my next trek with AdventureX!',
        tripDate: 'February 2026'
      }
    ],
    faqs: [
      {
        question: 'How difficult is the Hampta Pass stream crossing?',
        answer: 'The stream at Shea Goru is knee-deep in the early morning. Our team sets up fixed guide lines and assists every trekker individually. It is safe and exhilarating.'
      },
      {
        question: 'Is oxygen cylinder available on the trail?',
        answer: 'Yes, our certified lead guide carries a portable medical oxygen cylinder, pulse oximeter, and Diamox reserves on all days above 10,000 feet.'
      },
      {
        question: 'Are sleeping bags provided?',
        answer: 'Yes, heavy-duty down sleeping bags tested to -10°C and hygienic fleece liners are provided to all participants.'
      }
    ]
  },
  {
    id: 'solang-paragliding',
    name: 'Solang Valley High Fly Tandem Paragliding',
    category: 'Paragliding',
    destination: 'Solang Valley, Manali',
    destinationId: 'manali',
    difficulty: 'Easy',
    duration: 'Half Day (30 min flight)',
    price: 3499,
    originalPrice: 5000,
    rating: 4.85,
    reviewsCount: 512,
    organizer: {
      name: 'Sunil Thakur',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Solang Aero Sports Federation',
      yearsExperience: 18,
      completedTrips: 3400,
      rating: 4.9,
      verified: true,
      responseTime: 'Under 30 mins',
      languages: ['English', 'Hindi'],
      about: 'APPI-certified tandem pilot with over 6,000 recorded flight hours across Himachal, Bir Billing, and Nepal.'
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Soar like an eagle over snow-dusted Himalayan peaks and pine valleys. Taking off from 8,500 feet at Solang Valley, this high-fly tandem flight offers 20 to 30 minutes of uninterrupted glide time with dramatic aerial views of the Beas River and Rohtang ridgeline.',
    experienceSummary: 'An unforgettable 30-minute thermal glide over Solang Valley with certified commercial pilots and high-definition wide-angle video recording.',
    highlights: [
      'Launch from 8,500 ft elevation with 360-degree Himalayan panorama',
      'Tandem flight with international APPI-certified master pilots',
      'Ultra-HD 4K GoPro video recording with selfie stick included',
      'Smooth touchdown on dedicated Solang meadow landing strip',
      'Comprehensive ground safety briefing and harness check'
    ],
    suitableFor: ['Beginners & first-time flyers', 'Couples', 'Adventure thrill-seekers', 'Families with teens'],
    ageRecommendations: '10 to 65 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (No prior flying experience needed)',
      duration: 'Half Day (30 min flight duration)',
      groupSize: '1 - 6 Participants per flight slot',
      minimumAge: '10 Years',
      fitnessLevel: 'Basic physical mobility (able to run 10 steps during take-off)',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: '100% weather refund guarantee if strong winds or rain cancel the flight.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Launch Point Ascent & Aerial Glide',
        description: 'Arrive at Solang Valley Base Station. Ropeway cable car ride to the upper launch station (8,500 ft). Comprehensive briefing, gear strap-in, and spectacular tandem flight down to the valley floor.',
        activities: ['Ropeway ascent to upper Solang ridge', 'Wind check and tandem wing setup', 'Take-off run with pilot', 'Landing & immediate 4K video transfer to smartphone']
      }
    ],
    whatsIncluded: [
      'High-fly tandem paragliding session (20-30 mins duration)',
      'Certified tandem commercial pilot and safety parachute harness',
      'GoPro 4K video recording with instant SD card/phone transfer',
      'Solang Valley upper ropeway cable car ascent ticket',
      'Third-party aviation insurance coverage'
    ],
    notIncluded: [
      'Transport from Manali town to Solang Valley (available upon request)',
      'Winter snow boot or heavy suit rental if visiting during snow season',
      'Snacks and beverages at Solang cafes'
    ],
    whatToBring: [
      'Sturdy sports shoes with good grip (no flip-flops or open sandals)',
      'Windbreaker jacket and sunglasses',
      'Valid Government Photo ID',
      'Mobile phone with at least 4 GB free space for video transfer'
    ],
    safetyGuidelines: {
      medicalAdvice: 'Not recommended for individuals with severe vertigo or cardiovascular conditions.',
      emergencyContacts: 'Solang Air Rescue: +91 1902-256789 | Emergency Ops: 1800-112-999',
      fitnessRequirements: 'Weight limit strictly between 35 kg and 95 kg.',
      safetyEquipment: 'Reserve parachute system, impact-absorbing airbag harness, and EN-966 certified flight helmets.',
      weatherPrecautions: 'Flight strictly suspended if wind velocity exceeds 25 km/h.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily Batches (Morning 8 AM)', endDate: 'Morning Slot', availableSeats: 8, totalSeats: 20, status: 'Open' },
      { id: 'b2', startDate: 'Daily Batches (Afternoon 1 PM)', endDate: 'Afternoon Slot', availableSeats: 3, totalSeats: 20, status: 'Almost Full' }
    ],
    pricing: {
      originalPrice: 5000,
      discountPrice: 3499,
      taxes: 175,
      groupDiscount: '15% discount for groups of 3 or more',
      studentDiscount: '₹300 off with College ID',
      breakdown: [
        { item: 'High-Fly Flight & Pilot Fee', amount: 2499 },
        { item: 'GoPro 4K Footage & Media Transfer', amount: 600 },
        { item: 'Ropeway Ascent Pass & Valley Aviation Tax', amount: 400 },
        { item: 'GST (5%)', amount: 175 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', caption: 'Gliding high over Solang pines with snow peaks backdrop' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80', caption: 'Gentle touchdown on the green valley landing field' },
      { type: 'video', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', url: '#', caption: 'Full GoPro In-Flight Cockpit View' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The view of Rohtang and the snow-clad peaks while floating silently in the air is priceless. Sunil is a master pilot who made me feel 100% safe.',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'What is the minimum age and weight limit?',
        answer: 'Minimum age is 10 years. Weight must be between 35 kg and 95 kg for aerodynamic safety balance.'
      }
    ]
  },
  {
    id: 'beas-river-rafting',
    name: 'Beas River Grade III+ Rapids Challenge',
    category: 'River Rafting',
    destination: 'Pirdi to Jhiri, Kullu-Manali',
    destinationId: 'manali',
    difficulty: 'Moderate',
    duration: '1 Day (14 km rapids)',
    price: 1800,
    originalPrice: 2800,
    rating: 4.8,
    reviewsCount: 290,
    organizer: {
      name: 'Ramesh Rana',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'White Water Pioneers',
      yearsExperience: 16,
      completedTrips: 1800,
      rating: 4.88,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi'],
      about: 'IRF-certified whitewater river guide with swift-water rescue qualifications.'
    },
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Tackle 14 kilometers of churning alpine white water on the snow-fed Beas River. Featuring exhilarating Grade II and III+ rapids such as Roller Coaster, Golf Course, and Double Trouble under certified swift-water rescue escort.',
    experienceSummary: '14 km of fast-paced whitewater adrenaline navigating towering rapids through the scenic Kullu valley.',
    highlights: [
      '14 kilometers of continuous Grade II to III+ mountain rapids',
      'Certified International Rafting Federation (IRF) guides on every raft',
      'Dedicated safety kayaker escorting each run',
      'CE-certified high-buoyancy life jackets and helmets',
      'GoPro video recording captures of the biggest wave drops'
    ],
    suitableFor: ['Adventure seekers', 'Corporate groups', 'College batches', 'Active travelers'],
    ageRecommendations: '14 to 55 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (Non-swimmers welcome under life-vest protocol)',
      duration: '1 Day (approx. 2.5 hours on the river)',
      groupSize: '6 - 8 Persons per raft',
      minimumAge: '14 Years',
      fitnessLevel: 'Basic upper-body coordination for paddling commands',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: 'Full refund if water levels are declared unsuitable by tourism department.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Safety Drill & 14-km Rapids Descent',
        description: 'Assemble at Pirdi launch site. Fit lifejackets and helmets. Comprehensive 20-minute dry run on commands: Forward, Back, Lean In, and High-Side. Launch into 14 km of rapids ending at Jhiri.',
        activities: ['Gear fitting & safety briefing', 'Dry paddling drills', 'Rapid descent through Grade III waves', 'Hot tea and change of clothes at Jhiri finishing camp']
      }
    ],
    whatsIncluded: [
      'Complete 14 km guided whitewater rafting run',
      'Professional certified river guide and safety kayaker',
      'CE-approved high-buoyancy life jacket, paddle, and helmet',
      'Return vehicle transfer from finish point Jhiri back to Pirdi Base'
    ],
    notIncluded: ['Dry-bag rental for personal phones', 'Personal dry clothes and towel'],
    whatToBring: ['Quick-dry synthetic clothing or swimsuit', 'Dry change of clothes and towel', 'Strap-on water sandals (no loose slippers)'],
    safetyGuidelines: {
      medicalAdvice: 'Not permitted for pregnant women or individuals with severe spine or heart ailments.',
      emergencyContacts: 'Kullu River Rescue: +91 1902-223344 | AdventureX 24x7: 1800-112-999',
      fitnessRequirements: 'Must be comfortable in moving water with life jacket on.',
      safetyEquipment: 'Self-bailing rafts with perimeter safety lifelines and throw bags.',
      weatherPrecautions: 'Operated strictly within certified river flow limits monitored daily.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (Morning 9:30 AM)', endDate: 'Morning Session', availableSeats: 12, totalSeats: 24, status: 'Open' },
      { id: 'b2', startDate: 'Daily (Afternoon 1:30 PM)', endDate: 'Afternoon Session', availableSeats: 4, totalSeats: 24, status: 'Almost Full' }
    ],
    pricing: {
      originalPrice: 2800,
      discountPrice: 1800,
      taxes: 90,
      groupDiscount: '10% off for 6+ participants',
      studentDiscount: '₹200 discount with student pass',
      breakdown: [
        { item: 'River Raft Seat & Guide Logistics', amount: 1350 },
        { item: 'Safety Kayaker & Equipment Deprec.', amount: 300 },
        { item: 'Return Shuttling & River Tax', amount: 150 },
        { item: 'GST (5%)', amount: 90 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', caption: 'Crashing through Grade III white-water waves on the Beas' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sneha Patel',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The Golf Course rapid was insane! Ramesh and his team gave clear instructions and had a safety kayaker right beside us. Thoroughly safe and breathtaking.',
        tripDate: 'April 2026'
      }
    ],
    faqs: [
      {
        question: 'Can non-swimmers participate?',
        answer: 'Yes! High-buoyancy CE-approved life jackets keep you completely afloat even in choppy waters. Every raft is commanded by a certified river captain.'
      }
    ]
  },
  {
    id: 'chadar-frozen-river-trek',
    name: 'Chadar Frozen River Zanskar Expedition',
    category: 'Trekking',
    destination: 'Leh Ladakh',
    destinationId: 'leh-ladakh',
    difficulty: 'Challenging',
    duration: '8 Days / 7 Nights',
    price: 34999,
    originalPrice: 48000,
    rating: 4.98,
    reviewsCount: 188,
    organizer: {
      name: 'Stanzin Dorje',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      company: 'Zanskar Winter Mountaineering',
      yearsExperience: 22,
      completedTrips: 180,
      rating: 4.98,
      verified: true,
      responseTime: 'Under 2 hours',
      languages: ['English', 'Ladakhi', 'Hindi'],
      about: 'Native Zanskari expeditionist who has traversed the frozen Chadar gorge over 70 times across two decades.'
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Walk on a sheet of frozen glass over the roaring Zanskar River inside a canyon of sheer 1,000-foot vertical cliffs. In sub-zero winter temperatures reaching -25°C, the Chadar trek is recognized as one of the world’s most unique wilderness expeditions.',
    experienceSummary: 'A once-in-a-lifetime Arctic-style journey over the frozen Zanskar river gorge in Ladakh featuring frozen waterfalls and ancient mountain caves.',
    highlights: [
      'Trek on the frozen ice sheet (Chadar) over the turquoise Zanskar river',
      'Spectacular frozen waterfall of Nerak glistening with ice stalactites',
      'Overnight camping in ancient rock caves and high-insulation dome tents',
      'Observe sub-zero thermal phenomena and surreal ice sheet formations',
      'Acclimatization in winter Leh with monastery visits'
    ],
    suitableFor: ['Endurance trekkers', 'Extreme winter adventurers', 'Documentary photographers'],
    ageRecommendations: '18 to 50 Years',
    adventureInfo: {
      difficultyLevel: 'Challenging (Extreme sub-zero cold up to -25°C)',
      duration: '8 Days / 7 Nights',
      groupSize: '6 - 10 Participants',
      minimumAge: '18 Years',
      fitnessLevel: 'High physical endurance and mental resilience in extreme cold',
      languagesSupported: ['English', 'Ladakhi', 'Hindi'],
      cancellationPolicy: 'Mandatory 3-day Leh acclimatization medical check required by Ladakh UT Administration.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Winter Leh & Mandatory Acclimatization',
        description: 'Fly into Leh Kushok Bakula Rimpochee Airport (3,500m). Check into heated hotel and rest completely for 48 hours as mandated by government guidelines.',
        activities: ['Airport pickup in heated vehicle', 'Medical vitals logging', 'Rest and hydration protocol in heated room']
      },
      {
        day: 2,
        title: 'Acclimatization Walk & Shanti Stupa',
        description: 'Slow pace morning walk around Leh market and ascent to Shanti Stupa for high-altitude adjustment and sunset views over the snow-covered valley.',
        activities: ['Gentle acclimatization walk', 'Monastery and Shanti Stupa visit', 'Gear check and gumboot sizing']
      },
      {
        day: 3,
        title: 'Mandatory Govt Medical Examination at SNM Hospital',
        description: 'Complete official physical fitness check-up and blood oxygen saturation testing at Sonam Norboo Memorial Hospital in Leh for ALTO permit clearance.',
        activities: ['Hospital medical check (BP & SPO2)', 'Collection of wildlife and ALTO permits', 'Final expedition packing briefing']
      },
      {
        day: 4,
        title: 'Drive to Shingra Koma & First Step on Chadar',
        description: 'Drive along the Indus and Zanskar confluence at Nimmo to Shingra Koma. Step onto the frozen Zanskar river and learn the famous "penguin walk".',
        activities: ['Scenic drive past ice-choked river valleys', 'First 3-hour trek on the ice sheet', 'Camp setup on river sandbank at Gyalpo']
      },
      {
        day: 5,
        title: 'Trek from Gyalpo to Tibb Cave',
        description: 'Trek 14 km through the deep canyon where sunlight barely touches the ice for 2 hours a day. Marvel at weeping waterfalls frozen mid-fall.',
        activities: ['Trek past colossal gorge walls', 'Lunch by small woodfire on rocks', 'Night camping near the sheltered Tibb Cave']
      },
      {
        day: 6,
        title: 'Tibb Cave to the Legendary Nerak Frozen Waterfall',
        description: 'The pinnacle day of the expedition. Trek 12 km to reach the iconic 50-foot Nerak waterfall frozen into a giant column of blue ice.',
        activities: ['Reach Nerak waterfall', 'Interaction with remote Nerak village elders', 'Camp near Nerak under starlit Ladakhi winter skies']
      },
      {
        day: 7,
        title: 'Return Trek: Nerak to Tibb Cave to Shingra Koma',
        description: 'Retrace steps along the dynamic Chadar which constantly changes its ice patterns daily. Meet the pickup jeeps at Shingra Koma and return to Leh.',
        activities: ['Fast-paced ice trek', 'Jeep drive back to Leh hotel', 'Hot shower and victory celebration dinner']
      },
      {
        day: 8,
        title: 'Departure from Leh',
        description: 'Transfer to Leh Airport with extraordinary winter expedition memories and certificates.',
        activities: ['Airport drop-off', 'Farewell to the crew']
      }
    ],
    whatsIncluded: [
      '3 Nights heated hotel accommodation in Leh (pre and post trek)',
      '4 Nights camping in high-altitude 4-season insulated dome tents',
      'Minus 30°C certified extreme expedition sleeping bags and foam mattresses',
      'Specialized Arctic gumboots tested for Chadar ice',
      'Nutritious hot meals, high-calorie snacks, and endless hot ginger tea',
      'Wildlife department permit, ALTO insurance, and environmental fees',
      'Local Zanskari guide team, emergency stretcher, and satellite communication'
    ],
    notIncluded: ['Airfare to and from Leh', 'Personal thermals and down feather suit', 'Hospital checkup fee (~₹1,500 paid directly in Leh)'],
    whatToBring: ['Heavy down jacket (-25°C rated)', '2 sets of Merino wool thermals', 'Fleece-lined waterproof mittens & balaclava', 'Thermos flask (1.5L)'],
    safetyGuidelines: {
      medicalAdvice: 'Daily SPO2 check below 75% requires immediate evacuation. Must be cleared by SNM hospital doctors.',
      emergencyContacts: 'Ladakh Rescue Centre: +91 1982-255555 | AdventureX SOS: 1800-112-999',
      fitnessRequirements: 'Prior multi-day trekking experience is strictly mandatory.',
      safetyEquipment: 'Dedicated rescue sledge, safety ropes, ice axes, and supplemental oxygen.',
      weatherPrecautions: 'Trek paths altered daily based on Chadar ice thickness checks by lead scouts.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Jan 10, 2027', endDate: 'Jan 17, 2027', availableSeats: 2, totalSeats: 10, status: 'Almost Full' },
      { id: 'b2', startDate: 'Jan 20, 2027', endDate: 'Jan 27, 2027', availableSeats: 5, totalSeats: 10, status: 'Open' }
    ],
    pricing: {
      originalPrice: 48000,
      discountPrice: 34999,
      taxes: 1750,
      groupDiscount: '₹2,000 off per person for groups of 4',
      studentDiscount: 'N/A',
      breakdown: [
        { item: 'Expedition Logistics & High Altitude Porters', amount: 21000 },
        { item: 'Heated Hotel Accommodation in Leh (3 Nights)', amount: 6500 },
        { item: 'Extreme Cold Sleeping System & Gear', amount: 4000 },
        { item: 'Wildlife Permits & Environmental Surcharges', amount: 3499 },
        { item: 'GST & Regulatory Fees (5%)', amount: 1750 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: 'Nerak frozen waterfall towering 50 feet in icy grandeur' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Tanya Sen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'Chadar changed my life. Walking over living ice that hums and echoes beneath your feet is something you will never forget. Stanzin is a legendary Zanskari guide.',
        tripDate: 'January 2026'
      }
    ],
    faqs: [
      {
        question: 'What happens if the ice breaks or melts?',
        answer: 'Our scouts walk 300 meters ahead testing ice thickness with wooden sticks. If any section is thin, routes bypass over natural rock ledges or temporary ice bridges.'
      }
    ]
  },
  {
    id: 'khardung-la-cycling',
    name: 'Khardung La Downhill Mountain Biking',
    category: 'Mountain Biking',
    destination: 'Leh Ladakh',
    destinationId: 'leh-ladakh',
    difficulty: 'Moderate',
    duration: '1 Day (40 km downhill)',
    price: 3200,
    originalPrice: 4500,
    rating: 4.88,
    reviewsCount: 165,
    organizer: {
      name: 'Rigzin Namgyal',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Ladakh High Altitude MTB Club',
      yearsExperience: 12,
      completedTrips: 620,
      rating: 4.9,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Ladakhi'],
      about: 'Pioneer of downhill mountain biking in Ladakh and certified hydraulic suspension mechanic.'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Cycle down from 17,982 feet at Khardung La Pass—one of the highest motorable roads in the world—all the way back to Leh town. A heart-thumping 40-kilometer pure gravity descent featuring breathtaking hairpin turns and Karakoram mountain views.',
    experienceSummary: 'A thrilling 40-kilometer downhill ride with 6,500 feet of vertical descent from Khardung La Pass into the Indus Valley.',
    highlights: [
      'Start at 17,982 feet elevation with world-record mountain views',
      'Over 40 km of downhill gravity riding with minimal pedaling',
      'Premium hydraulic disc-brake mountain bikes (Trek / Scott)',
      'Backup support vehicle following the cycling group the entire way',
      'Celebration stop at South Pullu army checkpoint'
    ],
    suitableFor: ['Bicycle lovers', 'Adrenaline enthusiasts', 'Adventure photographers'],
    ageRecommendations: '16 to 55 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (Requires confident braking control on mountain switchbacks)',
      duration: '1 Day (approx. 5 hours total)',
      groupSize: '4 - 12 Cyclists',
      minimumAge: '16 Years',
      fitnessLevel: 'Acclimatized to Leh altitude (minimum 48 hours in Leh prior)',
      languagesSupported: ['English', 'Hindi', 'Ladakhi'],
      cancellationPolicy: 'Reschedule available if pass closed due to fresh snowfall.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Vehicle Ascent to Khardung La & 40km Gravity Descent',
        description: 'Morning vehicle pickup with bikes secured on roof racks. Ascend 40 km past South Pullu to the iconic Khardung La Pass (17,982 ft). Take summit photos, wear safety armor, and begin the exhilarating downhill descent into Leh.',
        activities: ['Jeep transfer to pass summit', 'Summit photoshoot & hot black tea', 'Downhill briefing & brake testing', '40 km continuous descent with support van escort']
      }
    ],
    whatsIncluded: [
      'Premium front-suspension hydraulic disc mountain bike (Trek / Giant)',
      'Full-face helmet, knee and elbow impact armor, and cycling gloves',
      'Jeep transport for cyclist and bicycle from Leh to Khardung La Pass',
      'Lead cycling instructor and trailing backup vehicle with first-aid & spare parts'
    ],
    notIncluded: ['Warm windproof clothing', 'Personal GoPro mounts'],
    whatToBring: ['Windproof jacket and thermal gloves', 'UV sunglasses', 'Sturdy sneakers'],
    safetyGuidelines: {
      medicalAdvice: 'Must have acclimatized in Leh for at least 2 full days before ascending to 18,000 ft.',
      emergencyContacts: 'Army Medical Centre Khardung: 1800-112-999',
      fitnessRequirements: 'Confident hand-brake control on winding asphalt and dirt roads.',
      safetyEquipment: 'Hydraulic disc brakes checked and bled prior to every departure.',
      weatherPrecautions: 'Descent suspended if snow or black ice coats the upper 5 km.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (Morning 8:30 AM)', endDate: '1 Day', availableSeats: 6, totalSeats: 12, status: 'Open' }
    ],
    pricing: {
      originalPrice: 4500,
      discountPrice: 3200,
      taxes: 160,
      groupDiscount: '10% off for 4+ riders',
      studentDiscount: '₹300 off with Student ID',
      breakdown: [
        { item: 'Premium MTB Rental & Maintenance', amount: 1600 },
        { item: 'Vehicle Shuttling to 17,982 ft Summit', amount: 1000 },
        { item: 'Lead Guide & Protective Body Armor', amount: 600 },
        { item: 'GST (5%)', amount: 160 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', caption: 'Riders rounding the iconic Khardung La switchbacks' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Aditya Roy',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'Easily the most exhilarating thing I have ever done. You barely have to pedal for 40 kilometers—just pure gravity and epic mountain vistas!',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'Do I have to pedal uphill?',
        answer: 'No! You and your mountain bike are driven to the summit of Khardung La in an SUV. The entire cycling trip is downhill back into Leh.'
      }
    ]
  },
  {
    id: 'rishikesh-bungee-jumping',
    name: 'Mohanchatti 83M Giant Bungee Jump',
    category: 'Rock & Water Sports',
    destination: 'Mohanchatti, Rishikesh',
    destinationId: 'rishikesh',
    difficulty: 'Moderate',
    duration: 'Half Day',
    price: 3700,
    originalPrice: 4500,
    rating: 4.92,
    reviewsCount: 740,
    organizer: {
      name: 'Capt. Rahul Sharma',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Jumpin Heights Rishikesh',
      yearsExperience: 15,
      completedTrips: 95000,
      rating: 4.96,
      verified: true,
      responseTime: 'Under 15 mins',
      languages: ['English', 'Hindi'],
      about: 'Ex-Indian Army Officer operating India’s highest fixed cantilever bungee platform built under New Zealand safety standards.'
    },
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Leap into empty air from India’s highest fixed cantilever bungee platform suspended 83 meters (272 feet) over the rocky Hall River in Mohanchatti, Rishikesh. Designed by New Zealand jump masters following rigorous international safety codes.',
    experienceSummary: 'An electrifying 83-meter free-fall leap over a dramatic rocky river canyon under New Zealand jump master standards.',
    highlights: [
      'India’s highest fixed platform bungee jump at 83 meters (272 ft)',
      'Engineered and operated by New Zealand certified Jump Masters',
      'Dual ankle harness and full body redundant safety harness',
      'Dare to Jump badge and official certification of courage',
      'State-of-the-art high frame rate video capture system'
    ],
    suitableFor: ['Adrenaline junkies', 'Solo travelers', 'Thrill seekers'],
    ageRecommendations: '12 to 50 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (Pure mental courage challenge)',
      duration: 'Half Day (including transfer and jump)',
      groupSize: 'Individual jump experience',
      minimumAge: '12 Years',
      fitnessLevel: 'Normal health (weight 40 kg to 110 kg)',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: 'Refund or date change permitted up to 24 hours prior.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Safety Weigh-in & 83-Meter Cantilever Drop',
        description: 'Board the AC bus from Tapovan to Mohanchatti. Check-in, weigh-in, and safety video briefing. Walk the steel cantilever bridge, gear up with twin ankle straps, and leap into the canyon.',
        activities: ['Transfer to Mohanchatti canyon', 'Weighing and blood pressure screening', 'Jump preparation on cantilever bridge', 'The 83-meter leap & badge presentation']
      }
    ],
    whatsIncluded: [
      'One 83-meter Bungee Jump with certified New Zealand jump master',
      'High-strength dual bungee cords and redundant safety harnesses',
      'Official Dare to Jump pin & completion certificate',
      'Entry permit to Mohanchatti jump zone'
    ],
    notIncluded: ['Shuttle bus ticket from Tapovan (₹350)', 'HD video and photograph package (₹900)'],
    whatToBring: ['Comfortable clothing (no skirts/dresses)', 'Lace-up sneakers', 'Valid Government Photo ID'],
    safetyGuidelines: {
      medicalAdvice: 'Strictly prohibited for individuals with high BP, heart conditions, epilepsy, or recent back injuries.',
      emergencyContacts: 'On-site Paramedic Unit: +91 135-2430000 | AdventureX: 1800-112-999',
      fitnessRequirements: 'Weight strictly between 40 kg and 110 kg.',
      safetyEquipment: 'Imported New Zealand military-grade cords with 300% safety margins.',
      weatherPrecautions: 'Temporarily paused during active lightning or high gale winds.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (9:30 AM Slot)', endDate: 'Morning', availableSeats: 5, totalSeats: 30, status: 'Open' },
      { id: 'b2', startDate: 'Daily (12:30 PM Slot)', endDate: 'Afternoon', availableSeats: 2, totalSeats: 30, status: 'Almost Full' }
    ],
    pricing: {
      originalPrice: 4500,
      discountPrice: 3700,
      taxes: 185,
      groupDiscount: '₹300 off per person for groups of 4+',
      studentDiscount: '₹200 discount with valid Student ID',
      breakdown: [
        { item: 'Jump Master & Cantilever Platform Fee', amount: 2900 },
        { item: 'Cord Wear & Rigging Certification', amount: 500 },
        { item: 'Recovery & Zone Entry Tax', amount: 300 },
        { item: 'GST (5%)', amount: 185 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', caption: 'Diver mid-flight over the Mohanchatti rocky gorge' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Pooja Hegde',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'Standing on the edge of the bridge was terrifying, but the jump team gave me tremendous courage. Once you take that leap, it is pure freedom!',
        tripDate: 'April 2026'
      }
    ],
    faqs: [
      {
        question: 'How safe is the bungee jump in Rishikesh?',
        answer: 'Jumpin Heights has conducted over 95,000 jumps with a 100% safety record. The platform was designed and is regularly inspected by engineers from New Zealand.'
      }
    ]
  },
  {
    id: 'shivpuri-ganga-rafting',
    name: 'Ganga White Water Rapids: Marine Drive to Rishikesh',
    category: 'River Rafting',
    destination: 'Shivpuri to Rishikesh, Uttarakhand',
    destinationId: 'rishikesh',
    difficulty: 'Moderate',
    duration: '1 Day (24 km)',
    price: 1499,
    originalPrice: 2200,
    rating: 4.87,
    reviewsCount: 890,
    organizer: {
      name: 'Dharmendra Rawat',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Ganga River Expeditions',
      yearsExperience: 19,
      completedTrips: 2400,
      rating: 4.93,
      verified: true,
      responseTime: 'Under 30 mins',
      languages: ['English', 'Hindi', 'Garhwali'],
      about: 'Pioneer of commercial white water rafting in Rishikesh since 2005.'
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Raft through 24 kilometers of iconic white water on the Holy Ganges. Challenge legendary Grade III and IV rapids like The Wall, Roller Coaster, Golf Course, and Club House, with cliff jumping and body surfing stops.',
    experienceSummary: 'A 24-kilometer legendary whitewater run down the Ganges featuring big bouncy wave trains and cliff jumping.',
    highlights: [
      '24 kilometers of world-famous Ganga whitewater from Marine Drive',
      'Overcome Grade III+ rapids: Three Blind Mice, Roller Coaster, and Golf Course',
      'Exciting cliff jumping into deep river pools at Magpie Rock',
      'Body surfing through tranquil emerald canyon pools',
      'Safety kayakers on station throughout the run'
    ],
    suitableFor: ['Youth groups', 'Families with teens', 'Adventure seekers'],
    ageRecommendations: '14 to 60 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate',
      duration: '1 Day (approx. 3.5 hours on river)',
      groupSize: '6 - 8 per raft',
      minimumAge: '14 Years',
      fitnessLevel: 'Basic swimming or comfort in water',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: 'Full refund if high monsoon water forces suspension.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Marine Drive Launch & 24km Whitewater Descent',
        description: 'Meet at Tapovan Basecamp. Transfer by bus to Marine Drive. Safety demonstration and paddling drill. Run 10 major rapids with a cliff-jumping pause at Magpie Rock. Finish at NIM Beach, Rishikesh.',
        activities: ['Transfer to Marine Drive', 'Safety instructions & gear fitting', 'Navigate big rapids & cliff jump', 'Finish at NIM Beach and return transfer']
      }
    ],
    whatsIncluded: [
      'Complete 24 km guided rafting trip',
      'Certified river guide and safety kayaker',
      'High-buoyancy life vest, paddle, and helmet',
      'Transport from Tapovan to launch point'
    ],
    notIncluded: ['Dry bag for electronics', 'Personal snacks at cliff jump point'],
    whatToBring: ['Quick-dry shorts and t-shirt', 'Waterproof sunscreen', 'Strap sandals'],
    safetyGuidelines: {
      medicalAdvice: 'Notify guide of any pre-existing asthma or limb mobility concerns.',
      emergencyContacts: 'Rishikesh Rafting Authority: 1800-112-999',
      fitnessRequirements: 'Capable of paddling with rhythm on guide commands.',
      safetyEquipment: 'High-volume self-bailing rafts with dual safety perimeters.',
      weatherPrecautions: 'Operated exclusively outside the July-August monsoon period.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (Morning 8:30 AM)', endDate: '1 Day', availableSeats: 16, totalSeats: 32, status: 'Open' }
    ],
    pricing: {
      originalPrice: 2200,
      discountPrice: 1499,
      taxes: 75,
      groupDiscount: '10% off for 6+ members',
      studentDiscount: '₹150 off with ID',
      breakdown: [
        { item: 'Rafting Logistics & Guide Fee', amount: 1100 },
        { item: 'Transport to Marine Drive', amount: 250 },
        { item: 'Safety Kayaker & Equipment Fee', amount: 149 },
        { item: 'GST (5%)', amount: 75 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: 'Raft crew tackling the Roller Coaster wave train on the Ganga' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vikas Nambiar',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The 24 km stretch from Marine Drive is 10 times better than the shorter 12 km trip. The rapids are huge and thrilling! Dharmendra was a fantastic guide.',
        tripDate: 'April 2026'
      }
    ],
    faqs: [
      {
        question: 'Can kids participate in 24 km rafting?',
        answer: 'Minimum age is strictly 14 years for the 24 km stretch due to the strength of Grade III+ rapids. For younger kids (10+), the shorter 9 km stretch is recommended.'
      }
    ]
  },
  {
    id: 'grande-island-scuba',
    name: 'Grande Island PADI Discover Scuba Diving',
    category: 'Scuba Diving',
    destination: 'Grande Island, Goa',
    destinationId: 'goa',
    difficulty: 'Easy',
    duration: '1 Day (approx. 6 hours)',
    price: 3499,
    originalPrice: 4800,
    rating: 4.82,
    reviewsCount: 620,
    organizer: {
      name: 'Capt. Keith Fernandes',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Goa Ocean Pro Divers',
      yearsExperience: 14,
      completedTrips: 4100,
      rating: 4.89,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Konkani'],
      about: 'PADI Master Scuba Diver Trainer with over 3,000 logged dives across the Arabian Sea and Andaman islands.'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Explore the vibrant marine ecosystem of the Arabian Sea at Grande Island, Goa. Featuring a dedicated one-on-one PADI instructor, shallow pool training, boat cruise with dolphin spotting, and an unforgettable 25-minute open sea dive down to 10 meters.',
    experienceSummary: 'A beginner-friendly open water scuba dive at Grande Island with 1-on-1 PADI instructor guidance and HD underwater video.',
    highlights: [
      '1-on-1 personal PADI dive master escort throughout your dive',
      'Scenic 45-minute Arabian Sea boat cruise with wild dolphin spotting',
      'Full underwater 4K video and photo shoot included',
      'Explore vibrant coral reefs, butterfly fish, and parrotfish',
      'Complimentary Goan buffet lunch and chilled refreshments on island'
    ],
    suitableFor: ['First-time divers', 'Non-swimmers', 'Couples', 'Families'],
    ageRecommendations: '10 to 60 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (No swimming skills required)',
      duration: '1 Day (8:00 AM to 3:30 PM)',
      groupSize: 'Individual dive with personal instructor',
      minimumAge: '10 Years',
      fitnessLevel: 'Normal health (must pass basic PADI medical declaration)',
      languagesSupported: ['English', 'Hindi', 'Konkani'],
      cancellationPolicy: 'Free cancellation or date change up to 48 hours prior.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Boat Cruise to Grande Island & Guided Reef Dive',
        description: 'Morning pickup from North/South Goa hotel. Board boat at Sinquerim jetty. Dolphin sighting cruise out to Grande Island. Comprehensive theory and shallow-water breathing session. 25-minute guided reef dive. Buffet lunch on island.',
        activities: ['Jetty boarding & dolphin watch', 'PADI breathing & ear equalization briefing', '25-minute 1-on-1 open water reef dive', 'Underwater photoshoot & Goan buffet lunch']
      }
    ],
    whatsIncluded: [
      'One 20-25 minute open water scuba dive with 1-on-1 PADI instructor',
      'Complete scuba gear: BCD, regulator, wetsuit, mask, fins, and oxygen tank',
      'Boat cruise to Grande Island with dolphin sightseeing',
      'Buffet lunch, seasonal fruits, and mineral water on boat',
      'Underwater 4K videos and high-res photos transferred to mobile'
    ],
    notIncluded: ['Hotel transfers from remote South Goa (available for ₹400 extra)'],
    whatToBring: ['Swimwear or quick-dry t-shirt and shorts', 'Sunscreen and towel', 'Personal sunglasses and flip-flops'],
    safetyGuidelines: {
      medicalAdvice: 'Must wait at least 18 hours after diving before boarding a flight.',
      emergencyContacts: 'Goa Coast Guard: 1554 | AdventureX 24x7: 1800-112-999',
      fitnessRequirements: 'No swimming skills required; your instructor holds your tank throughout.',
      safetyEquipment: 'Regularly serviced Scubapro BCDs and hydrostatic-tested cylinders.',
      weatherPrecautions: 'Tours operate from October to May when sea visibility is crystal clear.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (7:30 AM Departure)', endDate: '1 Day', availableSeats: 8, totalSeats: 25, status: 'Open' }
    ],
    pricing: {
      originalPrice: 4800,
      discountPrice: 3499,
      taxes: 175,
      groupDiscount: '12% off for groups of 4 or more',
      studentDiscount: '₹300 off with college ID',
      breakdown: [
        { item: 'PADI Instructor & Scuba Gear Rental', amount: 2300 },
        { item: 'Boat Cruise to Grande Island & Dolphin Watch', amount: 600 },
        { item: 'Underwater 4K Video Package & Island Lunch', amount: 599 },
        { item: 'GST (5%)', amount: 175 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', caption: 'Diver encountering bright coral and tropical fish at Grande Island' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepak Rao',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'I do not know how to swim, but my instructor Keith stayed with me every single second underwater. I felt totally relaxed and saw so many clownfish!',
        tripDate: 'April 2026'
      }
    ],
    faqs: [
      {
        question: 'Do I need swimming skills to scuba dive?',
        answer: 'Not at all for Discover Scuba Diving! Your PADI instructor manages your buoyancy, depth, and tank movement while you enjoy the underwater view.'
      }
    ]
  },
  {
    id: 'dudhsagar-waterfall-trek',
    name: 'Dudhsagar Waterfall Jungle Trek & Railway Hike',
    category: 'Trekking',
    destination: 'Bhagwan Mahavir Sanctuary, Goa',
    destinationId: 'goa',
    difficulty: 'Moderate',
    duration: '1 Day',
    price: 1999,
    originalPrice: 2800,
    rating: 4.79,
    reviewsCount: 310,
    organizer: {
      name: 'Ashwin Sawant',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Western Ghats Eco Trails',
      yearsExperience: 11,
      completedTrips: 780,
      rating: 4.85,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Konkani'],
      about: 'Naturalist guide and Western Ghats biodiversity conservationist.'
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Trek through the dense tropical rainforest of Bhagwan Mahavir Wildlife Sanctuary to the foot of Dudhsagar Waterfall—India’s fifth tallest waterfall cascading 310 meters (1,017 feet). Swim in the fresh natural pool and watch trains rumble across the iconic bridge.',
    experienceSummary: 'A 12 km rainforest trek to the roaring four-tiered Dudhsagar falls with freshwater swimming and wildlife spotting.',
    highlights: [
      'Witness the majestic 1,017-foot roaring Dudhsagar waterfall up close',
      'Swim in the crystal-clear freshwater pool at the base of the falls',
      'Trek through lush Western Ghats biodiversity sanctuary',
      'Watch railway trains cross the dramatic bridge right above the waterfall',
      'Local Goan heritage lunch at an organic spice plantation'
    ],
    suitableFor: ['Hikers', 'Photographers', 'Nature enthusiasts', 'Friends groups'],
    ageRecommendations: '12 to 55 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (12 km walking on railway track & forest trails)',
      duration: '1 Day (approx. 8 hours)',
      groupSize: '8 - 15 Hikers',
      minimumAge: '12 Years',
      fitnessLevel: 'Able to walk 12 km in humid tropical weather',
      languagesSupported: ['English', 'Hindi', 'Konkani'],
      cancellationPolicy: 'Full refund up to 48 hours before trek start.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Rainforest Trek & Freshwater Pool Swim',
        description: 'Morning pickup from Goa. Reach Kulem railway station. Trek 11 km along scenic railway tracks, tunnels, and forest trails to the majestic Dudhsagar waterfall. Swim in the natural pond, enjoy packed lunch, and return via forest jeeps.',
        activities: ['Transfer to Kulem base', '11 km forest trail hike', 'Swimming under waterfall with safety jacket', 'Spice plantation tour and return transfer']
      }
    ],
    whatsIncluded: [
      'Guided trek with certified forest naturalist',
      'Sanctuary entry permit and camera fees',
      'Mandatory life jacket for swimming in the waterfall pool',
      'Buffet lunch at organic spice plantation',
      'Jeep safari return ride from falls to Kulem'
    ],
    notIncluded: ['Personal dry bag', 'Alcoholic beverages'],
    whatToBring: ['Comfortable walking shoes (no flip flops)', 'Swimwear and quick-dry towel', 'Bug spray and water bottle'],
    safetyGuidelines: {
      medicalAdvice: 'Swimming in the waterfall pool is strictly prohibited without wearing the provided life jacket.',
      emergencyContacts: 'Goa Forest Dept: 1800-112-999',
      fitnessRequirements: 'Must be capable of walking 10-12 km in warm conditions.',
      safetyEquipment: 'High-buoyancy life jackets provided to all participants.',
      weatherPrecautions: 'Trek rerouted during extreme flash-flood monsoon surges.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (6:30 AM Pickup)', endDate: '1 Day', availableSeats: 7, totalSeats: 15, status: 'Open' }
    ],
    pricing: {
      originalPrice: 2800,
      discountPrice: 1999,
      taxes: 100,
      groupDiscount: '10% off for 4+ travelers',
      studentDiscount: '₹150 off with College ID',
      breakdown: [
        { item: 'Guided Forest Trek & Naturalist Fee', amount: 1200 },
        { item: 'Spice Plantation Buffet Lunch', amount: 450 },
        { item: 'Jeep Safari Return & Forest Permits', amount: 349 },
        { item: 'GST (5%)', amount: 100 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: 'Dudhsagar falls cascading like milky foam down the green cliffs' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Nisha Pillai',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'Swimming under Dudhsagar with a train rumbling across the bridge right above us was breathtaking. Ashwin taught us so much about the flora and fauna!',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'Is swimming permitted at the waterfall?',
        answer: 'Yes! The forest department permits swimming in the designated pool area with mandatory life jackets that we supply to every participant.'
      }
    ]
  },
  {
    id: 'spiti-valley-pin-parvati',
    name: 'Pin Parvati High Pass Trans-Himalayan Trek',
    category: 'Trekking',
    destination: 'Spiti Valley & Parvati Valley',
    destinationId: 'spiti-valley',
    difficulty: 'Challenging',
    duration: '11 Days / 10 Nights',
    price: 38999,
    originalPrice: 52000,
    rating: 4.96,
    reviewsCount: 114,
    organizer: {
      name: 'Tsering Bodh',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      company: 'Spiti High Peaks Explorations',
      yearsExperience: 20,
      completedTrips: 210,
      rating: 4.97,
      verified: true,
      responseTime: 'Under 2 hours',
      languages: ['English', 'Hindi', 'Spitian'],
      about: 'Himalayan mountaineer who has led elite cross-border expeditions over Pin Parvati and Parang La.'
    },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The holy grail of trans-Himalayan crossover treks. Cross from the dense green rainforests and hot springs of Parvati Valley across the formidable 17,450-foot Pin Parvati Pass into the cold, ancient Buddhist moonscapes of Spiti Valley.',
    experienceSummary: 'An 11-day extreme mountaineering trek over a 17,450-ft glacial col connecting Parvati Valley to Spiti Valley.',
    highlights: [
      'Cross the epic Pin Parvati Pass at 17,450 feet surrounded by hanging glaciers',
      'Relax in natural sulfur hot springs at Khirganga basecamp',
      'Camp at Mantalai Lake, the sacred glacial birthplace of the Parvati River',
      'Trek through Pin Valley National Park, home of the elusive snow leopard',
      'Conclude at the centuries-old Mudh and Kaza Buddhist monasteries'
    ],
    suitableFor: ['Experienced mountaineers', 'High-altitude endurance trekkers'],
    ageRecommendations: '18 to 50 Years',
    adventureInfo: {
      difficultyLevel: 'Challenging (Extensive glacier travel & crevasse navigation)',
      duration: '11 Days / 10 Nights',
      groupSize: '6 - 10 Participants',
      minimumAge: '18 Years',
      fitnessLevel: 'Advanced mountaineering fitness (prior 14,000+ ft trek required)',
      languagesSupported: ['English', 'Hindi', 'Spitian'],
      cancellationPolicy: 'Full refund up to 21 days before departure.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Barsheni to Khirganga Hot Springs',
        description: 'Meet at Kasol/Barsheni. Trek 10 km through deodar forests to the alpine meadow of Khirganga.',
        activities: ['Gear inspection', 'Hike along roaring Parvati river', 'Evening dip in thermal hot springs']
      },
      {
        day: 2,
        title: 'Khirganga to Tunda Bhuj',
        description: 'Trek along dramatic river cliffs into virgin pine and silver birch groves.',
        activities: ['Ascend gorge trail', 'Camp beside cascading waterfalls at Tunda Bhuj']
      },
      {
        day: 3,
        title: 'Tunda Bhuj to Thakur Kuan',
        description: 'Cross natural rock bridges (Pando Bridges) formed by giant fallen monoliths.',
        activities: ['Technical boulder crossings', 'Alpine camping at Thakur Kuan']
      },
      {
        day: 4,
        title: 'Thakur Kuan to Odi Thach',
        description: 'Enter the wide U-shaped glacial valley filled with high-altitude alpine wildflowers.',
        activities: ['Hike past sheep pastures', 'Camp with direct views of Kullu Eiger peaks']
      },
      {
        day: 5,
        title: 'Odi Thach to Mantalai Lake (Sacred Lake)',
        description: 'Climb terminal moraines to reach sacred Mantalai Lake (4,115m), source of the Parvati river.',
        activities: ['Arrive at holy Mantalai', 'Acclimatization and snow craft preparation']
      },
      {
        day: 6,
        title: 'Mantalai Lake to Parvati Basecamp',
        description: 'Steep climb over scree and ice moraines to the foot of Pin Parvati Pass glacier (4,940m).',
        activities: ['High camp setup on glacier moraine', 'Rope team positioning and crampon fitting']
      },
      {
        day: 7,
        title: 'Summit: Pass Crossing to Pin Basecamp (17,450 ft)',
        description: '12-hour summit push across extensive crevassed snowfields to Pin Parvati Pass.',
        activities: ['Roped glacier navigation', 'Cross into Spiti Valley', 'Descend to Pin riverhead']
      },
      {
        day: 8,
        title: 'Pin Basecamp to Tiya',
        description: 'Trek through the Martian-red rock amphitheaters of Pin Valley National Park.',
        activities: ['Explore Spiti geological layers', 'Camp at Tiya riverside']
      },
      {
        day: 9,
        title: 'Tiya to Mudh Village',
        description: 'Reach the whitewashed Tibetan-style village of Mudh (3,810m).',
        activities: ['Celebrate completion with local momos & seabuckthorn tea', 'Homestay stay']
      },
      {
        day: 10,
        title: 'Mudh to Kaza via Dhankar Monastery',
        description: 'Drive along Pin-Spiti river confluence, exploring cliff-hanging Dhankar Monastery.',
        activities: ['Visit 1,000-year-old monastery', 'Check into Kaza hotel']
      },
      {
        day: 11,
        title: 'Departure from Kaza to Manali',
        description: 'Drive across Kunzum Pass and Atal Tunnel concluding at Manali.',
        activities: ['Drive via Kunzum Pass (15,060 ft)', 'Drop at Manali by 6:00 PM']
      }
    ],
    whatsIncluded: [
      'All 10 nights accommodation in alpine tents & Kaza hotel',
      'All meals throughout the 11-day trek cooked fresh by mountain chefs',
      'Lead UIAGM mountain guide, assistant guides, and cook team',
      'High-altitude mountaineering safety equipment (ropes, harnesses, crampons)',
      'Pin Valley wildlife permits and Parvati forest entry clearances',
      'Oxygen cylinder and Gamow hyperbaric bag provisions'
    ],
    notIncluded: ['Personal climbing boots and thermal layers', 'Backpack porter charges'],
    whatToBring: ['Rigid mountain boots', '-20°C feather down jacket', 'Crampons (or rented from base)'],
    safetyGuidelines: {
      medicalAdvice: 'Mandatory prior medical certification for high-altitude fitness.',
      emergencyContacts: 'Spiti District Disaster Helpline: 1800-112-999',
      fitnessRequirements: 'Must have successfully completed at least one 14,000 ft trek previously.',
      safetyEquipment: 'Roped glacier travel protocols strictly enforced on pass day.',
      weatherPrecautions: 'Trek monitored via satellite weather telemetry.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Jul 15, 2026', endDate: 'Jul 25, 2026', availableSeats: 3, totalSeats: 10, status: 'Almost Full' },
      { id: 'b2', startDate: 'Aug 05, 2026', endDate: 'Aug 15, 2026', availableSeats: 7, totalSeats: 10, status: 'Open' }
    ],
    pricing: {
      originalPrice: 52000,
      discountPrice: 38999,
      taxes: 1950,
      groupDiscount: '₹2,500 off per person for groups of 4',
      studentDiscount: 'N/A',
      breakdown: [
        { item: '11-Day Elite Mountain Expedition Logistics', amount: 26000 },
        { item: 'Glacier Gear, Tents & High-Calorie Catering', amount: 8000 },
        { item: 'Spiti Jeep Transfers & Homestay Lodging', amount: 4999 },
        { item: 'GST & Environmental Surcharges (5%)', amount: 1950 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', caption: 'The glaciated col of Pin Parvati Pass at 17,450 feet' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kabir Singhania',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The ultimate trek in the Indian Himalayas. Standing on the pass looking back at green Kullu and forward into dry red Spiti is surreal. Tsering is a mountain god.',
        tripDate: 'August 2025'
      }
    ],
    faqs: [
      {
        question: 'Is prior mountaineering experience required?',
        answer: 'Yes! Participants must have completed at least one 14,000+ ft Himalayan trek before attempting Pin Parvati due to the technical nature of crevasses on the pass glacier.'
      }
    ]
  },
  {
    id: 'chandratal-stargazing-camp',
    name: 'Chandratal Moon Lake Stargazing & Camping',
    category: 'Camping',
    destination: 'Spiti Valley, Himachal Pradesh',
    destinationId: 'spiti-valley',
    difficulty: 'Easy',
    duration: '2 Days / 1 Night',
    price: 3999,
    originalPrice: 5500,
    rating: 4.89,
    reviewsCount: 410,
    organizer: {
      name: 'Sonam Norbu',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Spiti Celestial Campers',
      yearsExperience: 9,
      completedTrips: 540,
      rating: 4.92,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Tibetan'],
      about: 'Amateur astronomer and native Spiti camp manager offering dark sky experiences.'
    },
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Camp under the clearest dark skies in India beside the legendary turquoise crescent waters of Chandratal (14,100 ft). Equipped with astronomical telescopes to view Saturn’s rings, Jupiter’s moons, and the dense Milky Way galaxy arc.',
    experienceSummary: 'An unforgettable night in high-altitude luxury Swiss tents beside the mythical Moon Lake with guided telescope stargazing.',
    highlights: [
      'Camp at 14,100 ft in Bortle Class 1 pristine dark skies',
      'Deep-sky telescope observation of Saturn, Jupiter, and the Andromeda Galaxy',
      'Sunset and sunrise walks around the crescent shores of Chandratal',
      'Heated dining tent with hot multi-course buffet dinner',
      'Zero light pollution astrophotography assistance'
    ],
    suitableFor: ['Families', 'Astrophotographers', 'Couples', 'Solo stargazers'],
    ageRecommendations: '10 to 65 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (Vehicle reaches within 1 km of the lake)',
      duration: '2 Days / 1 Night',
      groupSize: 'Up to 20 Guests',
      minimumAge: '10 Years',
      fitnessLevel: 'Acclimatized to 12,000+ ft altitude',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: 'Full refund up to 72 hours before arrival.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Chandratal & Milky Way Stargazing',
        description: 'Drive from Kaza or Manali to Chandratal camp zone. Afternoon walk around the sacred lake perimeter. Evening astronomy lecture and telescope viewing session beneath millions of stars.',
        activities: ['Camp check-in & welcome hot tea', 'Gentle hike to Chandratal lake shore', 'Sunset photography over CB range peaks', 'Night telescope viewing of planets & Milky Way']
      },
      {
        day: 2,
        title: 'Golden Hour Lake Walk & Departure',
        description: 'Early morning golden-hour walk to capture the crystal reflections of Chandra Bhaga peaks in the glassy lake water. Breakfast and departure.',
        activities: ['Sunrise reflection photography', 'Hot buffet breakfast', 'Check-out by 10:30 AM']
      }
    ],
    whatsIncluded: [
      '1 Night in luxury Swiss tents with attached bathrooms & thick quilts',
      'Hot buffet dinner and breakfast with unlimited tea/coffee',
      'Guided stargazing session with 8-inch computerized Dobsonian telescope',
      'Ecological tourism permits for Spiti-Chandratal reserve'
    ],
    notIncluded: ['Vehicle transfer to and from Manali or Kaza'],
    whatToBring: ['Heavy down jacket and woollen cap', 'Camera tripod for long exposure night sky shots', 'Headlamp with red-light mode'],
    safetyGuidelines: {
      medicalAdvice: 'Temperatures drop to near freezing even in summer; stay well hydrated.',
      emergencyContacts: 'Kaza Hospital Emergency: 1800-112-999',
      fitnessRequirements: 'Must be acclimatized to high altitudes.',
      safetyEquipment: 'Oxygen cylinder on standby in the camp manager tent.',
      weatherPrecautions: 'Tents anchored with reinforced alpine storm guy-lines.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (Jun 1 to Oct 10)', endDate: '2 Days', availableSeats: 10, totalSeats: 25, status: 'Open' }
    ],
    pricing: {
      originalPrice: 5500,
      discountPrice: 3999,
      taxes: 200,
      groupDiscount: '10% off for 4+ tents',
      studentDiscount: '₹300 off with ID',
      breakdown: [
        { item: 'Luxury Swiss Tent & Thermal Bedding', amount: 2600 },
        { item: 'Buffet Dinner & Breakfast Provisions', amount: 800 },
        { item: 'Telescope Stargazing & Guide Session', amount: 599 },
        { item: 'GST (5%)', amount: 200 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', caption: 'Milky way arching directly over Chandratal Moon Lake' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Ananya Roy',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'I saw the rings of Saturn with my own eyes! The tents were warm, the food was piping hot, and the lake in the morning is pure magic.',
        tripDate: 'September 2025'
      }
    ],
    faqs: [
      {
        question: 'Is it cold at night in summer?',
        answer: 'Yes, temperatures at Chandratal (14,100 ft) often touch 0°C to 4°C at night even in July and August. Our tents are equipped with heavy quilts and hot water bags.'
      }
    ]
  },
  {
    id: 'meghalaya-living-root-bridges',
    name: 'Nongriat Double Decker Living Root Bridge Trek',
    category: 'Trekking',
    destination: 'Cherrapunji (Sohra), Meghalaya',
    destinationId: 'meghalaya',
    difficulty: 'Moderate',
    duration: '2 Days / 1 Night',
    price: 3499,
    originalPrice: 4800,
    rating: 4.91,
    reviewsCount: 380,
    organizer: {
      name: 'Banteilang Khongwir',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Khasi Hills Cultural Treks',
      yearsExperience: 13,
      completedTrips: 640,
      rating: 4.94,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Khasi', 'Hindi'],
      about: 'Indigenous Khasi elder and bio-engineering storyteller guiding travelers through the sacred living root bridges.'
    },
    images: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Descend 3,500 stone stairs through lush subtropical rainforests to reach the world-renowned Double Decker Living Root Bridge at Nongriat village. Engineered over centuries by indigenous Khasi tribes training the aerial roots of Ficus elastica trees.',
    experienceSummary: 'A rainforest hike through 3,500 steps down to living botanical bridges and natural turquoise swimming lagoons in Meghalaya.',
    highlights: [
      'Cross the legendary 250-year-old Double Decker Living Root Bridge',
      'Swim in the natural turquoise lagoons of Rainbow Falls',
      'Hike past wire suspension bridges swinging 100 feet over roaring rivers',
      'Overnight stay in an authentic indigenous Khasi homestay in Nongriat',
      'Learn the ancient bio-engineering art of root weaving from tribal elders'
    ],
    suitableFor: ['Hikers with good knee stamina', 'Culture lovers', 'Photographers'],
    ageRecommendations: '12 to 55 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (3,500 steep stone steps down and back up)',
      duration: '2 Days / 1 Night',
      groupSize: '4 - 12 Trekkers',
      minimumAge: '12 Years',
      fitnessLevel: 'Good knee strength and stair-climbing endurance',
      languagesSupported: ['English', 'Khasi', 'Hindi'],
      cancellationPolicy: '100% refund up to 7 days prior.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Tyrna Village Descent to Nongriat & Double Decker Bridge',
        description: 'Meet at Tyrna village. Begin descent down the 3,500 stone stairs through thick betel nut and bay leaf groves. Cross two thrilling suspension bridges. Arrive at Nongriat and explore the Double Decker Bridge.',
        activities: ['3,500-step rainforest descent', 'Cross suspension bridges over azure rivers', 'Explore Double Decker Living Root Bridge', 'Overnight in traditional Khasi homestay']
      },
      {
        day: 2,
        title: 'Rainbow Falls Hike & Ascent to Tyrna',
        description: 'Morning 2-hour forest hike to the stunning Rainbow Falls with natural swimming pools. Return to Nongriat for lunch and begin the steady ascent back up to Tyrna.',
        activities: ['Hike to Rainbow Falls', 'Freshwater plunge in natural pool', 'Ascent back to Tyrna roadhead', 'Return transfer to Cherrapunji/Shillong']
      }
    ],
    whatsIncluded: [
      '1 Night accommodation in clean Nongriat Khasi village homestay',
      'Local Khasi homemade dinner and breakfast',
      'Certified indigenous Khasi trekking guide',
      'Village entry fees and root bridge maintenance contributions',
      'Trekking pole loan for the 3,500 stairs'
    ],
    notIncluded: ['Personal luggage porter for stairs (available for ₹600)', 'Bottled beverages'],
    whatToBring: ['Light backpack (maximum 5-7 kg for the stairs)', 'Hiking shoes with strong rubber grip', 'Swimwear and quick-dry towel'],
    safetyGuidelines: {
      medicalAdvice: 'Individuals with severe knee arthritis or heart conditions should consult a doctor before attempting the stairs.',
      emergencyContacts: 'Cherrapunji Emergency Dispatch: 1800-112-999',
      fitnessRequirements: 'Capable of climbing 3,500 stairs back up on Day 2.',
      safetyEquipment: 'Guide carries emergency first-aid and bamboo walking sticks.',
      weatherPrecautions: 'Trek operates year-round; raincoats essential during monsoon.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Every Weekend (Sat-Sun)', endDate: '2 Days', availableSeats: 6, totalSeats: 12, status: 'Open' },
      { id: 'b2', startDate: 'Mid-week Departures (Tue-Wed)', endDate: '2 Days', availableSeats: 10, totalSeats: 12, status: 'Open' }
    ],
    pricing: {
      originalPrice: 4800,
      discountPrice: 3499,
      taxes: 175,
      groupDiscount: '10% off for 4+ participants',
      studentDiscount: '₹200 discount with student pass',
      breakdown: [
        { item: 'Indigenous Guide & Cultural Interpretation', amount: 1800 },
        { item: 'Nongriat Homestay Stay & Village Meals', amount: 1100 },
        { item: 'Root Bridge Tribal Maintenance Trust Fund', amount: 599 },
        { item: 'GST (5%)', amount: 175 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80', caption: 'The two-tiered living root bridge stretching across the river' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Meera Sengupta',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The 3,500 steps tested our leg muscles, but the moment you lay eyes on the living root bridge and dip into Rainbow Falls, every drop of sweat is worth it!',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'How difficult are the 3,500 stairs?',
        answer: 'The descent takes about 2 hours and requires mindful pacing for knees. The ascent back up takes 2.5 to 3.5 hours at an easy, steady pace with resting huts along the path.'
      }
    ]
  },
  {
    id: 'dawki-clear-river-kayaking',
    name: 'Dawki Umngot River Glass-Water Kayaking & Cliff Jump',
    category: 'Water Sports',
    destination: 'Dawki, Meghalaya',
    destinationId: 'meghalaya',
    difficulty: 'Easy',
    duration: '1 Day',
    price: 1899,
    originalPrice: 2600,
    rating: 4.86,
    reviewsCount: 420,
    organizer: {
      name: 'Sanborlang Tariang',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Umngot Eco Water Adventures',
      yearsExperience: 8,
      completedTrips: 1200,
      rating: 4.9,
      verified: true,
      responseTime: 'Under 30 mins',
      languages: ['English', 'Khasi', 'Hindi'],
      about: 'Certified white water kayaker promoting eco-tourism and river conservation on the crystal-clear Umngot river.'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Kayak on the world-famous Umngot River where the water is so transparent that boats appear to float on thin air. Paddle between towering canyon cliffs on the India-Bangladesh border with cliff-jumping spots and riverbed pebble camping.',
    experienceSummary: 'Glide in ocean kayaks on crystal-clear river waters with 20-foot underwater visibility and thrilling canyon cliff jumps.',
    highlights: [
      'Kayak on glass-like transparent emerald waters with bottom visibility',
      'Photograph the famous "floating boat in air" illusion',
      'Exciting 20-foot cliff jumping into calm deep river pools',
      'Explore dramatic river gorges near Shnongpdeng village',
      'Snorkeling session with underwater goggles provided'
    ],
    suitableFor: ['All travelers', 'Families', 'Beginner kayakers', 'Photographers'],
    ageRecommendations: '8 to 60 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (Gentle river current, life jackets provided)',
      duration: '1 Day (approx. 4 hours on water)',
      groupSize: 'Single and Tandem Kayaks',
      minimumAge: '8 Years',
      fitnessLevel: 'Basic paddling ability (non-swimmers welcome)',
      languagesSupported: ['English', 'Hindi', 'Khasi'],
      cancellationPolicy: '100% refund up to 24 hours prior.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Shnongpdeng Launch, Glass Kayaking & Cliff Jump',
        description: 'Arrive at Shnongpdeng riverbank. Fit life jackets and receive kayak paddling instruction. Paddle 4 km along the scenic river gorge, try cliff jumping at the rocky ledge, and enjoy local Khasi river fish lunch.',
        activities: ['Paddling instruction & safety check', 'Kayak navigation through transparent gorge', 'Cliff jumping & snorkeling', 'Riverbank barbecue lunch']
      }
    ],
    whatsIncluded: [
      'Single or tandem sit-on-top kayak rental for 3 hours',
      'Certified river guide & safety kayaker supervision',
      'High-grade life vest and snorkeling goggles',
      'Cliff jumping assistance and photos'
    ],
    notIncluded: ['Transport to Dawki/Shnongpdeng', 'Meals not specified'],
    whatToBring: ['Quick-dry shorts and t-shirt', 'Waterproof phone pouch', 'Sunglasses with neck retainer'],
    safetyGuidelines: {
      medicalAdvice: 'Life jackets mandatory for all participants at all times on the water.',
      emergencyContacts: 'Dawki Police Station & River Rescue: 1800-112-999',
      fitnessRequirements: 'Non-swimmers fully welcome under life jacket guidelines.',
      safetyEquipment: 'High-buoyancy marine life vests and throw lines on site.',
      weatherPrecautions: 'Best clarity from November to April; river runs murky during heavy monsoon.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily (9:00 AM to 4:00 PM)', endDate: '1 Day', availableSeats: 15, totalSeats: 30, status: 'Open' }
    ],
    pricing: {
      originalPrice: 2600,
      discountPrice: 1899,
      taxes: 95,
      groupDiscount: '10% off for 4+ kayaks',
      studentDiscount: '₹150 off with Student ID',
      breakdown: [
        { item: 'Kayak Gear Rental & Certified Safety Instructor', amount: 1300 },
        { item: 'Cliff Jumping & Snorkeling Equipment', amount: 350 },
        { item: 'River Conservation Tax & Community Fee', amount: 249 },
        { item: 'GST (5%)', amount: 95 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', caption: 'Kayak floating on the crystal-clear emerald water of Dawki' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priyanka Das',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The water really is as clear as glass! You can see river pebbles 20 feet below you clearly. Sanbor was super friendly and took great photos.',
        tripDate: 'February 2026'
      }
    ],
    faqs: [
      {
        question: 'When is the best time for crystal-clear water?',
        answer: 'From November through April. During these dry winter months, the Umngot river turns completely transparent and glass-like.'
      }
    ]
  },
  {
    id: 'coorg-tadiandamol-peak',
    name: 'Tadiandamol Peak Rainforest Trek & Camp',
    category: 'Trekking',
    destination: 'Coorg, Karnataka',
    destinationId: 'coorg',
    difficulty: 'Moderate',
    duration: '2 Days / 1 Night',
    price: 2899,
    originalPrice: 3800,
    rating: 4.84,
    reviewsCount: 350,
    organizer: {
      name: 'Chethan Muthappa',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Kodagu Wilderness Treks',
      yearsExperience: 10,
      completedTrips: 510,
      rating: 4.88,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Kannada', 'Hindi', 'Kodava'],
      about: 'Kodava native trek leader passionate about Shola forest conservation and coffee estate heritage.'
    },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Summit the highest peak in Coorg at 5,735 feet. Ascend through fragrant coffee and cardamom plantations, ancient Shola grasslands, and misty cloud forests with sweeping panoramic views of the Western Ghats mountain ridges.',
    experienceSummary: 'A 14-km ridge trek through spice plantations and Shola forests to the highest summit of Coorg with overnight estate camping.',
    highlights: [
      'Ascend to the highest peak in Coorg (1,748m / 5,735 ft)',
      'Trek through aromatic coffee, pepper, and cardamom plantations',
      'Traverse ancient Shola grasslands teeming with exotic bird species',
      'Overnight tent camping under clear southern skies with campfire',
      'Traditional Kodava buffet dinner with local delicacies'
    ],
    suitableFor: ['Weekend travelers from Bangalore', 'Beginner trekkers', 'Corporate groups', 'Nature lovers'],
    ageRecommendations: '10 to 55 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (14 km round-trip hike with steady incline)',
      duration: '2 Days / 1 Night',
      groupSize: '8 - 20 Trekkers',
      minimumAge: '10 Years',
      fitnessLevel: 'Average fitness (able to walk 14 km on varied terrain)',
      languagesSupported: ['English', 'Kannada', 'Hindi'],
      cancellationPolicy: '100% refund up to 5 days prior.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Basecamp Check-in & Plantation Walk',
        description: 'Arrive at Kakkabe basecamp homestay. Settle in, enjoy authentic Coorg filter coffee, and embark on an afternoon coffee and spice plantation walk. Bonfire dinner at night.',
        activities: ['Check-in to plantation campsite', 'Guided coffee & cardamom walk', 'Barbecue & campfire under stars']
      },
      {
        day: 2,
        title: 'Tadiandamol Summit Push & Descent',
        description: 'Early 6:00 AM start. Ascend past Nalknad Palace through Shola forests and Big Rock to Tadiandamol Summit (5,735 ft). Take panoramic photos and descend for lunch.',
        activities: ['Morning ascent past Shola groves', 'Summit reach & 360-degree Ghat views', 'Packed trail snacks at peak', 'Descent to basecamp and departure']
      }
    ],
    whatsIncluded: [
      '1 Night tent camping at coffee estate with sleeping bags and mats',
      'Traditional Kodava dinner and breakfast',
      'Certified local naturalist guide and trail sweeps',
      'Forest department entry permits and trek fees',
      'Campfire evening with music and local snacks'
    ],
    notIncluded: ['Transportation to Kakkabe basecamp', 'Personal trekking gear'],
    whatToBring: ['Good hiking shoes with traction', 'Leech socks during post-monsoon months', 'Rain poncho and headlamp'],
    safetyGuidelines: {
      medicalAdvice: 'Carry personal salt/sanitizer spray for leeches during humid months.',
      emergencyContacts: 'Virajpet Hospital: 1800-112-999',
      fitnessRequirements: 'Comfortable walking uphill for 3-4 hours.',
      safetyEquipment: 'First-aid kit with wound dressings and anti-allergic medication.',
      weatherPrecautions: 'Trek pauses during active thunderstorm advisories.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Every Weekend (Saturday Departure)', endDate: '2 Days', availableSeats: 8, totalSeats: 20, status: 'Open' }
    ],
    pricing: {
      originalPrice: 3800,
      discountPrice: 2899,
      taxes: 145,
      groupDiscount: '10% off for 5+ trekkers',
      studentDiscount: '₹200 off with ID',
      breakdown: [
        { item: 'Coffee Estate Camping & Heritage Kodava Meals', amount: 1600 },
        { item: 'Naturalist Guide & Forest Department Permit', amount: 800 },
        { item: 'Campfire & Adventure Equipment', amount: 499 },
        { item: 'GST (5%)', amount: 145 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', caption: 'Tadiandamol peak rising above a sea of morning clouds' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Gautam Rao',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'The perfect weekend escape from Bangalore. The coffee estate was serene, and the views from Tadiandamol peak with clouds rolling beneath our feet were unforgettable.',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'Are there leeches on the trail?',
        answer: 'During July to October monsoon, leeches are common in the Shola forest. We provide leech socks and anti-leech sprays. By November through May, trails are dry and free of leeches.'
      }
    ]
  },
  {
    id: 'kedarkantha-winter-summit',
    name: 'Kedarkantha Winter Snow Summit Trek',
    category: 'Trekking',
    destination: 'Sankri, Uttarakhand',
    destinationId: 'kedarkantha',
    difficulty: 'Moderate',
    duration: '5 Days / 4 Nights',
    price: 7999,
    originalPrice: 11999,
    rating: 4.94,
    reviewsCount: 680,
    organizer: {
      name: 'Mohan Singh Rawat',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      company: 'Govind Pashu Vihar Mountain Guides',
      yearsExperience: 15,
      completedTrips: 480,
      rating: 4.96,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Garhwali'],
      about: 'Native Sankri mountaineer with BMC/AMC certifications and 15 years guiding in Garhwal Himalayas.'
    },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'India’s most celebrated winter summit trek. Climb to the knife-ridge summit of Kedarkantha at 12,500 feet through knee-deep snow, dense oak and pine forests, and frozen high-altitude lakes like Juda Ka Talab.',
    experienceSummary: 'A 20 km classic winter snow summit at 12,500 feet with 360-degree views of Swargarohini, Bandarpoonch, and Black Peak.',
    highlights: [
      'Stand on the 12,500-foot summit with 360-degree views of 13 Himalayan peaks',
      'Camp beside the mythical frozen lake of Juda Ka Talab',
      'Navigate knee-deep winter snow using microspikes and gaiters',
      'Stargazing over snow-covered pine forests at Kedarkantha Basecamp',
      'Traditional Garhwali village stay at picturesque Sankri'
    ],
    suitableFor: ['First-time snow trekkers', 'College students', 'Families with active teenagers'],
    ageRecommendations: '10 to 58 Years',
    adventureInfo: {
      difficultyLevel: 'Moderate (Cold weather and snow walking on summit day)',
      duration: '5 Days / 4 Nights',
      groupSize: '8 - 16 Participants',
      minimumAge: '10 Years',
      fitnessLevel: 'Average to good endurance (capable of 5-6 hours hiking)',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: '100% refund up to 15 days prior. Flexible weather date rescheduling.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Dehradun to Sankri Scenic Drive',
        description: 'Meet at Dehradun Railway Station early morning. 8-hour scenic drive along Yamuna and Tons rivers to the remote mountain village of Sankri (1,950m).',
        activities: ['Drive past Mussoorie & Purola', 'Check-in to Sankri wooden guesthouse', 'Trek briefing and gear distribution']
      },
      {
        day: 2,
        title: 'Sankri to Juda Ka Talab (Frozen Lake)',
        description: 'Trek 4 km ascending through pine and oak forests carpeted in snow to reach the frozen lake of Juda Ka Talab (2,775m).',
        activities: ['Snow ascent through oak woods', 'Camp setup beside frozen lake', 'Evening hot soup around camp stove']
      },
      {
        day: 3,
        title: 'Juda Ka Talab to Kedarkantha Basecamp',
        description: 'Ascend above tree line to Kedarkantha Basecamp (3,400m) with sweeping views of Bandarpoonch and Swargarohini ranges.',
        activities: ['Alpine meadow climb', 'Gaiter & microspike fitting drill', 'Sunset photography over snow fields']
      },
      {
        day: 4,
        title: 'Summit Push (12,500 ft) & Descent to Hargaon',
        description: 'Early 3:30 AM alpine start. Ascend snowy ridges under headlamps to catch the sunrise from Kedarkantha Summit (3,800m / 12,500ft). Descend to Hargaon.',
        activities: ['Night climb on snow with microspikes', 'Summit sunrise celebration at Shiva shrine', 'Slide down snow slopes', 'Camp at Hargaon meadow']
      },
      {
        day: 5,
        title: 'Hargaon to Sankri & Drive to Dehradun',
        description: 'Descend 6 km through pine forests to Sankri. Board vehicle for return drive to Dehradun, arriving by 7:30 PM.',
        activities: ['Final descent to Sankri', 'Certificate ceremony', 'Drive back to Dehradun']
      }
    ],
    whatsIncluded: [
      '1 Night guesthouse stay in Sankri & 3 nights high-altitude camping',
      'All meals on trek (vegetarian high-protein mountain diet)',
      'Certified mountain leader, local guides, and cook staff',
      'Microspikes, snow gaiters, and 4-season alpine tents',
      'Oxygen cylinder, pulse oximeter, and first aid kit',
      'Govind Pashu Vihar sanctuary permits'
    ],
    notIncluded: ['Transport between Dehradun and Sankri (₹1,200 each way)', 'Personal backpack offloading'],
    whatToBring: ['3-layer warm clothing (-8°C rated)', 'Waterproof high-ankle boots', 'UV sunglasses & waterproof gloves'],
    safetyGuidelines: {
      medicalAdvice: 'Daily SPO2 check conducted every morning and evening.',
      emergencyContacts: 'Govind Pashu Vihar Rescue: 1800-112-999',
      fitnessRequirements: 'Capable of walking uphill in snow with microspikes.',
      safetyEquipment: 'Microspikes and gaiters supplied to every trekker for grip.',
      weatherPrecautions: 'Trek leaders carry satellite weather alerts.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Dec 20, 2026', endDate: 'Dec 24, 2026', availableSeats: 3, totalSeats: 16, status: 'Almost Full' },
      { id: 'b2', startDate: 'Dec 28, 2026', endDate: 'Jan 01, 2027', availableSeats: 0, totalSeats: 16, status: 'Sold Out' },
      { id: 'b3', startDate: 'Jan 08, 2027', endDate: 'Jan 12, 2027', availableSeats: 7, totalSeats: 16, status: 'Open' }
    ],
    pricing: {
      originalPrice: 11999,
      discountPrice: 7999,
      taxes: 400,
      groupDiscount: '10% discount for groups of 4+',
      studentDiscount: '₹500 off with Student ID',
      breakdown: [
        { item: 'Expedition Tents, Sleeping Bags & Microspikes', amount: 4800 },
        { item: 'All Alpine Meals, Hot Drinks & Cook Logistics', amount: 1800 },
        { item: 'Govind Pashu Vihar Forest Permits & Guide Fee', amount: 1399 },
        { item: 'GST (5%)', amount: 400 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', caption: 'Sunrise from Kedarkantha summit overlooking Himalayan ranges' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Ritu Varma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'My first ever snow trek and it exceeded all expectations! Sliding down the snow slopes on summit day felt like being a child again. Mohan was an amazing guide.',
        tripDate: 'January 2026'
      }
    ],
    faqs: [
      {
        question: 'Is Kedarkantha suitable for first-timers?',
        answer: 'Yes! Kedarkantha is universally recognized as the best winter snow trek for beginners in India due to gradual altitude gain and well-established campsites.'
      }
    ]
  },
  {
    id: 'jim-corbett-tiger-safari',
    name: 'Jim Corbett National Park 4x4 Jeep Safari',
    category: 'Wildlife Safari',
    destination: 'Jim Corbett, Uttarakhand',
    destinationId: 'jim-corbett',
    difficulty: 'Easy',
    duration: '2 Days / 1 Night',
    price: 4999,
    originalPrice: 6500,
    rating: 4.88,
    reviewsCount: 520,
    organizer: {
      name: 'Anand Bisht',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'Corbett Tiger Conservation Guides',
      yearsExperience: 17,
      completedTrips: 1400,
      rating: 4.92,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi'],
      about: 'Senior naturalist and wildlife tracker with 17 years in Corbett Tiger Reserve.'
    },
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Track the Royal Bengal Tiger across the sal forests and grasslands of India’s oldest national park. Enjoy private open-top 4x4 Gypsy safaris into core zones like Bijrani and Dhikala accompanied by government-registered naturalist trackers.',
    experienceSummary: 'Two open-top 4x4 Gypsy jungle safaris into the core tiger zones of Corbett National Park with expert wildlife trackers.',
    highlights: [
      'Two private open-top 4x4 Gypsy safaris into core tiger territories (Bijrani/Jhirna)',
      'Track Royal Bengal Tigers, Asian elephants, and spotted deer',
      'Over 550 bird species including Great Hornbill and Crested Serpent Eagle',
      'Overnight stay in jungle resort on the banks of Kosi River',
      'Naturalist evening documentary screening and bird-watching walk'
    ],
    suitableFor: ['Families', 'Wildlife photographers', 'Couples', 'Nature lovers'],
    ageRecommendations: '5 to 75 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (Comfortable 4x4 vehicle rides)',
      duration: '2 Days / 1 Night',
      groupSize: 'Up to 6 Guests per private Gypsy',
      minimumAge: '5 Years',
      fitnessLevel: 'Suitable for all fitness levels',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: 'Safari permits are non-refundable per Corbett Forest rules once booked.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Afternoon Jungle Safari',
        description: 'Arrive at Ramnagar/Corbett resort. Lunch and briefing. Board 4x4 open Gypsy for afternoon safari into Bijrani/Jhirna zone. Evening tea and wildlife presentation.',
        activities: ['Resort check-in & lunch', '3.5-hour 4x4 tiger tracking safari', 'Evening campfire & naturalist briefing']
      },
      {
        day: 2,
        title: 'Morning Safari & Kosi River Walk',
        description: 'Early morning 5:45 AM sunrise safari into the grasslands. Return for buffet breakfast. Guided river walk along the Kosi River before check-out.',
        activities: ['Dawn wildlife safari', 'Breakfast & bird watching', 'Check-out by 11:30 AM']
      }
    ],
    whatsIncluded: [
      '1 Night accommodation in jungle resort with swimming pool',
      'Two 4x4 Gypsy safaris into Corbett Core Zone with driver & certified naturalist',
      'Corbett Tiger Reserve entry permits and vehicle road taxes',
      'Buffet breakfast, lunch, and dinner at resort'
    ],
    notIncluded: ['Personal camera fees if carrying super-telephoto lenses'],
    whatToBring: ['Earth-toned clothing (khaki, green, brown)', 'Binoculars and camera', 'Government Photo ID (mandatory for gate entry)'],
    safetyGuidelines: {
      medicalAdvice: 'Stay inside the 4x4 Gypsy at all times within the national park.',
      emergencyContacts: 'Corbett Forest Control: 1800-112-999',
      fitnessRequirements: 'Suitable for all ages.',
      safetyEquipment: 'First-aid kit in all safari vehicles.',
      weatherPrecautions: 'Core zones open from October 15 to June 15.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Daily Departures', endDate: '2 Days', availableSeats: 12, totalSeats: 24, status: 'Open' }
    ],
    pricing: {
      originalPrice: 6500,
      discountPrice: 4999,
      taxes: 250,
      groupDiscount: '₹500 off per family booking',
      studentDiscount: 'N/A',
      breakdown: [
        { item: 'Jungle Resort Stay & All Meals', amount: 2600 },
        { item: 'Two 4x4 Gypsy Safaris & Forest Entry Permits', amount: 1800 },
        { item: 'Registered Government Naturalist Tracker', amount: 599 },
        { item: 'GST (5%)', amount: 250 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80', caption: 'Royal Bengal Tiger patrolling the sal forest trail' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Siddharth Jain',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'We were blessed to spot a tigress and her two cubs walking right across our jeep track in Bijrani! Anand is an exceptional tracker who reads alarm calls brilliantly.',
        tripDate: 'April 2026'
      }
    ],
    faqs: [
      {
        question: 'Which is the best zone for tiger sightings?',
        answer: 'Bijrani and Dhikala zones consistently report the highest tiger sighting frequencies in Corbett due to their mixed riverine and grassland ecology.'
      }
    ]
  },
  {
    id: 'andaman-havelock-night-kayaking',
    name: 'Havelock Island Bioluminescence Night Kayaking',
    category: 'Water Sports',
    destination: 'Havelock Island, Andaman',
    destinationId: 'andaman',
    difficulty: 'Easy',
    duration: 'Evening (2.5 hours)',
    price: 2499,
    originalPrice: 3500,
    rating: 4.95,
    reviewsCount: 380,
    organizer: {
      name: 'Tanvi Roy',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      company: 'Andaman Sea Kayaking Collective',
      yearsExperience: 9,
      completedTrips: 820,
      rating: 4.97,
      verified: true,
      responseTime: 'Under 30 mins',
      languages: ['English', 'Hindi', 'Bengali'],
      about: 'Marine biologist and ACA-certified coastal kayak instructor.'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Paddle through mystical mangrove channels under moonless skies where every stroke of your paddle lights up with electric blue bioluminescent phytoplankton. A truly magical, dreamlike sensory encounter with living ocean light.',
    experienceSummary: 'A 2.5-hour night kayak through serene mangrove channels glowing with living blue bioluminescent sea organisms.',
    highlights: [
      'Witness glowing electric-blue bioluminescence on every paddle stroke',
      'Navigate calm mangrove tunnels under millions of tropical stars',
      'Learn the fascinating biology behind glowing dinoflagellates',
      'Small intimate groups with dedicated guide and safety boat',
      'Night astrophotography tips and memory captures'
    ],
    suitableFor: ['Couples', 'Solo adventurers', 'Nature lovers', 'Families with kids 10+'],
    ageRecommendations: '10 to 60 Years',
    adventureInfo: {
      difficultyLevel: 'Easy (Completely flat, calm mangrove waters)',
      duration: '2.5 Hours (Starts at 6:30 PM / 8:30 PM)',
      groupSize: '4 - 10 Kayakers',
      minimumAge: '10 Years',
      fitnessLevel: 'Basic arm mobility; non-swimmers fully welcome',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: '100% refund if sea conditions or heavy rain prevent tour.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Mangrove Night Kayak Launch & Bioluminescent Glow',
        description: 'Meet at Havelock jetty. Equip lifejackets and headlamps. Paddle into the quiet mangrove backwaters. Turn off headlamps as the water begins to shimmer and sparkle with blue bioluminescent light.',
        activities: ['Gear fitting & night paddling demo', 'Mangrove channel navigation', 'Bioluminescence glow observation', 'Return to jetty by 9:00 PM']
      }
    ],
    whatsIncluded: [
      'Premium sea kayak, lightweight paddle, and CE life vest',
      'Certified marine biologist guide',
      'Waterproof phone pouch and headlamp loan',
      'Complimentary hot tea after the night paddle'
    ],
    notIncluded: ['Hotel transfers in Havelock'],
    whatToBring: ['Comfortable beach shorts and t-shirt', 'Mosquito repellent', 'Towel and dry clothes'],
    safetyGuidelines: {
      medicalAdvice: 'Life jackets are mandatory for all participants throughout the session.',
      emergencyContacts: 'Havelock Police & Coast Guard: 1800-112-999',
      fitnessRequirements: 'Suitable for beginners and non-swimmers.',
      safetyEquipment: 'Trailing motorized safety rescue boat on all night tours.',
      weatherPrecautions: 'Best on dark/new moon phases for maximum brightness.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Nightly (6:30 PM Batch)', endDate: 'Evening', availableSeats: 6, totalSeats: 10, status: 'Open' },
      { id: 'b2', startDate: 'Nightly (8:30 PM Batch)', endDate: 'Night', availableSeats: 2, totalSeats: 10, status: 'Almost Full' }
    ],
    pricing: {
      originalPrice: 3500,
      discountPrice: 2499,
      taxes: 125,
      groupDiscount: '10% off for 4+ paddlers',
      studentDiscount: '₹200 off with ID',
      breakdown: [
        { item: 'Night Kayak Gear & Safety Boat Escort', amount: 1600 },
        { item: 'Marine Biologist Interpretation & Guide', amount: 600 },
        { item: 'Mangrove Conservation Levy', amount: 299 },
        { item: 'GST (5%)', amount: 125 }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80', caption: 'Blue bioluminescent glow sparkling under the kayak paddles' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Suhani Mehta',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: 'It looked like Avatar! Swishing your hand in the dark water creates spirals of electric blue fairy dust. The quietness of the mangroves at night was soul-soothing.',
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: 'Does bioluminescence happen every night?',
        answer: 'Yes! However, it is most dramatically visible during the new moon and low moonlit nights when background sky light is at its darkest.'
      }
    ]
  }
];

// Helper to generate the remaining up to 32 adventures so we easily surpass the 30-adventure requirement
const EXTRA_ADVENTURES_TEMPLATES = [
  { id: 'andaman-neil-scuba', name: 'Neil Island Coral Garden Scuba Dive', cat: 'Scuba Diving', dest: 'Neil Island, Andaman', diff: 'Easy', price: 3600, orig: 4800, dur: '1 Day', rat: 4.87, rev: 210 },
  { id: 'roopkund-mystery-lake', name: 'Roopkund Glacial Mystery Lake Trek', cat: 'Trekking', dest: 'Chamoli, Uttarakhand', diff: 'Hard', price: 14500, orig: 19500, dur: '8 Days', rat: 4.93, rev: 190 },
  { id: 'sandakphu-singalila', name: 'Sandakphu Sleeping Buddha Trek', cat: 'Trekking', dest: 'Darjeeling, West Bengal', diff: 'Moderate', price: 11200, orig: 15000, dur: '6 Days', rat: 4.89, rev: 310 },
  { id: 'valley-of-flowers', name: 'Valley of Flowers UNESCO Biosphere Trek', cat: 'Trekking', dest: 'Govindghat, Uttarakhand', diff: 'Moderate', price: 9500, orig: 13000, dur: '6 Days', rat: 4.95, rev: 540 },
  { id: 'thar-desert-dune-bashing', name: 'Thar Desert 4x4 Dune Bashing & Camp', cat: 'Camping', dest: 'Sam Dunes, Jaisalmer', diff: 'Easy', price: 3200, orig: 4500, dur: '2 Days', rat: 4.82, rev: 410 },
  { id: 'munnar-anamudi-shola', name: 'Anamudi Shola Cloud Forest Hike', cat: 'Trekking', dest: 'Munnar, Kerala', diff: 'Moderate', price: 2400, orig: 3500, dur: '1 Day', rat: 4.85, rev: 230 },
  { id: 'munnar-rock-climbing', name: 'Munnar Granite Crag Rock Climbing', cat: 'Rock & Water Sports', dest: 'Munnar, Kerala', diff: 'Moderate', price: 2100, orig: 3000, dur: '1 Day', rat: 4.79, rev: 140 },
  { id: 'rishikesh-cliff-jumping', name: 'Brahmpuri Cliff Jumping & Raft Run', cat: 'River Rafting', dest: 'Rishikesh, Uttarakhand', diff: 'Easy', price: 1200, orig: 1800, dur: 'Half Day', rat: 4.81, rev: 390 },
  { id: 'manali-bhrigu-lake', name: 'Bhrigu Lake Alpine Glacial Ridge Trek', cat: 'Trekking', dest: 'Manali, Himachal Pradesh', diff: 'Hard', price: 7499, orig: 10500, dur: '4 Days', rat: 4.88, rev: 270 },
  { id: 'markha-valley-trek', name: 'Markha Valley Silk Route Trek', cat: 'Trekking', dest: 'Leh Ladakh', diff: 'Moderate', price: 19500, orig: 26000, dur: '7 Days', rat: 4.92, rev: 230 },
  { id: 'pangong-lake-camp', name: 'Pangong Tso Alpine Stargazing Camp', cat: 'Camping', dest: 'Pangong, Ladakh', diff: 'Easy', price: 4500, orig: 6200, dur: '2 Days', rat: 4.9, rev: 480 },
  { id: 'goa-parasailing-combo', name: 'Calangute Ocean Speedboat & Parasailing', cat: 'Water Sports', dest: 'Goa', diff: 'Easy', price: 1999, orig: 2999, dur: 'Half Day', rat: 4.76, rev: 520 },
  { id: 'kaza-yak-safari', name: 'Kibber High Plateau Snow Leopard Safari', cat: 'Wildlife Safari', dest: 'Spiti Valley', diff: 'Challenging', price: 28500, orig: 38000, dur: '7 Days', rat: 4.97, rev: 85 },
  { id: 'mawsmai-cave-spelunking', name: 'Mawsmai Limestone Cave Spelunking', cat: 'Rock & Water Sports', dest: 'Cherrapunji, Meghalaya', diff: 'Moderate', price: 1800, orig: 2500, dur: '1 Day', rat: 4.83, rev: 210 },
  { id: 'barapole-rafting', name: 'Barapole White Water Grade IV Challenge', cat: 'River Rafting', dest: 'Coorg, Karnataka', diff: 'Hard', price: 2200, orig: 3200, dur: '1 Day', rat: 4.84, rev: 180 },
  { id: 'kashmir-great-lakes', name: 'Kashmir Great Lakes Alpine Trek', cat: 'Trekking', dest: 'Sonamarg to Naranag, Kashmir', diff: 'Moderate', price: 16500, orig: 22000, dur: '7 Days', rat: 4.99, rev: 620 },
  { id: 'tarsar-marsar-trek', name: 'Tarsar Marsar Twin Almond Lakes Trek', cat: 'Trekking', dest: 'Aru Valley, Kashmir', diff: 'Moderate', price: 15500, orig: 21000, dur: '6 Days', rat: 4.97, rev: 340 },
  { id: 'brahmatal-snow-trek', name: 'Brahmatal Winter Summit & Mt Trishul Trek', cat: 'Trekking', dest: 'Lohajung, Uttarakhand', diff: 'Moderate', price: 8499, orig: 12000, dur: '6 Days', rat: 4.91, rev: 410 },
  { id: 'har-ki-dun-valley', name: 'Har Ki Dun Cradle of Shiva Valley', cat: 'Trekking', dest: 'Sankri, Uttarakhand', diff: 'Moderate', price: 9200, orig: 13500, dur: '7 Days', rat: 4.9, rev: 290 },
  { id: 'kudremukh-peak-trek', name: 'Kudremukh Horse-Face Peak Forest Trek', cat: 'Trekking', dest: 'Chikkamagaluru, Karnataka', diff: 'Moderate', price: 3199, orig: 4200, dur: '2 Days', rat: 4.87, rev: 330 }
];

// Combine and generate full dataset with all required fields
EXTRA_ADVENTURES_TEMPLATES.forEach((item, index) => {
  ADVENTURES_DATA.push({
    id: item.id,
    name: item.name,
    category: item.cat,
    destination: item.dest,
    destinationId: item.dest.toLowerCase().split(',')[0].trim().replace(/\s+/g, '-'),
    difficulty: item.diff,
    duration: item.dur,
    price: item.price,
    originalPrice: item.orig,
    rating: item.rat,
    reviewsCount: item.rev,
    organizer: {
      name: 'Aditya Vardhan',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      company: 'AdventureX Pioneer Outfits',
      yearsExperience: 12 + (index % 6),
      completedTrips: 300 + index * 30,
      rating: 4.9,
      verified: true,
      responseTime: 'Under 1 hour',
      languages: ['English', 'Hindi', 'Regional'],
      about: 'Certified wilderness leader with extensive field experience across the Indian subcontinent.'
    },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ],
    description: `Experience the raw beauty of ${item.dest} with the ${item.name}. Designed for adventure lovers seeking certified leaders, high-standard safety equipment, and unforgettable landscapes.`,
    experienceSummary: `A handcrafted ${item.dur} expedition in ${item.dest} featuring pristine trails, local cuisine, and professional wilderness guidance.`,
    highlights: [
      `Immersive wilderness exploration across ${item.dest}`,
      `Led by certified expert guides with 10+ years experience`,
      `Safety gear checked and sanitized prior to every batch`,
      `Nutritious local meals and high-energy trail provisions`,
      `Small batches ensuring personalized attention`
    ],
    suitableFor: ['Adventure enthusiasts', 'Solo travelers', 'Small groups', 'Photographers'],
    ageRecommendations: '12 to 55 Years',
    adventureInfo: {
      difficultyLevel: item.diff,
      duration: item.dur,
      groupSize: '8 - 14 Participants',
      minimumAge: '12 Years',
      fitnessLevel: 'Average to good physical fitness',
      languagesSupported: ['English', 'Hindi'],
      cancellationPolicy: '100% refund up to 10 days before departure.'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Basecamp Briefing',
        description: `Meet the expedition team at ${item.dest}. Gear inspection, health vitals screening, and orientation walk.`,
        activities: ['Registration & welcome briefing', 'Gear distribution & harness checks', 'Evening campfire and trail review']
      },
      {
        day: 2,
        title: 'Core Expedition Day',
        description: `The main activity day of ${item.name}. Early start to maximize trail conditions and catch golden hour vistas.`,
        activities: ['Early departure for the route', 'Navigate the scenic terrain', 'Celebration & summit/finish ceremony']
      }
    ],
    whatsIncluded: [
      'All guided activities under certified instructors',
      'Standard high-grade safety equipment & gear rental',
      'Forest department entry and ecological permits',
      'Comprehensive first aid and emergency response backup'
    ],
    notIncluded: ['Personal travel to basecamp', 'Personal clothing & boots', 'Optional personal insurance'],
    whatToBring: ['Sturdy hiking shoes or sports sneakers', 'Weather-appropriate clothing', 'Personal water bottle & ID proof'],
    safetyGuidelines: {
      medicalAdvice: 'Inform the team in advance of any respiratory or cardiovascular conditions.',
      emergencyContacts: 'AdventureX Emergency Dispatch: 1800-112-999',
      fitnessRequirements: 'Able to participate comfortably in outdoor physical activities.',
      safetyEquipment: 'Inspected and certified gear compliant with national adventure safety standards.',
      weatherPrecautions: 'Activities adjusted based on real-time mountain and sea forecasts.'
    },
    availableDates: [
      { id: 'b1', startDate: 'Upcoming Weekend Batch', endDate: 'Batch A', availableSeats: 5, totalSeats: 14, status: 'Open' },
      { id: 'b2', startDate: 'Next Month Batch', endDate: 'Batch B', availableSeats: 2, totalSeats: 14, status: 'Almost Full' }
    ],
    pricing: {
      originalPrice: item.orig,
      discountPrice: item.price,
      taxes: Math.round(item.price * 0.05),
      groupDiscount: '10% discount for groups of 4+',
      studentDiscount: '₹200 off with student ID',
      breakdown: [
        { item: 'Activity Logistics & Instructor Fee', amount: Math.round(item.price * 0.7) },
        { item: 'Safety Equipment & Permit Fees', amount: Math.round(item.price * 0.25) },
        { item: 'GST & Regulatory Taxes (5%)', amount: Math.round(item.price * 0.05) }
      ]
    },
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', caption: `${item.name} scenic landscape` }
    ],
    reviews: [
      {
        id: 1,
        name: 'Aakash Verma',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        country: 'India',
        rating: 5,
        review: `Unbelievable experience doing ${item.name}! The team was very professional and patient. Highly recommended!`,
        tripDate: 'March 2026'
      }
    ],
    faqs: [
      {
        question: `How should I prepare for ${item.name}?`,
        answer: 'Ensure you have comfortable shoes and follow the what-to-bring checklist. Our guides will handle all technical safety logistics.'
      }
    ]
  });
});
