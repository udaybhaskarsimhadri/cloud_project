// AdventureX AI Smart Travel Assistant Service
// Clean modular architecture with pluggable LLM provider support (Mock, Amazon Bedrock, OpenAI, Gemini)

import { ADVENTURES_DATA } from '../data/adventuresData';
import { DESTINATIONS_DATA } from '../data/destinationsData';

const AI_HISTORY_STORAGE_KEY = 'adventurex_ai_history';
const AI_SAVED_PLANS_KEY = 'adventurex_ai_saved_plans';

// ============================================================================
// PLUGGABLE LLM PROVIDER INTERFACE
// Ready for Amazon Bedrock, OpenAI, or Google Gemini cloud integration
// ============================================================================

class MockLLMProvider {
  name = 'AdventureX-MockLLM-v1';

  async complete({ prompt, context, history = [] }) {
    // Simulate brief network latency for realistic AI experience (350ms)
    await new Promise((resolve) => setTimeout(resolve, 350));
    return generateContextualResponse(prompt, context, history);
  }
}

// Future Cloud Providers (Stubbed for zero-downtime switch)
class AmazonBedrockProvider {
  name = 'AmazonBedrock-Claude3.5-Haiku';
  async complete({ prompt, context }) {
    // Placeholder: connect to AWS Bedrock Runtime Client via API Gateway / Lambda
    console.warn('Amazon Bedrock endpoint not configured. Falling back to local AI engine.');
    return generateContextualResponse(prompt, context);
  }
}

// ============================================================================
// INTELLIGENT RULE & SEMANTIC MOCK AI ENGINE
// ============================================================================

