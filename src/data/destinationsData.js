// 20+ Realistic Destinations Dataset for AdventureX Discovery Module
export const DESTINATIONS_DATA = [
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.2396,
    longitude: 77.1887,
    rating: 4.9,
    reviewsCount: 1420,
    price: 4999,
    difficulty: 'Moderate',
    season: 'Summer',
    seasonsAvailable: ['Summer', 'Winter', 'Autumn', 'Spring'],
    duration: '3-5 Days',
    durationDays: 4,
    adventureCount: 38,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Paragliding', 'Camping', 'River Rafting', 'Mountain Biking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-01-15',
    description: 'Nestled on the Beas River, Manali is India’s premier Himalayan playground. Surrounded by soaring snow-capped peaks, pine forests, and alpine passes, it offers world-class trekking routes, tandem paragliding at Solang Valley, and white-water rapids.',
    images: [
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '2,050 m (6,726 ft)',
      bestMonths: 'May to October for Treks, Dec to Feb for Snow Sports',
      nearestAirport: 'Bhuntar Airport (KUU) - 50 km',
      nearestRailway: 'Chandigarh Junction (CDG) - 310 km',
      summary: 'From the iconic Rohtang Pass to the serene Solang Valley and the dramatic Hampta Pass trek, Manali serves as the strategic launchpad for adrenaline seekers.'
    },
    weather: {
      temperature: '18°C',
      feelsLike: '17°C',
      condition: 'Sunny Alpine Breezes',
      humidity: '45%',
      windSpeed: '12 km/h',
      uvIndex: 'Moderate'
    },
    adventures: [
      {
        id: 'manali-hampta-pass',
        name: 'Hampta Pass Cross-Valley Trek',
        difficulty: 'Moderate',
        duration: '5 Days / 4 Nights',
        price: 8999,
        category: 'Trekking',
        shortDescription: 'Traverse lush green Kullu meadows straight into the stark, lunar landscapes of Lahaul with Shea Goru campsite.'
      },
      {
        id: 'manali-solang-paragliding',
        name: 'Solang Valley High Fly Tandem Paragliding',
        difficulty: 'Easy',
        duration: 'Half Day',
        price: 3499,
        category: 'Paragliding',
        shortDescription: 'Launch from 8,500 feet over the Solang alpine valley with certified international pilots and HD GoPro footage.'
      },
      {
        id: 'manali-beas-rafting',
        name: 'Beas River Grade III+ Rapids Challenge',
        difficulty: 'Moderate',
        duration: '1 Day',
        price: 1800,
        category: 'River Rafting',
        shortDescription: '14 kilometers of exhilarating white-water waves from Pirdi down to Jhiri under professional safety raft escort.'
      },
      {
        id: 'manali-bhrigu-lake',
        name: 'Bhrigu Lake Glacial Ridge Expedition',
        difficulty: 'Hard',
        duration: '4 Days / 3 Nights',
        price: 7499,
        category: 'Trekking',
        shortDescription: 'Ascend to a high-altitude holy alpine lake at 14,100 feet that remains frozen throughout winter and spring.'
      }
    ],
    thingsToCarry: [
      'Warm thermal inners & waterproof windcheater jacket',
      'High-ankle trekking shoes with vibram grip',
      'UV 400 polarized sunglasses & high SPF sunblock (50+)',
      'Quick-dry trekking trousers and moisture-wicking tees',
      'Personal hydration flask (minimum 2 Liters)',
      'Headlamp with spare lithium batteries',
      'Basic wilderness medical kit with Diamox for altitude'
    ],
    safetyGuidelines: [
      'Always follow lead guide trail directions and pace',
      'Acclimatize in Old Manali for 24 hours prior to steep ascents above 3,000m',
      'Never attempt river crossing without safety harness and helmet',
      'Adhere to strict "Leave No Trace" wilderness conservation principles'
    ],
    nearbyAttractions: [
      { name: 'Solang Valley', distance: '14 km', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rohtang Pass', distance: '51 km', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { name: 'Jogini Waterfalls', distance: '4 km', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=400&q=80' },
      { name: 'Old Manali Village', distance: '2 km', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=400&q=80' }
    ],
    faqs: [
      {
        question: 'What is the best season to visit Manali for high-altitude trekking?',
        answer: 'Mid-May through early October offers the best trail conditions with blooming alpine wild blossoms and accessible high mountain passes.'
      },
      {
        question: 'Is prior mountaineering experience required for Hampta Pass?',
        answer: 'No technical mountaineering experience is required, but a good baseline cardiovascular fitness (jogging 5km in under 35 mins) is recommended.'
      },
      {
        question: 'Are guides certified for safety during paragliding?',
        answer: 'Yes, all paragliding tandem masters are licensed by the Himachal Pradesh Tourism Directorate and carry certified backup reserve parachutes.'
      }
    ],
    reviews: [
      {
        name: 'Arjun Nambiar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        location: 'Bengaluru',
        date: 'October 2026',
        comment: 'Hampta Pass was pure magic! Transitioning from green pine valleys into cold desert landscapes of Spiti in 5 days is something I will never forget.'
      },
      {
        name: 'Divya Khurana',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        location: 'Delhi NCR',
        date: 'September 2026',
        comment: 'Solang valley paragliding was breathtaking. Certified tandem pilot gave clear briefing and we glided for nearly 15 minutes.'
      }
    ]
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    state: 'UT of Ladakh',
    country: 'India',
    latitude: 34.1526,
    longitude: 77.5771,
    rating: 5.0,
    reviewsCount: 980,
    price: 14999,
    difficulty: 'Hard',
    season: 'Summer',
    seasonsAvailable: ['Summer', 'Winter', 'Autumn'],
    duration: '1 Week',
    durationDays: 7,
    adventureCount: 24,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Mountain Biking', 'Camping'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-01-20',
    description: 'The Land of High Passes, Leh Ladakh features stark moonscapes, turquoise glacial lakes like Pangong Tso, Buddhist monasteries perched on granite crags, and passes towering above 18,000 feet.',
    images: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '3,524 m (11,562 ft)',
      bestMonths: 'June to September for roads, Jan-Feb for Chadar ice trek',
      nearestAirport: 'Kushok Bakula Rimpochee Airport (IXL) - 4 km',
      nearestRailway: 'Jammu Tawi (JAT) - 700 km',
      summary: 'An unparalleled high-altitude cold desert offering world-class motorcycle expeditions, Markha Valley treks, and sub-zero winter thrill.'
    },
    weather: {
      temperature: '14°C',
      feelsLike: '12°C',
      condition: 'Crystal Clear Mountain Skies',
      humidity: '28%',
      windSpeed: '18 km/h',
      uvIndex: 'Very High'
    },
    adventures: [
      {
        id: 'leh-markha-valley',
        name: 'Markha Valley Wilderness Trek',
        difficulty: 'Hard',
        duration: '7 Days / 6 Nights',
        price: 18999,
        category: 'Trekking',
        shortDescription: 'Traverse Hemis National Park, crossing high passes Kongmaru La (5,260m) with views of Kang Yatse.'
      },
      {
        id: 'leh-khardung-la-cycling',
        name: 'Khardung La World Highest Downhill Cycling',
        difficulty: 'Moderate',
        duration: '1 Day',
        price: 4999,
        category: 'Mountain Biking',
        shortDescription: 'Descend 40 km from 17,982 ft pass down into Leh valley with support vehicle and hydraulic disc bikes.'
      }
    ],
    thingsToCarry: [
      'Four-season sub-zero sleeping bag & thermals',
      'Diamox altitude medication & electrolyte hydration powder',
      'Heavy windproof down feather parka jacket',
      'UV Category 4 mountaineering glacier glasses'
    ],
    safetyGuidelines: [
      'Mandatory 48-hour acclimatization in Leh before any strenuous exertion',
      'Hydrate with at least 4-5 liters of water daily',
      'Oxygen saturation (SpO2) checks every morning and evening'
    ],
    nearbyAttractions: [
      { name: 'Pangong Tso Lake', distance: '160 km', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&q=80' },
      { name: 'Nubra Valley', distance: '120 km', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' },
      { name: 'Thiksey Monastery', distance: '19 km', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' }
    ],
    faqs: [
      { question: 'Is oxygen cylinder support provided?', answer: 'Yes, all our high-altitude Ladakh teams carry portable medical oxygen canisters.' },
      { question: 'Do I need an Inner Line Permit (ILP)?', answer: 'Yes, we handle ILP processing for Nubra, Pangong, and Changthang automatically.' }
    ],
    reviews: [
      {
        name: 'Karan Varma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        location: 'Mumbai',
        date: 'August 2026',
        comment: 'Cycling down from Khardung La was the adrenaline highlight of my life. Professional gear and backup vehicle gave 100% confidence.'
      }
    ]
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    country: 'India',
    latitude: 30.0869,
    longitude: 78.2676,
    rating: 4.9,
    reviewsCount: 3100,
    price: 2999,
    difficulty: 'Moderate',
    season: 'Autumn',
    seasonsAvailable: ['Autumn', 'Spring', 'Winter', 'Summer'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 52,
    primaryCategory: 'River Rafting',
    categories: ['River Rafting', 'Camping', 'Rock Climbing'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-01-18',
    description: 'The Adventure Capital of India, Rishikesh sits where the emerald Ganges tumbles out of the Shivalik foothills. Famous for world-class Grade IV rapids, 83m bungee jumps, and riverside beach camping.',
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '372 m (1,220 ft)',
      bestMonths: 'September to June (Monsoon closed for rafting)',
      nearestAirport: 'Dehradun Jolly Grant Airport (DED) - 21 km',
      nearestRailway: 'Yog Nagari Rishikesh (YNRK) - 5 km',
      summary: 'Home to the iconic rapids "The Wall", "Roller Coaster", and "Golf Course", plus India’s highest fixed bungee platform.'
    },
    weather: {
      temperature: '24°C',
      feelsLike: '24°C',
      condition: 'Clear River Breeze',
      humidity: '52%',
      windSpeed: '9 km/h',
      uvIndex: 'Moderate'
    },
    adventures: [
      {
        id: 'rishikesh-grade-4-marine-drive',
        name: 'Marine Drive to Rishikesh 26km Grade IV Rafting',
        difficulty: 'Moderate',
        duration: '1 Full Day',
        price: 2499,
        category: 'River Rafting',
        shortDescription: 'Conquer 10 major rapids followed by body surfing and a 25-ft cliff jump at Shivpuri.'
      },
      {
        id: 'rishikesh-bungee-jump',
        name: 'Mohanchatti 83m Fixed Platform Bungee Jump',
        difficulty: 'Hard',
        duration: 'Half Day',
        price: 3700,
        category: 'Rock Climbing',
        shortDescription: 'Designed by New Zealand jump masters over the Hall river canyon with ISO certified safety harness.'
      }
    ],
    thingsToCarry: [
      'Quick-drying synthetic swimwear or board shorts',
      'Water shoes with strap retention',
      'Waterproof phone dry pouch with neck lanyard',
      'Towel & spare dry change of clothes'
    ],
    safetyGuidelines: [
      'Lifejacket and carbon helmet must stay strapped at all times on the water',
      'Listen closely to river captain commands: "All Forward", "Paddle Hard", "Hold Rope"',
      'No swimming without guide approval'
    ],
    nearbyAttractions: [
      { name: 'Neer Garh Waterfall', distance: '6 km', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80' },
      { name: 'Shivpuri River Beach', distance: '16 km', image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80' }
    ],
    faqs: [
      { question: 'Can non-swimmers do river rafting?', answer: 'Yes! High-buoyancy PFD life jackets keep you securely afloat.' },
      { question: 'What is the minimum age for Grade IV rapids?', answer: 'Minimum age is 14 years for 26km and 12 years for 16km.' }
    ],
    reviews: [
      {
        name: 'Neha Saxena',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        location: 'Chandigarh',
        date: 'October 2026',
        comment: 'Roller Coaster rapid gave us the biggest adrenaline rush! Our captain Vijay made us feel totally in safe hands.'
      }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Western Coast',
    country: 'India',
    latitude: 15.2993,
    longitude: 74.1240,
    rating: 4.8,
    reviewsCount: 2180,
    price: 3499,
    difficulty: 'Easy',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Autumn', 'Spring'],
    duration: '3-5 Days',
    durationDays: 3,
    adventureCount: 45,
    primaryCategory: 'Scuba Diving',
    categories: ['Scuba Diving', 'Trekking', 'Camping'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-01-22',
    description: 'Beyond sunny beaches and nightlife, Goa hides emerald Western Ghats rainforest treks, Dudhsagar waterfall canyoning, and Grande Island coral scuba diving.',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: 'Sea Level to 1,022 m',
      bestMonths: 'October to May for ocean diving & water visibility',
      nearestAirport: 'Dabolim Airport (GOI) / Mopa (GOX)',
      nearestRailway: 'Madgaon Junction (MAO) - 30 km',
      summary: 'Grande Island offers vibrant coral gardens, batfish, and historic shipwrecks accessible to both beginners and PADI divers.'
    },
    weather: {
      temperature: '29°C',
      feelsLike: '31°C',
      condition: 'Tropical Coastal Sun',
      humidity: '68%',
      windSpeed: '14 km/h',
      uvIndex: 'High'
    },
    adventures: [
      {
        id: 'goa-grande-island-scuba',
        name: 'Grande Island Scuba Diving & Dolphin Cruise',
        difficulty: 'Easy',
        duration: '1 Full Day',
        price: 3800,
        category: 'Scuba Diving',
        shortDescription: 'Discover coral reefs with 1-on-1 PADI instructor dive, underwater HD videos, and buffet lunch.'
      },
      {
        id: 'goa-dudhsagar-trek',
        name: 'Dudhsagar Four-Tier Waterfall Jeep & Trek',
        difficulty: 'Moderate',
        duration: '1 Day',
        price: 2200,
        category: 'Trekking',
        shortDescription: 'Deep jungle 4x4 safari through Bhagwan Mahavir Sanctuary to swim in pristine natural waterfall pools.'
      }
    ],
    thingsToCarry: ['Biodegradable ocean-safe sunscreen', 'Swim suit and change of clothes', 'Snorkeling mask if personal preference'],
    safetyGuidelines: ['Never touch or step on living coral reefs', 'Equalize ear pressure consistently while descending underwater'],
    nearbyAttractions: [
      { name: 'Grande Island', distance: '12 km by Boat', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80' },
      { name: 'Dudhsagar Falls', distance: '60 km', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80' }
    ],
    faqs: [{ question: 'Do I need swimming skills for intro scuba?', answer: 'No! An instructor holds your hand throughout the 20-30 minute dive.' }],
    reviews: [
      {
        name: 'Pooja Iyer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        location: 'Pune',
        date: 'November 2026',
        comment: 'Saw angelfish and even a reef turtle at Grande Island! High quality diving equipment.'
      }
    ]
  },
  {
    id: 'coorg',
    name: 'Coorg',
    state: 'Karnataka',
    country: 'India',
    latitude: 12.3375,
    longitude: 75.8069,
    rating: 4.7,
    reviewsCount: 840,
    price: 3999,
    difficulty: 'Easy',
    season: 'Monsoon',
    seasonsAvailable: ['Monsoon', 'Autumn', 'Winter', 'Spring'],
    duration: '3-5 Days',
    durationDays: 3,
    adventureCount: 19,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'River Rafting', 'Camping'],
    isPopular: false,
    isFeatured: true,
    createdAt: '2026-02-01',
    description: 'The Scotland of India, Coorg boasts emerald coffee estates, misty Shola forests, and Brahmagiri mountain ridge climbs. Barapole River offers thrilling seasonal white-water rafting.',
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '1,170 m (3,840 ft)',
      bestMonths: 'July to September for Monsoon rafting, Oct to March for Treks',
      nearestAirport: 'Kannur International Airport (CNN) - 90 km',
      nearestRailway: 'Mysuru Junction (MYS) - 120 km',
      summary: 'Famous for Tadiandamol Peak (highest in Coorg), Abbey Falls, and white-water rapids through dense evergreen woods.'
    },
    weather: {
      temperature: '21°C',
      feelsLike: '21°C',
      condition: 'Misty Coffee Valleys',
      humidity: '75%',
      windSpeed: '10 km/h',
      uvIndex: 'Moderate'
    },
    adventures: [
      {
        id: 'coorg-tadiandamol',
        name: 'Tadiandamol Peak Rainforest Ascent',
        difficulty: 'Moderate',
        duration: '1 Day',
        price: 1999,
        category: 'Trekking',
        shortDescription: 'Climb 1,748m above sea level through Shola grasslands and misty rainforest ridges.'
      },
      {
        id: 'coorg-barapole-rafting',
        name: 'Barapole River Monsoon Grade III+ Rafting',
        difficulty: 'Moderate',
        duration: 'Half Day',
        price: 1750,
        category: 'River Rafting',
        shortDescription: 'White water rush through rapids named "Morning Coffee" and "Milky Churn".'
      }
    ],
    thingsToCarry: ['Leech socks for monsoon treks', 'Sturdy grip boots', 'Rain poncho and waterproof bag cover'],
    safetyGuidelines: ['Stay on forest trails to prevent wildlife encounters', 'Check river gauge flags before launching on Barapole'],
    nearbyAttractions: [
      { name: 'Abbey Falls', distance: '8 km', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' }
    ],
    faqs: [{ question: 'Is camping allowed inside the sanctuary?', answer: 'Camping is allowed only at designated forest department approved campsites.' }],
    reviews: [
      { name: 'Siddharth Rao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Bengaluru', date: 'August 2026', comment: 'Rafting at Barapole during peak monsoon was exhilarating!' }
    ]
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    country: 'India',
    latitude: 10.0889,
    longitude: 77.0595,
    rating: 4.8,
    reviewsCount: 1150,
    price: 4499,
    difficulty: 'Easy',
    season: 'Autumn',
    seasonsAvailable: ['Autumn', 'Winter', 'Spring'],
    duration: '3-5 Days',
    durationDays: 3,
    adventureCount: 26,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping', 'Mountain Biking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-05',
    description: 'Rolling green tea plantations, clouds floating below peak summits, and home to Anamudi—South India’s highest summit. Ideal for cliff camping and rugged mountain biking.',
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '1,600 m (5,200 ft)',
      bestMonths: 'September to March for crystal clear summit horizons',
      nearestAirport: 'Cochin International Airport (COK) - 110 km',
      nearestRailway: 'Aluva Railway Station (AWY) - 110 km',
      summary: 'Explore Meesapulimala trek (second highest peak in the Western Ghats) with sunrise above the clouds.'
    },
    weather: {
      temperature: '17°C',
      feelsLike: '17°C',
      condition: 'Misty Cloud Inversion',
      humidity: '70%',
      windSpeed: '12 km/h',
      uvIndex: 'Moderate'
    },
    adventures: [
      {
        id: 'munnar-meesapulimala',
        name: 'Meesapulimala Peak Cloud Nine Trek',
        difficulty: 'Moderate',
        duration: '2 Days / 1 Night',
        price: 3999,
        category: 'Trekking',
        shortDescription: 'Trek across eight mountain ridges through tea estates and rhododendron blossoms to witness sunrise above clouds.'
      }
    ],
    thingsToCarry: ['Warm fleece jacket for night drop to 8°C', 'Sturdy walking stick', 'Binoculars for Nilgiri Tahr spotting'],
    safetyGuidelines: ['Maintain distance from wild elephant corridors near Chinnakanal', 'Follow forest officer permit rules'],
    nearbyAttractions: [{ name: 'Top Station', distance: '32 km', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Can we spot Nilgiri Tahr?', answer: 'Yes, Eravikulam National Park is home to the largest surviving population of Nilgiri Tahr.' }],
    reviews: [{ name: 'Anoop Nair', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Kochi', date: 'October 2026', comment: 'The sunrise from Meesapulimala is truly unforgettable!' }]
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.2461,
    longitude: 78.0349,
    rating: 4.9,
    reviewsCount: 780,
    price: 13999,
    difficulty: 'Hard',
    season: 'Summer',
    seasonsAvailable: ['Summer', 'Autumn'],
    duration: '1 Week',
    durationDays: 7,
    adventureCount: 22,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping', 'Mountain Biking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-10',
    description: 'The Middle Land between Tibet and India. Towering bare brown mountains, 1,000-year-old Key Monastery, Chandratal blue lake camping, and fossil-hunting in Langza.',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '3,800 m to 4,590 m',
      bestMonths: 'June to September when Kunzum Pass and Rohtang are open',
      nearestAirport: 'Bhuntar (KUU) - 245 km',
      nearestRailway: 'Shimla (SML) - 410 km',
      summary: 'Extreme high-altitude desert roads, starlit Milky Way photography, and the world’s highest post office in Hikkim.'
    },
    weather: { temperature: '12°C', feelsLike: '10°C', condition: 'High Altitude Sun', humidity: '20%', windSpeed: '22 km/h', uvIndex: 'Extreme' },
    adventures: [
      {
        id: 'spiti-chandratal-trek',
        name: 'Chandratal Crescent Moon Lake Camping & Trek',
        difficulty: 'Hard',
        duration: '6 Days / 5 Nights',
        price: 15499,
        category: 'Camping',
        shortDescription: 'Camp under billion stars beside the turquoise glacial waters of Moon Lake at 14,000 ft.'
      }
    ],
    thingsToCarry: ['Sub-zero sleeping bag rating -10°C', 'High calorie trail nuts & energy bars', 'Thermal head beanie & balaclava'],
    safetyGuidelines: ['Never sleep directly at high altitude without gradual staging', 'Carry emergency AMS meds'],
    nearbyAttractions: [{ name: 'Key Monastery', distance: '14 km', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is mobile connectivity available?', answer: 'Only BSNL postpaid has reliable connectivity in Kaza.' }],
    reviews: [{ name: 'Sneha Kapur', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Delhi', date: 'July 2026', comment: 'The night sky at Chandratal felt like another planet.' }]
  },
  {
    id: 'bir-billing',
    name: 'Bir Billing',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.0543,
    longitude: 76.7179,
    rating: 4.95,
    reviewsCount: 1650,
    price: 4499,
    difficulty: 'Easy',
    season: 'Autumn',
    seasonsAvailable: ['Autumn', 'Spring', 'Winter'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 35,
    primaryCategory: 'Paragliding',
    categories: ['Paragliding', 'Camping', 'Mountain Biking', 'Trekking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-12',
    description: 'Ranked the second-highest paragliding takeoff spot in the world! Launch from Billing at 8,000 feet, thermal over Dhauladhar snow ridges, and land smoothly at Bir Tibetan colony.',
    images: [
      'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: 'Billing (Takeoff): 2,400 m | Bir (Landing): 1,400 m',
      bestMonths: 'October to November (World Cup season) & March to May',
      nearestAirport: 'Dharamshala Gaggal Airport (DHM) - 67 km',
      nearestRailway: 'Pathankot Cantt (PTKC) - 140 km',
      summary: 'Ideal aero-thermal aerodynamics and panoramic views of Kangra Valley.'
    },
    weather: { temperature: '22°C', feelsLike: '22°C', condition: 'Optimal Thermals', humidity: '42%', windSpeed: '12 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'bir-cross-country-paragliding',
        name: 'Tandem Cross-Country Paragliding Flight',
        difficulty: 'Easy',
        duration: 'Half Day (30 min flight)',
        price: 3999,
        category: 'Paragliding',
        shortDescription: 'Thermal flight with licensed pilot including acrobatic spirals and 4K GoPro action camera footage.'
      }
    ],
    thingsToCarry: ['Windbreaker jacket for high air chill', 'Firm lace-up athletic sneakers for takeoff run'],
    safetyGuidelines: ['Listen carefully to launch instruction: Run, Run, Run—never jump off the edge'],
    nearbyAttractions: [{ name: 'Chokling Tibetan Monastery', distance: '2 km', image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'What is weight limit for tandem flight?', answer: 'Tandem passenger weight must typically be between 35 kg and 95 kg.' }],
    reviews: [{ name: 'Rohan Mehra', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Gurugram', date: 'October 2026', comment: 'Flying 30 minutes over Kangra valley was an out of body experience.' }]
  },
  {
    id: 'andaman-nicobar',
    name: 'Andaman Islands',
    state: 'UT of Andaman & Nicobar',
    country: 'India',
    latitude: 11.7401,
    longitude: 92.6586,
    rating: 4.9,
    reviewsCount: 1320,
    price: 8999,
    difficulty: 'Easy',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Spring', 'Autumn'],
    duration: '3-5 Days',
    durationDays: 5,
    adventureCount: 30,
    primaryCategory: 'Scuba Diving',
    categories: ['Scuba Diving', 'Kayaking', 'Trekking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-15',
    description: 'Havelock and Neil Islands offer pristine turquoise lagoons, vibrant barrier reefs, manta rays, and bioluminescent night kayaking through coastal mangrove tunnels.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: 'Sea Level',
      bestMonths: 'November to May for 25m water visibility',
      nearestAirport: 'Veer Savarkar Airport Port Blair (IXZ)',
      nearestRailway: 'None (Island UT - accessible by flight/ferry)',
      summary: 'Home to Elephant Beach, Radhanagar Beach (Asia’s top rated), and Dickson’s Pinnacle deep dive.'
    },
    weather: { temperature: '28°C', feelsLike: '30°C', condition: 'Warm Ocean Breeze', humidity: '72%', windSpeed: '11 km/h', uvIndex: 'High' },
    adventures: [
      {
        id: 'andaman-havelock-scuba',
        name: 'Havelock Island Coral Wall Deep Scuba',
        difficulty: 'Easy',
        duration: '1 Day',
        price: 4999,
        category: 'Scuba Diving',
        shortDescription: '12-meter boat dive exploring coral walls and schools of clownfish and parrotfish.'
      },
      {
        id: 'andaman-night-kayaking',
        name: 'Bioluminescent Mangrove Night Kayaking',
        difficulty: 'Easy',
        duration: '3 Hours',
        price: 2800,
        category: 'Kayaking',
        shortDescription: 'Paddle through glowing glowing blue waters illuminated by phytoplankton dinoflagellates.'
      }
    ],
    thingsToCarry: ['Reef-safe sunscreen', 'Rashguard swim vest', 'Waterproof dry bag'],
    safetyGuidelines: ['No diving within 18 hours before boarding a commercial flight'],
    nearbyAttractions: [{ name: 'Radhanagar Beach', distance: '11 km', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is scuba suitable for first timers?', answer: 'Absolutely! Discovery Scuba Diving (DSD) is tailored specifically for complete beginners.' }],
    reviews: [{ name: 'Dr. Shalini Das', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Kolkata', date: 'December 2026', comment: 'Bioluminescent kayaking in Havelock felt like Avatar Pandora!' }]
  },
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    state: 'Jammu & Kashmir',
    country: 'India',
    latitude: 34.0484,
    longitude: 74.3805,
    rating: 4.88,
    reviewsCount: 1100,
    price: 11999,
    difficulty: 'Moderate',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Spring', 'Summer'],
    duration: '3-5 Days',
    durationDays: 4,
    adventureCount: 28,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping', 'Mountain Biking'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-18',
    description: 'The Meadow of Flowers transforms in winter into Asia’s premier powder skiing and snowboarding capital. The Gulmarg Gondola carries riders to 13,780 feet on Mount Apharwat.',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '2,650 m to 4,200 m (Apharwat Peak)',
      bestMonths: 'Jan to March for snow skiing, May to Sept for alpine hikes',
      nearestAirport: 'Srinagar International Airport (SXR) - 56 km',
      nearestRailway: 'Jammu Tawi (JAT) - 290 km',
      summary: 'World-renowned dry champagne powder snow attracting freeskiers and alpine mountaineers from across the globe.'
    },
    weather: { temperature: '-2°C', feelsLike: '-6°C', condition: 'Powder Snow Showers', humidity: '80%', windSpeed: '16 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'gulmarg-ski-course',
        name: '3-Day Certified Beginner Skiing Course',
        difficulty: 'Moderate',
        duration: '3 Days / 2 Nights',
        price: 9999,
        category: 'Trekking',
        shortDescription: 'Learn balance, snowplow stops, and carving turns with certified IIS&M ski instructors and gear.'
      }
    ],
    thingsToCarry: ['Waterproof ski gloves & salopettes', 'Thermal balaclava and snow goggles'],
    safetyGuidelines: ['Never ski off-piste Phase 2 without avalanche transceiver and local ski guide'],
    nearbyAttractions: [{ name: 'Apharwat Peak', distance: '5 km by Gondola', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is Gondola Phase 2 open for non-skiers?', answer: 'Yes, sightseers can take the Gondola Phase 2 to see the Line of Control peaks.' }],
    reviews: [{ name: 'Amanpreet Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Amritsar', date: 'January 2026', comment: 'The powder snow is on par with European Alps at a fraction of the cost.' }]
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    state: 'Meghalaya',
    country: 'India',
    latitude: 25.4670,
    longitude: 91.3662,
    rating: 4.85,
    reviewsCount: 920,
    price: 6499,
    difficulty: 'Moderate',
    season: 'Autumn',
    seasonsAvailable: ['Autumn', 'Winter', 'Spring'],
    duration: '3-5 Days',
    durationDays: 4,
    adventureCount: 25,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping', 'River Rafting'],
    isPopular: false,
    isFeatured: true,
    createdAt: '2026-02-20',
    description: 'Abode of the Clouds. World-famous living root bridges engineered by the Khasi tribe, crystal clear turquoise rivers in Dawki, and deep limestone cave spelunking.',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '1,496 m (Shillong)',
      bestMonths: 'October to April for caving and Umngot river transparency',
      nearestAirport: 'Guwahati Lokpriya Gopinath Bordoloi Airport (GAU) - 120 km',
      nearestRailway: 'Guwahati Railway Station (GHY) - 100 km',
      summary: 'Explore the 3,500-step descent to Nongriat Double Decker Root Bridge and Krem Liat Prah limestone caves.'
    },
    weather: { temperature: '19°C', feelsLike: '19°C', condition: 'Emerald Misty Canopy', humidity: '76%', windSpeed: '8 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'meghalaya-double-decker',
        name: 'Double Decker Living Root Bridge & Rainbow Falls Trek',
        difficulty: 'Moderate',
        duration: '1 Full Day',
        price: 2499,
        category: 'Trekking',
        shortDescription: 'Descend 3,500 stone stairs into the pristine jungle valley of Cherrapunji to natural pool waterfalls.'
      }
    ],
    thingsToCarry: ['Knee braces for long stair descents', 'Dry sack for river crossings', 'Anti-slip footwear'],
    safetyGuidelines: ['Caving requires headlamps, helmets, and a certified local Khasi guide'],
    nearbyAttractions: [{ name: 'Dawki Umngot River', distance: '85 km', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'How steep is the Double Decker trek?', answer: 'The trail has around 3,500 concrete and stone steps each way; moderate stamina needed.' }],
    reviews: [{ name: 'Tanvi Sen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Kolkata', date: 'November 2026', comment: 'Rainbow falls at the end of the root bridge trek is like paradise on earth.' }]
  },
  {
    id: 'chadar-trek',
    name: 'Chadar Frozen River',
    state: 'UT of Ladakh',
    country: 'India',
    latitude: 33.9167,
    longitude: 76.9000,
    rating: 4.98,
    reviewsCount: 240,
    price: 24999,
    difficulty: 'Hard',
    season: 'Winter',
    seasonsAvailable: ['Winter'],
    duration: '1 Week',
    durationDays: 8,
    adventureCount: 12,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping'],
    isPopular: true,
    isFeatured: true,
    createdAt: '2026-02-22',
    description: 'The wildest winter expedition on planet Earth. Trek over the frozen ice glass sheet of the Zanskar River through deep vertical canyon walls at sub-zero temperatures of -30°C.',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '3,390 m (11,120 ft)',
      bestMonths: 'Mid-January to mid-February only (Ice sheet window)',
      nearestAirport: 'Leh Kushok Bakula Airport (IXL) - 70 km',
      nearestRailway: 'Jammu (JAT) - 750 km',
      summary: 'A bucket-list Arctic-grade trek over crystalline ice formation, frozen canyon waterfalls, and ancient caves.'
    },
    weather: { temperature: '-18°C', feelsLike: '-26°C', condition: 'Sub-Zero Glacial Freeze', humidity: '20%', windSpeed: '15 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'chadar-ultimate-expedition',
        name: 'Chadar 8-Day Frozen River Gorge Expedition',
        difficulty: 'Hard',
        duration: '8 Days / 7 Nights',
        price: 26999,
        category: 'Trekking',
        shortDescription: 'Trek from Shingra Koma to Tibb Cave and Nerak Frozen Waterfall with Zanskari porter guidance.'
      }
    ],
    thingsToCarry: ['Gumboots for slush crossings', 'Minus 30°C rated down jacket', 'Fleece thermals 4 layers'],
    safetyGuidelines: ['Listen for the creaking sound of ice (Chadar). Step where the guide stamps his walking stick.'],
    nearbyAttractions: [{ name: 'Nerak Frozen Waterfall', distance: 'End of Trail', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is medical fitness clearance required?', answer: 'Yes, mandatory government hospital medical checkup in Leh before setting out.' }],
    reviews: [{ name: 'Tsering Dorje', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Leh', date: 'January 2026', comment: 'An unbelievable physical and mental journey into the heart of frozen Zanskar.' }]
  },
  {
    id: 'jim-corbett',
    name: 'Jim Corbett',
    state: 'Uttarakhand',
    country: 'India',
    latitude: 29.5300,
    longitude: 78.7747,
    rating: 4.82,
    reviewsCount: 880,
    price: 6800,
    difficulty: 'Easy',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Spring', 'Autumn'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 16,
    primaryCategory: 'Wildlife Safari',
    categories: ['Wildlife Safari', 'Camping'],
    isPopular: false,
    isFeatured: true,
    createdAt: '2026-02-25',
    description: 'India’s oldest national park, nestled in the Himalayan foothills. Renowned for Royal Bengal tigers, wild herds of Asian elephants, gharial crocodiles, and over 600 bird species.',
    images: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '400 m to 1,220 m',
      bestMonths: 'November to June (Dhikala zone opens Nov 15)',
      nearestAirport: 'Pantnagar Airport (PGH) - 80 km',
      nearestRailway: 'Ramnagar Railway Station (RMR) - 12 km',
      summary: 'Stay inside the historic Dhikala Forest Lodge deep within core tiger reserve territory for morning and evening 4x4 safaris.'
    },
    weather: { temperature: '22°C', feelsLike: '22°C', condition: 'Jungle Canopy Morning Mist', humidity: '55%', windSpeed: '6 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'corbett-dhikala-safari',
        name: 'Dhikala Zone Core 4x4 Jeep Safari',
        difficulty: 'Easy',
        duration: '1 Day',
        price: 3600,
        category: 'Wildlife Safari',
        shortDescription: 'Open-top 4x4 Gypsy tracking tiger pugmarks, sambar alarm calls, and elephant herds along Ramganga river.'
      }
    ],
    thingsToCarry: ['Neutral earthy tone clothes (khaki, olive, brown)', 'High zoom camera lens or 10x42 binoculars'],
    safetyGuidelines: ['Never step down from the safari jeep inside the national park', 'Keep absolute silence when animals are spotted'],
    nearbyAttractions: [{ name: 'Ramganga Reservoir', distance: 'Inside Park', image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'How early should safaris be booked?', answer: 'Dhikala night stay permits open 45 days in advance and sell out rapidly.' }],
    reviews: [{ name: 'Vikram Joshi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Pune', date: 'February 2026', comment: 'Spotted a tigress with two cubs on our second safari drive!' }]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    country: 'India',
    latitude: 15.3350,
    longitude: 76.4600,
    rating: 4.79,
    reviewsCount: 710,
    price: 3200,
    difficulty: 'Moderate',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Autumn', 'Spring'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 20,
    primaryCategory: 'Rock Climbing',
    categories: ['Rock Climbing', 'Mountain Biking', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-01',
    description: 'A surreal boulder-strewn moonscape and UNESCO World Heritage city. Globally revered as India’s bouldering mecca, along with coracle boating across the Tungabhadra river.',
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '467 m',
      bestMonths: 'October to February for cool rock friction temperatures',
      nearestAirport: 'Jindal Vidyanagar Airport (VDY) - 35 km',
      nearestRailway: 'Hosapete Junction (HPT) - 13 km',
      summary: 'Thousands of natural granite boulders provide routes for beginners to V14 grade climbers worldwide.'
    },
    weather: { temperature: '27°C', feelsLike: '27°C', condition: 'Sunny Boulder Sun', humidity: '40%', windSpeed: '10 km/h', uvIndex: 'High' },
    adventures: [
      {
        id: 'hampi-bouldering-clinic',
        name: 'Hampi Natural Granite Bouldering Camp',
        difficulty: 'Moderate',
        duration: '2 Days / 1 Night',
        price: 3200,
        category: 'Rock Climbing',
        shortDescription: 'Crash pads, climbing shoes, chalk, and instruction on crimps, slopers, and mantle tops.'
      }
    ],
    thingsToCarry: ['Climbing chalk & tape', 'Comfortable stretch cotton pants', 'Sun hat and sunglasses'],
    safetyGuidelines: ['Spotters must be attentive with crash pads positioned correctly below the fall line'],
    nearbyAttractions: [{ name: 'Matanga Hill Sunrise', distance: '1 km', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Are climbing shoes available for rent?', answer: 'Yes, local climbing outfitters in Hippie Island rent crash pads and shoes.' }],
    reviews: [{ name: 'Gautam Iyer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Bengaluru', date: 'December 2026', comment: 'Best bouldering community vibes anywhere in Asia.' }]
  },
  {
    id: 'dandeli',
    name: 'Dandeli',
    state: 'Karnataka',
    country: 'India',
    latitude: 15.2361,
    longitude: 74.6173,
    rating: 4.75,
    reviewsCount: 650,
    price: 3499,
    difficulty: 'Easy',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Monsoon', 'Autumn', 'Spring'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 22,
    primaryCategory: 'River Rafting',
    categories: ['River Rafting', 'Camping', 'Kayaking'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-05',
    description: 'Perched on the Kali River in the Western Ghats, Dandeli is famed for year-round dam-fed river rafting, natural jacuzzi river baths, coracle rides, and hornbill bird sanctuaries.',
    images: [
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '473 m',
      bestMonths: 'October to May for rafting & jungle safaris',
      nearestAirport: 'Hubballi Airport (HBX) - 65 km',
      nearestRailway: 'Alnavar Junction (LWR) - 32 km',
      summary: '12 km stretch on Kali river with Grade III rapids such as "Stitched", "Smiley", and "Adi’s Beard".'
    },
    weather: { temperature: '26°C', feelsLike: '26°C', condition: 'Fresh Forest Mist', humidity: '60%', windSpeed: '8 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'dandeli-kali-rafting',
        name: 'Kali River 12km Grade III+ Rafting',
        difficulty: 'Moderate',
        duration: 'Half Day',
        price: 1650,
        category: 'River Rafting',
        shortDescription: 'Exciting rapids through dense teak forests followed by natural jacuzzi rapids bathing.'
      }
    ],
    thingsToCarry: ['Quick dry shorts', 'Strapped river sandals', 'Insect repellent'],
    safetyGuidelines: ['Follow guide paddle commands and secure lifejacket buckle locks'],
    nearbyAttractions: [{ name: 'Syntheri Rocks', distance: '30 km', image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is rafting open during summer?', answer: 'Yes! Dandeli water is controlled by Supa Dam, ensuring river discharge year-round.' }],
    reviews: [{ name: 'Varun Hegde', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Hubli', date: 'October 2026', comment: 'Rafting on the Kali River was non-stop fun. Great campsite food too.' }]
  },
  {
    id: 'kasol',
    name: 'Kasol & Kheerganga',
    state: 'Himachal Pradesh',
    country: 'India',
    latitude: 32.0100,
    longitude: 77.3150,
    rating: 4.84,
    reviewsCount: 1540,
    price: 3499,
    difficulty: 'Moderate',
    season: 'Spring',
    seasonsAvailable: ['Spring', 'Summer', 'Autumn'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 30,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping'],
    isPopular: true,
    isFeatured: false,
    createdAt: '2026-03-08',
    description: 'Deep inside Parvati Valley, Kasol is the trailhead to Kheerganga’s natural hot springs atop the mountain, Grahan village forest trails, and Pin Parvati high alpine pass.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '1,580 m (Kasol) to 2,960 m (Kheerganga)',
      bestMonths: 'April to June and September to November',
      nearestAirport: 'Bhuntar Airport (KUU) - 31 km',
      nearestRailway: 'Chandigarh (CDG) - 290 km',
      summary: 'A 12 km trek through dense pine trees, waterfalls, and wooden bridges culminating in steaming sulfur hot springs.'
    },
    weather: { temperature: '16°C', feelsLike: '15°C', condition: 'Crisp Valley Mountain Air', humidity: '50%', windSpeed: '10 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'kasol-kheerganga-trek',
        name: 'Kheerganga Natural Hot Spring Trek & Camp',
        difficulty: 'Moderate',
        duration: '2 Days / 1 Night',
        price: 2499,
        category: 'Trekking',
        shortDescription: 'Hike from Barshaini through pine forests, stay in dome tents, and soak in steaming mountain spring pools.'
      }
    ],
    thingsToCarry: ['Swimwear for hot springs pool', 'Fleece jacket for chilly nights', 'Power bank as electricity is limited'],
    safetyGuidelines: ['Start morning hike before 10 AM to reach summit before dark'],
    nearbyAttractions: [{ name: 'Manikaran Sahib Gurudwara', distance: '4 km', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is Kheerganga trek safe for solo travelers?', answer: 'Yes, very popular route with friendly local dhabas along the path.' }],
    reviews: [{ name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Kolkata', date: 'May 2026', comment: 'Soaking in the natural hot springs with snow peaks in front of you was unbelievable.' }]
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling & Sandakphu',
    state: 'West Bengal',
    country: 'India',
    latitude: 27.0410,
    longitude: 88.2663,
    rating: 4.82,
    reviewsCount: 960,
    price: 7999,
    difficulty: 'Moderate',
    season: 'Autumn',
    seasonsAvailable: ['Autumn', 'Spring', 'Winter'],
    duration: '3-5 Days',
    durationDays: 5,
    adventureCount: 20,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Mountain Biking', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-10',
    description: 'Sandakphu is the only trek where you can view four of the world’s five highest peaks simultaneously: Everest, Kanchenjunga, Lhotse, and Makalu (the "Sleeping Buddha").',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '3,636 m (11,930 ft)',
      bestMonths: 'October-December for crystalline views, April for red rhododendrons',
      nearestAirport: 'Bagdogra Airport (IXB) - 70 km',
      nearestRailway: 'New Jalpaiguri (NJP) - 75 km',
      summary: 'Ridge trail running right along the Indo-Nepal international border with traditional homestay stops.'
    },
    weather: { temperature: '11°C', feelsLike: '9°C', condition: 'Crisp Ridge Wind', humidity: '45%', windSpeed: '14 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'darjeeling-sandakphu-trek',
        name: 'Sandakphu Sleeping Buddha Panoramic Trek',
        difficulty: 'Moderate',
        duration: '5 Days / 4 Nights',
        price: 8499,
        category: 'Trekking',
        shortDescription: 'Witness Mount Everest and the golden rays hitting Mount Kanchenjunga at sunrise.'
      }
    ],
    thingsToCarry: ['Passport or Voter ID card for border checkpoint registration', 'Cold-weather gloves and headlamp'],
    safetyGuidelines: ['Stay strictly on marked paths as the route crosses international border posts'],
    nearbyAttractions: [{ name: 'Tiger Hill Sunrise Point', distance: '12 km', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Are homestays available along the Sandakphu route?', answer: 'Yes, cozy Nepali and Tibetan family homestays provide warm meals and beds.' }],
    reviews: [{ name: 'Debashis Mukherjee', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Kolkata', date: 'November 2026', comment: 'Seeing Kanchenjunga turn rose gold at 5:30 AM brought tears to my eyes.' }]
  },
  {
    id: 'tawang',
    name: 'Tawang',
    state: 'Arunachal Pradesh',
    country: 'India',
    latitude: 27.5861,
    longitude: 91.8594,
    rating: 4.88,
    reviewsCount: 520,
    price: 12999,
    difficulty: 'Hard',
    season: 'Spring',
    seasonsAvailable: ['Spring', 'Autumn', 'Summer'],
    duration: '1 Week',
    durationDays: 6,
    adventureCount: 15,
    primaryCategory: 'Trekking',
    categories: ['Trekking', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-12',
    description: 'Perched in the eastern Himalayas near Tibet and Bhutan. Cross Sela Pass at 13,700 feet, explore 101 high alpine lakes, the 400-year-old Tawang Monastery, and Gorichen peak expeditions.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '3,048 m (10,000 ft)',
      bestMonths: 'March to May and September to November',
      nearestAirport: 'Tezpur Airport (TEZ) - 320 km / Guwahati (GAU) - 440 km',
      nearestRailway: 'Rangapara North (RPAN) - 315 km',
      summary: 'Rugged, pristine, and culturally rich with Tibetan prayer flags fluttering across snow-lined passes.'
    },
    weather: { temperature: '9°C', feelsLike: '7°C', condition: 'Alpine Blue Skies', humidity: '52%', windSpeed: '15 km/h', uvIndex: 'High' },
    adventures: [
      {
        id: 'tawang-sela-pass-lakes',
        name: 'Sela Pass High Alpine Lakes Trek',
        difficulty: 'Hard',
        duration: '5 Days / 4 Nights',
        price: 14499,
        category: 'Trekking',
        shortDescription: 'Explore sacred high mountain lakes and raw mountain passes near Indo-China border.'
      }
    ],
    thingsToCarry: ['Inner Line Permit (ILP) required for all Indian tourists', 'Thermal down jacket and windproof pants'],
    safetyGuidelines: ['Allow extra driving day for potential Sela pass snowfall delays'],
    nearbyAttractions: [{ name: 'Sela Pass', distance: '78 km', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'How to obtain Inner Line Permit?', answer: 'We process the Arunachal ILP documentation for you online prior to travel.' }],
    reviews: [{ name: 'Pema Khandu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Guwahati', date: 'April 2026', comment: 'Untouched nature and warm Monpa hospitality. One of India’s best kept secrets.' }]
  },
  {
    id: 'ooty',
    name: 'Ooty & Nilgiris',
    state: 'Tamil Nadu',
    country: 'India',
    latitude: 11.4102,
    longitude: 76.6950,
    rating: 4.72,
    reviewsCount: 890,
    price: 3699,
    difficulty: 'Easy',
    season: 'Summer',
    seasonsAvailable: ['Summer', 'Autumn', 'Spring'],
    duration: 'Weekend',
    durationDays: 3,
    adventureCount: 18,
    primaryCategory: 'Mountain Biking',
    categories: ['Mountain Biking', 'Trekking', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-15',
    description: 'The Blue Mountains of Nilgiris feature Doddabetta Peak, eucalyptus forests, mountain downhill cycling switchbacks, and the UNESCO heritage Nilgiri Mountain Toy Train.',
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '2,240 m (7,350 ft)',
      bestMonths: 'March to June and September to November',
      nearestAirport: 'Coimbatore Airport (CJB) - 88 km',
      nearestRailway: 'Mettupalayam (MTP) - 51 km / Udagamandalam (UAM)',
      summary: 'Ideal for leisurely pine forest walks, tea estate trails, and technical mountain bike tracks.'
    },
    weather: { temperature: '19°C', feelsLike: '19°C', condition: 'Pleasant Nilgiri Breeze', humidity: '58%', windSpeed: '10 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'ooty-nilgiri-downhill',
        name: 'Nilgiri Pine Forest Mountain Downhill Cycling',
        difficulty: 'Easy',
        duration: '1 Day',
        price: 2200,
        category: 'Mountain Biking',
        shortDescription: '30km guided downhill trail through eucalyptus groves with geared Scott MTBs and helmets.'
      }
    ],
    thingsToCarry: ['Light woolens for evening chill', 'Cycling gloves & water bottle'],
    safetyGuidelines: ['Be cautious around sharp blind curves on Nilgiri ghat road trails'],
    nearbyAttractions: [{ name: 'Doddabetta Peak', distance: '9 km', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is the mountain biking trail suitable for kids?', answer: 'Yes, we provide junior size mountain bikes and gentle slope trails.' }],
    reviews: [{ name: 'Kavitha Ramesh', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Chennai', date: 'May 2026', comment: 'The downhill ride was refreshing and beautiful!' }]
  },
  {
    id: 'kanha',
    name: 'Kanha National Park',
    state: 'Madhya Pradesh',
    country: 'India',
    latitude: 22.3345,
    longitude: 80.6115,
    rating: 4.86,
    reviewsCount: 680,
    price: 7200,
    difficulty: 'Easy',
    season: 'Winter',
    seasonsAvailable: ['Winter', 'Spring'],
    duration: 'Weekend',
    durationDays: 3,
    adventureCount: 14,
    primaryCategory: 'Wildlife Safari',
    categories: ['Wildlife Safari', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-18',
    description: 'The real-life inspiration for Rudyard Kipling’s Jungle Book. Sprawling sal and bamboo forests, lush meadows, Barasingha swamp deer, leopards, and thriving tiger populations.',
    images: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '600 m to 900 m',
      bestMonths: 'October to May (Peak tiger sightings in March-May)',
      nearestAirport: 'Jabalpur Airport (JLR) - 160 km',
      nearestRailway: 'Gondia Junction (G) - 145 km',
      summary: 'Kanha zone, Kisli zone, and Mukki zone offer high-probability tiger tracking safaris with expert tribal naturalists.'
    },
    weather: { temperature: '24°C', feelsLike: '24°C', condition: 'Sunny Jungle Clear', humidity: '42%', windSpeed: '7 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'kanha-tiger-tracking',
        name: 'Kanha Core Zone 4x4 Tiger Safari Expedition',
        difficulty: 'Easy',
        duration: '2 Days / 1 Night',
        price: 4999,
        category: 'Wildlife Safari',
        shortDescription: 'Morning and evening safari in open Maruti Gypsy tracking Bengal Tigers and Barasingha deer.'
      }
    ],
    thingsToCarry: ['Safari dust scarf / bandana', 'Binoculars & telephoto camera lens'],
    safetyGuidelines: ['Follow forest department quiet hours and guide instructions strictly'],
    nearbyAttractions: [{ name: 'Bamni Dadar Sunset Point', distance: 'Inside Park', image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'What is the Barasingha?', answer: 'The hardground Barasingha (swamp deer) is the state animal of MP, rescued from near extinction in Kanha.' }],
    reviews: [{ name: 'Rajiv Chawla', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Nagpur', date: 'February 2026', comment: 'Saw a handsome male tiger walking right across our Gypsy trail!' }]
  },
  {
    id: 'pachmarhi',
    name: 'Pachmarhi',
    state: 'Madhya Pradesh',
    country: 'India',
    latitude: 22.4674,
    longitude: 78.4346,
    rating: 4.71,
    reviewsCount: 460,
    price: 3199,
    difficulty: 'Moderate',
    season: 'Monsoon',
    seasonsAvailable: ['Monsoon', 'Winter', 'Autumn', 'Spring'],
    duration: 'Weekend',
    durationDays: 2,
    adventureCount: 16,
    primaryCategory: 'Rock Climbing',
    categories: ['Rock Climbing', 'Trekking', 'Camping'],
    isPopular: false,
    isFeatured: false,
    createdAt: '2026-03-20',
    description: 'Queen of the Satpuras. A serene hill retreat surrounded by deep sandstone ravines, cascading waterfalls, prehistoric rock art caves, and Dhoopgarh—the highest point in Madhya Pradesh.',
    images: [
      'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: {
      altitude: '1,067 m (3,500 ft)',
      bestMonths: 'July to September for waterfalls, Oct to March for pleasant hiking',
      nearestAirport: 'Bhopal Raja Bhoj Airport (BHO) - 195 km',
      nearestRailway: 'Pipariya Railway Station (PPI) - 47 km',
      summary: 'Famous for Bee Falls rappelling, Jata Shankar cave explorations, and dramatic sunset vistas over Satpura ranges.'
    },
    weather: { temperature: '23°C', feelsLike: '23°C', condition: 'Gentle Hill Breeze', humidity: '64%', windSpeed: '9 km/h', uvIndex: 'Moderate' },
    adventures: [
      {
        id: 'pachmarhi-bee-falls-canyoning',
        name: 'Bee Falls Waterfall Rappelling & Ravine Trek',
        difficulty: 'Moderate',
        duration: '1 Day',
        price: 1800,
        category: 'Rock Climbing',
        shortDescription: 'Rappel down a 150-foot natural waterfall with dynamic safety lines, harness, and certified guides.'
      }
    ],
    thingsToCarry: ['Water shoes with rubber grip', 'Quick-dry change of clothes', 'Light hiking stick'],
    safetyGuidelines: ['Never lean back without tension on the rappel belay rope'],
    nearbyAttractions: [{ name: 'Dhoopgarh Sunset Peak', distance: '10 km', image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=400&q=80' }],
    faqs: [{ question: 'Is waterfall rappelling safe during monsoon?', answer: 'Yes, guides assess water flow volume and relocate to safe parallel rock faces when discharge is high.' }],
    reviews: [{ name: 'Preeti Deshmukh', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', rating: 5, location: 'Bhopal', date: 'August 2026', comment: 'Rappelling down Bee Falls was full of thrills and totally exhilarating!' }]
  }
];
