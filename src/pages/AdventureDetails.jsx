import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Compass, 
  AlertTriangle, 
  Lock, 
  Heart, 
  Share2, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

import { ADVENTURES_DATA } from '../data/adventuresData';

import AdventureHero from '../components/adventure/AdventureHero';
import AdventureGallery from '../components/adventure/AdventureGallery';
import AdventureInfo from '../components/adventure/AdventureInfo';
import AdventureTimeline from '../components/adventure/AdventureTimeline';
import AdventureDates from '../components/adventure/AdventureDates';
import AdventurePricing from '../components/adventure/AdventurePricing';
import AdventureOrganizer from '../components/adventure/AdventureOrganizer';
import AdventureVideoGallery from '../components/adventure/AdventureVideoGallery';
import AdventureReviews from '../components/adventure/AdventureReviews';
import ReviewSystem from '../components/community/ReviewSystem';
import AdventureFAQ from '../components/adventure/AdventureFAQ';
import RelatedAdventures from '../components/adventure/RelatedAdventures';
import AdventureSidebar from '../components/adventure/AdventureSidebar';
import Button from '../components/common/Button';

const AdventureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the requested adventure
  const adventure = ADVENTURES_DATA.find((adv) => adv.id === id);

  // Scroll to top upon navigating to a new adventure
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  // If adventure is not found in dummy dataset
  if (!adventure) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#0F172A] dark:text-white">
              Expedition Not Found
            </h2>
            <p className="text-sm text-[#475569] dark:text-slate-400">
              The adventure you are looking for may have concluded or has a modified itinerary.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link to="/destinations">
              <Button variant="primary" className="w-full sm:w-auto">
                <Compass className="w-4 h-4 mr-2" />
                Explore All Destinations
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentPrice = adventure.pricing?.discountPrice || adventure.discountPrice || adventure.price || 8999;
  const strikePrice = adventure.pricing?.originalPrice || adventure.originalPrice;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Hero Section */}
      <AdventureHero adventure={adventure} />

      {/* 2. Main Content & Sticky Desktop Sidebar Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Comprehensive Adventure Modules (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Section 1: Interactive Image Gallery */}
            <section id="gallery" aria-label="Expedition Gallery">
              <AdventureGallery 
                images={adventure.images || []} 
                title={adventure.name} 
              />
            </section>

            {/* Section 2: Overview, Highlights, Inclusions & Safety */}
            <section id="overview" aria-label="Expedition Overview and Guidelines">
              <AdventureInfo adventure={adventure} />
            </section>

            {/* Section 3: Interactive Itinerary Timeline */}
            <section id="itinerary" aria-label="Day-by-Day Itinerary">
              <AdventureTimeline itinerary={adventure.itinerary || []} />
            </section>

            {/* Section 4: Available Dates & Batches Calendar */}
            <section id="dates" aria-label="Available Batches and Dates">
              <AdventureDates availableDates={adventure.availableDates || []} />
            </section>

            {/* Section 5: Transparent Pricing Breakdown & Discounts */}
            <section id="pricing" aria-label="Expedition Pricing and Inclusions">
              <AdventurePricing 
                pricing={adventure.pricing} 
                basePrice={adventure.price} 
              />
            </section>

            {/* Section 6: Verified Organizer Profile */}
            <section id="organizer" aria-label="Wilderness Organizer Profile">
              <AdventureOrganizer organizer={adventure.organizer} />
            </section>

            {/* Section 7: Photo & Video Moments Gallery */}
            <section id="media-gallery" aria-label="Photo and Video Gallery">
              <AdventureVideoGallery gallery={adventure.gallery || []} />
            </section>

            {/* Section 8: Verified Traveler Reviews */}
            <section id="reviews" aria-label="Traveler Reviews" className="space-y-6">
              <ReviewSystem 
                adventureId={adventure.id} 
                adventureName={adventure.name} 
              />
            </section>

            {/* Section 9: Frequently Asked Questions */}
            <section id="faq" aria-label="Frequently Asked Questions">
              <AdventureFAQ faqs={adventure.faqs} />
            </section>

            {/* Section 10: 6 Related Adventures */}
            <section id="related" aria-label="Related Expeditions">
              <RelatedAdventures 
                adventures={ADVENTURES_DATA} 
                currentId={adventure.id} 
              />
            </section>
          </div>

          {/* Right Column: Sticky Booking Card & Quick Facts (4 cols on lg, Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4">
            <AdventureSidebar adventure={adventure} />
          </aside>

        </div>
      </main>

      {/* Mobile & Tablet Floating Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Price per person
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {strikePrice && strikePrice > currentPrice && (
                <span className="text-xs line-through text-slate-400">
                  ₹{strikePrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Save to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Book Now */}
            <Link to={`/booking/${adventure.id}`}>
              <button
                type="button"
                className="py-3 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Book Now</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureDetails;