function generateContextualResponse(query, context = {}, history = []) {
  const q = (query || '').toLowerCase().trim();

  // 1. Budget Specific Queries: e.g. "Suggest adventures under ₹15000" or "under 10000"
  const budgetMatch = q.match(/(?:under|below|budget of|less than)?\s*₹?\s*(\d{4,6})/i);
  if (q.includes('under') || q.includes('budget') || budgetMatch) {
    let maxBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : 15000;
    if (maxBudget < 1000) maxBudget = 15000;

    const matchedAdventures = ADVENTURES_DATA.filter((a) => (a.price || 0) <= maxBudget)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    if (matchedAdventures.length > 0) {
      return {
        text: `Here are the top-rated curated expeditions fitting comfortably within your **₹${maxBudget.toLocaleString('en-IN')}** budget. All packages include certified guides, safety gear, and acclimatization support:`,
        adventures: matchedAdventures,
        suggestedActions: [
          'Calculate full trip budget with travel & food',
          'Show packing list for these treks',
          'Suggest winter alternatives'
        ]
      };
    }
  }

  // 2. Beginner Treks: e.g. "Best trek for beginners" or "starter hike"
  if (q.includes('beginner') || q.includes('first time') || q.includes('easy trek') || q.includes('starting')) {
    const beginnerTreks = ADVENTURES_DATA.filter(
      (a) => (a.difficulty || '').toLowerCase().includes('easy') || (a.difficulty || '').toLowerCase().includes('moderate')
    ).slice(0, 3);

    return {
      text: `For first-time high-altitude adventurers, we prioritize treks with gradual elevation gain, well-established basecamps, and emergency medical support:
\n• **Hampta Pass Cross-Valley Trek (Manali)** – Stunning crossover with scenic alpine campsites and gradual acclimation.
• **Valley of Flowers & Hemkund Sahib** – Gentle gradients with breathtaking floral diversity.
• **Triund & Snow Line Trek** – Perfect weekend starter trail with panoramic Dhauladhar views.

💡 **AI Beginner Tip:** Focus on cardio endurance 3 weeks prior and always break in your trekking shoes before Day 1!`,
      adventures: beginnerTreks,
      suggestedActions: [
        'Generate beginner packing checklist',
        'Learn how to prevent altitude sickness',
        'Check adventures under ₹10,000'
      ]
    };
  }

  // 3. December / Winter Expeditions: e.g. "Best destination in December" or "winter trip"
  if (q.includes('december') || q.includes('winter') || q.includes('snow') || q.includes('january')) {
    const winterPicks = ADVENTURES_DATA.filter((a) => {
      const desc = ((a.description || '') + ' ' + (a.name || '')).toLowerCase();
      return desc.includes('snow') || desc.includes('winter') || desc.includes('frozen') || desc.includes('december') || a.destination?.toLowerCase().includes('manali') || a.destination?.toLowerCase().includes('ladakh');
    }).slice(0, 3);

    return {
      text: `December offers phenomenal winter wonderland expeditions across India! Top recommendations for December & January:
\n• **Chadar Frozen River Expedition (Zanskar/Ladakh)** – Walk on the surreal frozen Zanskar river at -25°C.
• **Kedarkantha Winter Snow Summit** – Pristine white snow trails with unforgettable 360° summit views.
• **Manali Snow & Igloo Experience** – High-altitude snow adventures, skiing, and cozy alpine camps.
• **Jaisalmer Desert Safari (Warm Escape)** – If you prefer starry golden sand dunes over sub-zero frost!`,
      adventures: winterPicks.length > 0 ? winterPicks : ADVENTURES_DATA.slice(0, 3),
      suggestedActions: [
        'Check winter snow packing gear',
        'View Chadar Trek details',
        'Best warm weather trips for winter'
      ]
    };
  }

  // 4. Kedarkantha or Specific Trail Packing List: e.g. "Packing list for Kedarkantha"
  if (q.includes('kedarkantha') || (q.includes('packing') && (q.includes('trek') || q.includes('list')))) {
    return {
      text: `🎒 **AI Winter Expedition Packing Essentials (e.g. Kedarkantha / Hampta):**
\n**1. 3-Layer Clothing System:**
• Base Layer: 2x Merino wool thermal tops & bottoms
• Mid Layer: 1x 200 GSM fleece jacket + 1x down feather jacket (-10°C rated)
• Outer Layer: Waterproof & windproof hardshell jacket with hood
\n**2. Footwear & Grip:**
• Ankle-support waterproof trekking boots with deep lug vibram soles
• 4 pairs moisture-wicking wool socks + microspikes / crampons
\n**3. Head, Hands & Face:**
• Balaclava, UV-400 polarized mountain sunglasses, waterproof ski gloves with fleece liners
\n**4. Trail Tech & Safety:**
• 50L Rucksack with rain cover, 2x 1L insulated thermos flasks, headlamp with spare lithium batteries.`,
      suggestedActions: [
        'Open interactive Packing Assistant',
        'View Kedarkantha adventure',
        'Safety checklist for cold weather'
      ]
    };
  }

  // 5. Trip with Friends / Group: e.g. "Budget trip for friends"
  if (q.includes('friends') || q.includes('group') || q.includes('buddies') || q.includes('squad')) {
    const friendPicks = ADVENTURES_DATA.filter((a) => 
      a.category?.includes('Rafting') || a.category?.includes('Camping') || a.category?.includes('Paragliding') || a.category?.includes('Trekking')
    ).slice(0, 3);

    return {
      text: `Planning a trip with friends? We recommend thrilling group-friendly adventures that balance high adrenaline, communal bonfires, and shared costs:
\n• **Rishikesh River Rafting & Cliff Jumping** – Unmatched group bonding tackling Grade IV rapids, riverside camping, and night bonfires.
• **Kasol & Kheerganga Trek** – Hot springs, pine forests, and lively backpacker cafes.
• **Goa Scuba & Water Sports Combo** – High-octane jet skiing, parasailing, and dolphin tracking.
\n💰 **AI Cost-Split Tip:** Booking for 4+ travelers typically saves ~15% on group transport, shared tents, and organizer gear rentals.`,
      adventures: friendPicks,
      suggestedActions: [
        'Plan a 4-person trip itinerary',
        'Calculate split budget for friends',
        'Explore Rishikesh group packages'
      ]
    };
  }

  // 6. Rafting / Water Sports
  if (q.includes('rafting') || q.includes('scuba') || q.includes('water')) {
    const waterSports = ADVENTURES_DATA.filter((a) => 
      a.category?.includes('Rafting') || a.category?.includes('Scuba') || a.category?.includes('Water')
    ).slice(0, 3);

    return {
      text: `Looking for water expeditions? India hosts world-class white water rapids in the North and pristine coral dive spots on the coastline:
\n• **Rishikesh Grade III & IV White Water** – Famous rapid stretches like 'The Wall' and 'Three Blind Mice'.
• **Grande Island Scuba (Goa)** – Clear visibility, vibrant marine life, and PADI-certified divemasters.
• **Kolad Kundalika River Rafting** – High-velocity dam-controlled white water rafting.`,
      adventures: waterSports,
      suggestedActions: [
        'Packing list for river rafting',
        'Best season for white water rafting',
        'Book Rishikesh expedition'
      ]
    };
  }

  // 7. Safety / Medical / Altitude Sickness
  if (q.includes('safety') || q.includes('altitude') || q.includes('ams') || q.includes('sick') || q.includes('oxygen')) {
    return {
      text: `🛡️ **AdventureX Mountain Safety Protocol:**
\n• **The Golden Rule:** Never ascend with symptoms of Acute Mountain Sickness (AMS).
• **Hydration:** Consume 4–5 liters of water daily with electrolytes (ORS). Avoid alcohol and sleeping pills.
• **Acclimatization Pace:** Climb high, sleep low. Do not increase sleeping elevation by more than 500m per day above 3,000m.
• **Emergency Kit:** Carry Diamox (under doctor prescription), pulse oximeter, and blister pads.
• **Insurance:** Ensure your policy specifically covers high-altitude trekking above 4,000m and emergency evacuation.`,
      suggestedActions: [
        'Open Safety Assistant',
        'Download emergency checklist',
        'Check trek health requirements'
      ]
    };
  }

  // 8. General / Fallback Smart Travel Companion Response
  const popularAdventures = ADVENTURES_DATA.slice(0, 3);
  return {
    text: `I'm your **AdventureX AI Smart Travel Assistant**! I can help you plan your complete expedition across India:
\n• 🗺️ **Personalized Itineraries:** Custom day-by-day schedules tailored to your pace and budget in ₹.
• 💰 **Smart Budgeting:** Full cost breakdowns for permits, gear, lodging, food, and transport.
• 🎒 **Tailored Packing Checklists:** Never forget critical high-altitude or water gear.
• 🛡️ **Safety & Altitude Guidance:** Medical prep, acclimatization protocols, and real-time advice.
\nTry asking me: *"Best trek for beginners"*, *"Suggest adventures under ₹15000"*, or *"Trip for friends in December"*!`,
    adventures: popularAdventures,
    suggestedActions: [
      'Suggest adventures under ₹15000',
      'Best trek for beginners',
      'Plan a 5-day customized trip',
      'AI Budget Calculator'
    ]
  };
}

// ============================================================================
// DEDICATED AI FEATURE GENERATORS
// ============================================================================

export const aiService = {
  provider: new MockLLMProvider(),

  /**
   * Set active provider (for future Bedrock / OpenAI / Gemini switch)
   */
  setProvider(newProvider) {
    this.provider = newProvider;
  },

  /**
   * General AI conversational completion
   */
  async askAI(prompt, context = {}) {
    try {
      const history = this.getAIHistory();
      const response = await this.provider.complete({ prompt, context, history });
      return response;
    } catch (err) {
      console.error('AI assistant processing error:', err);
      return generateContextualResponse(prompt, context);
    }
  },

  /**
   * AI Trip Planner
   * Generates a day-by-day personalized itinerary with schedule & ₹ budget
   */
  async generateTripPlan({ destination, budget, travelers = 1, duration = 5, difficulty = 'Moderate', activities = [] }) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const totalBudget = Number(budget) || 25000;
    const days = Math.max(2, Math.min(Number(duration) || 5, 14));
    const destName = destination || 'Himalayan Ridge / Manali';

    // Find closest matched adventures
    const matchedAdventures = ADVENTURES_DATA.filter((a) => {
      const matchDest = !destination || (a.destination || '').toLowerCase().includes(destination.toLowerCase());
      const matchDiff = !difficulty || (a.difficulty || '').toLowerCase() === difficulty.toLowerCase();
      return matchDest && matchDiff;
    }).slice(0, 2);

    // Dynamic Itinerary Generation
    const daysPlan = [];
    for (let day = 1; day <= days; day++) {
      if (day === 1) {
        daysPlan.push({
          day: 1,
          title: `Arrival at Basecamp & Acclimatization Briefing`,
          elevation: '2,050m / 6,725 ft',
          highlights: ['Check-in at eco-lodges / base tents', 'Safety gear fitting & oxygen vitals check', 'Gentle pine forest acclimatization hike'],
          meals: 'Dinner included (high-carb alpine meal)',
          stay: 'Comfort Alpine Basecamp'
        });
      } else if (day === days) {
        daysPlan.push({
          day: days,
          title: `Descent to Base, Celebration & Homeward Journey`,
          elevation: 'Gradual descent to 2,000m',
          highlights: ['Sunrise summit photography session', 'Group certificate distribution & debriefing', 'Local market exploration & return transfer'],
          meals: 'Breakfast & trail pack included',
          stay: 'Return Transit / Hotel'
        });
      } else if (day === Math.floor(days / 2) + 1) {
        daysPlan.push({
          day: day,
          title: `Pass Crossing & Summit Push: The Ultimate Vista`,
          elevation: '4,287m / 14,065 ft',
          highlights: ['Pre-dawn alpine start under headlamps', 'Reaching the ridge with 360° panoramic views', 'Glacial moraine descent to high-altitude tarn'],
          meals: 'Trail energy bars, hot soup & camp dinner',
          stay: 'Wilderness High Camp (Expedition Tents)'
        });
      } else {
        daysPlan.push({
          day: day,
          title: `Trek through Valley Meadows & River Gorges`,
          elevation: `${2400 + day * 350}m`,
          highlights: ['Cross glacial streams with harness guidance', 'Campfire stories and dark sky stargazing', 'Wild alpine flora and fauna spotting'],
          meals: 'Hot breakfast, packed lunch, evening tea & dinner',
          stay: 'Streamside Dome Tents'
        });
      }
    }

    // Realistic Budget Breakdown
    const perPerson = Math.round(totalBudget / Math.max(1, travelers));
    const breakdown = {
      adventurePackage: Math.round(perPerson * 0.45),
      transportation: Math.round(perPerson * 0.20),
      accommodations: Math.round(perPerson * 0.15),
      mealsAndSnacks: Math.round(perPerson * 0.10),
      gearRentals: Math.round(perPerson * 0.05),
      emergencyBuffer: Math.round(perPerson * 0.05),
      totalPerPerson: perPerson,
      grandTotal: perPerson * travelers
    };

    const plan = {
      id: 'plan-' + Date.now(),
      createdAt: new Date().toISOString(),
      destination: destName,
      travelers,
      duration: `${days} Days / ${days - 1} Nights`,
      difficulty,
      budget: totalBudget,
      preferredActivities: activities.length > 0 ? activities : ['Trekking', 'Photography', 'Camping'],
      itinerary: daysPlan,
      budgetBreakdown: breakdown,
      matchedAdventures: matchedAdventures.length > 0 ? matchedAdventures : ADVENTURES_DATA.slice(0, 2),
      safetyRecommendations: [
        'Carry physical copy of government ID and medical fitness certificate.',
        'Drink minimum 4 liters water daily to prevent AMS.',
        'Rent microspikes and insulated boots directly at basecamp if snowfall occurs.'
      ]
    };

    // Save generated plan to history
    this.savePlanToHistory(plan);

    return plan;
  },

  /**
   * AI Budget Planner
   * Calculates realistic adventure cost split in INR (₹)
   */
  calculateBudgetPlan(totalBudgetInput, travelersInput = 1, durationInput = 5) {
    const total = Math.max(3000, Number(totalBudgetInput) || 20000);
    const travelers = Math.max(1, Number(travelersInput) || 1);
    const duration = Math.max(1, Number(durationInput) || 5);

    const perPerson = Math.round(total / travelers);

    // Proportional splits tailored for Indian adventure tourism
    const adventureCost = Math.round(perPerson * 0.38);
    const travelCost = Math.round(perPerson * 0.22);
    const accommodation = Math.round(perPerson * 0.18);
    const food = Math.round(perPerson * 0.10);
    const equipment = Math.round(perPerson * 0.06);
    const emergencyReserve = perPerson - (adventureCost + travelCost + accommodation + food + equipment);

    const matchedAdventures = ADVENTURES_DATA.filter((a) => (a.price || 0) <= perPerson * 0.5)
      .slice(0, 3);

    return {
      totalBudget: total,
      travelers,
      duration,
      perPerson,
      breakdown: [
        {
          category: 'Adventure Cost',
          amount: adventureCost,
          percentage: 38,
          description: 'Certified guides, trail permits, forest entry fees, expedition logistics',
          color: 'emerald'
        },
        {
          category: 'Travel Cost',
          amount: travelCost,
          percentage: 22,
          description: 'Train/flight tickets, basecamp shared SUV transfer, return shuttle',
          color: 'blue'
        },
        {
          category: 'Accommodation',
          amount: accommodation,
          percentage: 18,
          description: 'Basecamp guest house, wilderness high-altitude 4-season tents, homestays',
          color: 'teal'
        },
        {
          category: 'Food & Nutrition',
          amount: food,
          percentage: 10,
          description: 'High-energy trail meals, dry fruits, hydration electrolytes, hot soup',
          color: 'amber'
        },
        {
          category: 'Equipment Rental',
          amount: equipment,
          percentage: 6,
          description: 'Trekking poles, sub-zero sleeping bags, crampons, waterproof gaiters',
          color: 'purple'
        },
        {
          category: 'Emergency Reserve',
          amount: emergencyReserve,
          percentage: 6,
          description: 'Medical buffer, buffer day stay, weather detour flexibility',
          color: 'rose'
        }
      ],
      optimizationTips: [
        `Booking as a group of ${travelers} allows sharing local 4x4 cab costs from the nearest rail/airport.`,
        'Renting technical gear (gaiters, crampons, poles) at basecamp saves up to ₹4,500 over purchasing new.',
        'Traveling on weekdays often yields up to 15% discount on homestays and regional transit.'
      ],
      matchedAdventures
    };
  },

  /**
   * AI Packing Assistant
   * Returns tailored checklist based on selected adventure activity
   */
  getPackingList(activity = 'Trekking', season = 'All') {
    const checklists = {
      Trekking: {
        title: 'High-Altitude Trekking Checklist',
        icon: 'Mountain',
        categories: [
          {
            name: 'Essential Layers & Clothing',
            items: [
              'Quick-dry full sleeve synthetic t-shirts (x3)',
              'Thermal inner top & bottom (Merino wool recommended)',
              'Heavy down jacket rated to -10°C',
              'Windproof & waterproof outer trekking jacket with hood',
              'Quick-dry stretchable trekking pants (x2)',
              'Fleece jacket or warm pullover'
            ]
          },
          {
            name: 'Footwear & Support',
            items: [
              'Waterproof trekking boots with ankle support (vibram grip)',
              'Anti-blister moisture wicking wool socks (x4)',
              'Camp flip-flops / slip-on shoes for tent use',
              'Waterproof snow gaiters'
            ]
          },
          {
            name: 'Headwear & Protection',
            items: [
              'Polarized UV-400 mountain sunglasses (category 3 or 4)',
              'Warm woolen beanie / balaclava covering ears',
              'Sun visor cap / wide brim sun hat',
              'Waterproof insulated gloves + fleece inner gloves'
            ]
          },
          {
            name: 'Technical Gear & Packs',
            items: [
              '50-60L ergonomic backpack with waterproof rain cover',
              '15-20L daypack for summit push / summit day',
              'Adjustable aluminum/carbon trekking poles (pair)',
              'Headlamp with 300+ lumens and extra lithium batteries',
              '2x 1-Liter insulated stainless steel water bottles'
            ]
          },
          {
            name: 'Medical & Toiletries',
            items: [
              'Personal first-aid kit (Diamox, Paracetamol, Band-aids, ORS)',
              'Sunscreen SPF 50+ and cold cream / lip balm with SPF',
              'Water purification tablets (Chlorine dioxide)',
              'Biodegradable wet wipes & pocket hand sanitizer'
            ]
          }
        ]
      },
      Camping: {
        title: 'Wilderness & Riverside Camping Checklist',
        icon: 'Tent',
        categories: [
          {
            name: 'Shelter & Sleep Comfort',
            items: [
              'Compact lightweight inflatable sleeping pad / foam mat',
              'Comfort-rated sleeping bag (0°C to 10°C)',
              'Camp pillow & fleece sleeping bag liner',
              'Mosquito repellent coils / skin spray'
            ]
          },
          {
            name: 'Camp Illumination & Tools',
            items: [
              '360° LED camping lantern with dimming',
              'Multi-tool knife with can opener and pliers',
              'Fire starter / windproof matches in waterproof pouch',
              'Carabiners and 10m paracord rope'
            ]
          },
          {
            name: 'Apparel & Comfort',
            items: [
              'Breathable cotton & fleece blend joggers',
              'Thermal socks for chilly night temperature',
              'Light rain poncho / compact emergency umbrella'
            ]
          }
        ]
      },
      Rafting: {
        title: 'White Water Rapids & River Rafting Checklist',
        icon: 'Waves',
        categories: [
          {
            name: 'On-Water Attire',
            items: [
              'Quick-dry swim trunks / rash guard UV shirt',
              'Neoprene water shoes or secure strapped float sandals',
              'Dry-bag (20L) for valuables and spare clothing',
              'Waterproof floating phone case with lanyard'
            ]
          },
          {
            name: 'Post-Rafting Essentials',
            items: [
              'Complete dry change of clothes and microfiber towel',
              'Waterproof sunscreen lotion (reef and water safe)',
              'Electrolyte energy drink packet'
            ]
          }
        ]
      },
      'Desert Safari': {
        title: 'Dunes & Desert Expedition Checklist',
        icon: 'Sun',
        categories: [
          {
            name: 'Sun & Dust Protection',
            items: [
              'Cotton scarf or Shemagh / desert bandana to cover face',
              'UV-400 wrap-around sunglasses against sand dust',
              'Loose, light-colored breathable long-sleeve cotton clothing',
              'High-protection broad spectrum sunscreen (SPF 50+)'
            ]
          },
          {
            name: 'Night Temperature Essentials',
            items: [
              'Heavy fleece or light jacket (desert nights drop below 8°C)',
              'Insulated water bladder (3 Liters minimum hydration)',
              'Moisturizing lip balm and skin lotion'
            ]
          }
        ]
      },
      'Snow Expedition': {
        title: 'Sub-Zero & Frozen Trail Expedition Checklist',
        icon: 'Snowflake',
        categories: [
          {
            name: 'Extreme Cold Protection (-20°C)',
            items: [
              'Heavy 800+ fill power goose down parka',
              'Heavyweight thermal expedition-grade underwear (x2)',
              'Windproof waterproof Gore-Tex snow pants',
              'Fleece-lined windproof balaclava & neck gaiter'
            ]
          },
          {
            name: 'Ice & Snow Grip',
            items: [
              'Microspikes or 10-point hiking crampons',
              'Heavy double-insulated high ankle mountaineering boots',
              'Insulated ski mittens with wrist leashes',
              'Chemical hand and toe warmers (10+ packs)'
            ]
          }
        ]
      },
      'Wildlife Safari': {
        title: 'Jungle & Wildlife Safari Checklist',
        icon: 'Compass',
        categories: [
          {
            name: 'Camouflage & Clothing',
            items: [
              'Earthy neutral clothing (Khaki, Olive, Brown - avoid bright colors/white)',
              'Wide-brim safari hat with chin cord',
              'Light dust-jacket against morning open-gypsy wind chill',
              'Bandana or dust mask for unpaved forest tracks'
            ]
          },
          {
            name: 'Observation & Optics',
            items: [
              '8x42 or 10x42 waterproof birding binoculars',
              'Telephoto lens (200-500mm) with extra camera batteries',
              'Silent, non-crinkly daypack'
            ]
          }
        ]
      }
    };

    return checklists[activity] || checklists['Trekking'];
  },

  /**
   * AI Safety Assistant Guide
   * Delivers altitude sickness prevention, weather guidance, and emergency readiness
   */
  getSafetyGuide() {
    return {
      altitudeSickness: {
        title: 'High Altitude Sickness (AMS) Protocol',
        rules: [
          'Acclimatize gradually: Above 3,000 meters, limit sleeping altitude gains to 500m daily.',
          'Hydration Protocol: Drink 4 to 5 liters of fluid per day. Monitor urine clarity.',
          'Diamox Advisory: Prophylactic Diamox (Acetazolamide) 125mg or 250mg twice daily can be taken only under medical consultation.',
          'The Non-Negotiable Rule: If symptoms (throbbing headache, nausea, extreme fatigue, ataxia) persist after resting, descent is the only cure.'
        ],
        emergencySigns: [
          'HAPE (High Altitude Pulmonary Edema): Persistent dry cough, gurgling chest sounds, cyanosis (blue lips).',
          'HACE (High Altitude Cerebral Edema): Confusion, staggering gait, loss of coordination. Immediate evacuation mandatory.'
        ]
      },
      weatherPrecautions: {
        title: 'Himalayan & Regional Weather Precautions',
        tips: [
          'Monsoon (July–August): Avoid landslide-prone steep river canyons; carry heavy rain cover for all packs.',
          'Winter (Dec–Feb): Beware of wind chill. -5°C with 40km/h winds feels like -18°C. Protect fingers and toes.',
          'UV Radiation: High altitudes have 20% higher UV index per 1,000m. Reapply SPF 50+ every 3 hours.',
          'Flash Flood Readiness: Never pitch tents in dry riverbeds or directly beneath loose boulder screes.'
        ]
      },
      emergencyKit: {
        title: 'Certified Expedition Emergency Kit',
        items: [
          'Digital Pulse Oximeter to monitor Blood Oxygen (SpO2 > 80% safe baseline at high altitude)',
          'Sterile gauze dressings, triangular bandages, and antiseptic povidone-iodine solution',
          'Blister relief pads (moleskin or hydrocolloid gel bandages)',
          'Emergency thermal space blanket (reflective Mylar bivy)',
          'Whistle (pealess alpine whistle) – 3 blasts signifies emergency SOS in wilderness',
          'Waterproof matches, storm lighter, and multipurpose Swiss army tool'
        ]
      },
      requiredDocuments: {
        title: 'Required Travel Documents & Permits',
        documents: [
          'Government photo identity card (Aadhar Card, Passport, or Voter ID - original + 3 copies)',
          'Inner Line Permits (ILP) for restricted border zones (e.g., Pangong Tso, Nubra Valley, Spiti border areas)',
          'Medical Fitness Certificate signed by a registered MBBS physician (mandatory for high-altitude treks)',
          'Comprehensive Adventure Travel Insurance policy document covering emergency helicopter search & rescue',
          'Trekker registration slip from State Mountaineering Association / Forest Department'
        ]
      },
      emergencyContacts: [
        { title: 'National Emergency Response', number: '112' },
        { title: 'Himalayan Mountaineering Search & Rescue', number: '1800-180-5555' },
        { title: 'Tourist Police Helpline', number: '1363' },
        { title: 'AdventureX 24/7 Operations Room', number: '+91 (11) 4000-ADVX' }
      ]
    };
  },

  /**
   * AI Destination Recommendation Engine
   * Filter and rank adventures by budget, season, difficulty, group type
   */
  recommendAdventures({ budget, season = 'All', difficulty = 'All', groupType = 'All' }) {
    let list = [...ADVENTURES_DATA];

    if (budget && Number(budget) > 0) {
      list = list.filter((a) => (a.price || 0) <= Number(budget));
    }

    if (difficulty && difficulty !== 'All') {
      list = list.filter((a) => (a.difficulty || '').toLowerCase().includes(difficulty.toLowerCase()));
    }

    if (season && season !== 'All') {
      const s = season.toLowerCase();
      list = list.filter((a) => {
        const text = `${a.description || ''} ${a.name || ''} ${a.destination || ''}`.toLowerCase();
        return text.includes(s);
      });
    }

    // Sort by rating and reviews
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // Tag recommendations with AI reason badge
    return list.slice(0, 6).map((adv) => {
      let badge = 'Top Rated Adventure';
      if (adv.price < 5000) badge = 'Best Value Deal';
      else if (groupType === 'Family') badge = 'Family Friendly Certified';
      else if (groupType === 'Solo') badge = 'Ideal for Solo Explorers';
      else if (groupType === 'Couples') badge = 'Romantic Alpine Getaway';
      else if (groupType === 'Friends') badge = 'High Adrenaline Squad Pick';
      else if (groupType === 'Corporate') badge = 'Team Offsite Recommended';

      return {
        ...adv,
        aiReasonBadge: badge
      };
    });
  },

  /**
   * Personalized Recommendations ("Recommended For You")
   * Reads wishlist and bookings from localStorage
   */
  getPersonalizedRecommendations() {
    try {
      const wishlistRaw = localStorage.getItem('adventurex_wishlist');
      const bookingsRaw = localStorage.getItem('adventurex_bookings');

      const wishlistIds = wishlistRaw ? JSON.parse(wishlistRaw) : [];
      const bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];

      // If user has wishlist items or booked items, find similar adventures
      const preferredCategories = new Set();
      bookings.forEach((b) => {
        if (b.category) preferredCategories.add(b.category);
      });

      // Default high-profile selections if user has fresh state
      let recommended = ADVENTURES_DATA.filter((a) => {
        if (wishlistIds.includes(a.id)) return true;
        if (preferredCategories.has(a.category)) return true;
        return a.rating >= 4.8;
      });

      if (recommended.length === 0) {
        recommended = ADVENTURES_DATA.slice(0, 4);
      }

      return recommended.slice(0, 4).map((a) => ({
        ...a,
        aiBadge: wishlistIds.includes(a.id)
          ? 'On Your Wishlist'
          : preferredCategories.has(a.category)
          ? 'Based on Your Booking History'
          : 'Top Community Favorite'
      }));
    } catch {
      return ADVENTURES_DATA.slice(0, 4);
    }
  },

  /**
   * Smart Search Suggestions
   * Provides similar destinations, popular alternatives, and budget alternatives
   */
  getSmartSearchSuggestions(query = '') {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        similar: DESTINATIONS_DATA.slice(0, 3),
        popularAlternatives: ADVENTURES_DATA.slice(0, 3),
        budgetAlternatives: ADVENTURES_DATA.filter((a) => a.price <= 3500).slice(0, 3)
      };
    }

    // Find similar destinations
    const matchedDests = DESTINATIONS_DATA.filter(
      (d) => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q) || d.tagline?.toLowerCase().includes(q)
    );

    const otherDests = DESTINATIONS_DATA.filter((d) => !matchedDests.includes(d)).slice(0, 3);

    // Popular alternatives in the adventure catalog
    const popularAlternatives = ADVENTURES_DATA.filter(
      (a) => a.name.toLowerCase().includes(q) || a.destination.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const fallbackPopular = popularAlternatives.length > 0 ? popularAlternatives : ADVENTURES_DATA.slice(0, 3);

    // Budget alternatives under ₹5,000
    const budgetAlternatives = ADVENTURES_DATA.filter((a) => (a.price || 0) <= 5000).slice(0, 3);

    return {
      similar: matchedDests.length > 0 ? matchedDests : otherDests,
      popularAlternatives: fallbackPopular,
      budgetAlternatives
    };
  },

  /**
   * Booking Assistant Explainer
   * Explains difficulty, duration, included facilities, best season, and preparation tips
   */
  explainAdventureForBooking(adventure) {
    if (!adventure) return null;

    const diff = adventure.difficulty || 'Moderate';
    let difficultyExplanation = 'Suitable for travelers with basic fitness capable of 4-5 hours of physical activity daily.';
    if (diff.toLowerCase().includes('easy')) {
      difficultyExplanation = 'Relaxed pace suitable for beginners, families, and first-time adventurers with minimal trail experience.';
    } else if (diff.toLowerCase().includes('challenging') || diff.toLowerCase().includes('hard')) {
      difficultyExplanation = 'Demanding terrain with steep ascents and high altitude. Requires good cardio stamina and prior trekking exposure.';
    } else if (diff.toLowerCase().includes('extreme')) {
      difficultyExplanation = 'High-risk expedition with technical rope work, sub-zero conditions, or rapid river currents. Strict physical fitness required.';
    }

    return {
      name: adventure.name,
      difficulty: diff,
      difficultyExplanation,
      duration: adventure.duration || '5 Days / 4 Nights',
      bestTravelSeason: adventure.season || 'May to October (Pleasant alpine weather & clear mountain skies)',
      includedFacilities: [
        'Certified UIAGM / Mountaineering Guide & local support staff',
        'Expedition 4-season alpine tents, sub-zero sleeping bags & mattresses',
        'Freshly prepared high-nutrition vegetarian trail meals & hot beverages',
        'Safety medical shield: Oxygen cylinder, first-aid kit & oximeter vitals check',
        'All state forest department entry permits & campsite fees'
      ],
      preparationTips: [
        'Commence cardio training (running, stair climbing, cycling) 3 weeks before departure.',
        'Break into your trekking boots on short walks to prevent blisters on the trail.',
        'Pack 3 separate clothing layers (thermal base, fleece mid, windproof outer) rather than 1 heavy coat.',
        'Hydrate with minimum 4L water daily throughout the expedition.'
      ]
    };
  },

  // ============================================================================
  // LOCAL STORAGE HISTORY MANAGEMENT
  // ============================================================================

  getAIHistory() {
    try {
      const raw = localStorage.getItem(AI_HISTORY_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveMessageToHistory(message) {
    try {
      const history = this.getAIHistory();
      const updated = [
        ...history,
        {
          id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          timestamp: new Date().toISOString(),
          ...message
        }
      ].slice(-50); // Keep last 50 messages
      localStorage.setItem(AI_HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving AI history:', e);
      return [];
    }
  },

  clearAIHistory() {
    try {
      localStorage.removeItem(AI_HISTORY_STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },

  getSavedPlans() {
    try {
      const raw = localStorage.getItem(AI_SAVED_PLANS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  savePlanToHistory(plan) {
    try {
      const plans = this.getSavedPlans();
      const updated = [plan, ...plans].slice(0, 10);
      localStorage.setItem(AI_SAVED_PLANS_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  }
};
