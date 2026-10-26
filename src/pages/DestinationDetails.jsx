import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Compass, 
  CloudSun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Plane, 
  Train, 
  Mountain, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Ticket, 
  ArrowLeft, 
  Share2, 
  Heart,
  Layers,
  Map,
  Sparkles,
  Info
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import DestinationGallery from '../components/destinations/DestinationGallery';
import DestinationReview from '../components/destinations/DestinationReview';
import FAQAccordion from '../components/destinations/FAQAccordion';
import RelatedDestinations from '../components/destinations/RelatedDestinations';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find destination by ID
  const destination = DESTINATIONS_DATA.find((d) => d.id === id);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Destination Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
          The requested adventure destination could not be located in our expeditions database.
        </p>
        <button
          onClick={() => navigate('/destinations')}
          className="mt-6 px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          Browse All Destinations
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24">
      {/* ======================================================== */}
      {/* 1. LARGE HERO IMAGE & ESSENTIAL HEADER                   */}
      {/* ======================================================== */}
      <section className="relative isolate min-h-[60vh] lg:min-h-[68vh] flex items-end pb-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        {/* Full Hero Image with 50% dark overlay keeping background image clearly visible */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={destination.images[0]}
            alt={destination.name}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-slate-950/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full text-white relative z-10">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Destinations</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-black/40 hover:bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWishlisted((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Hero Main Titles with Improved Spacing */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md">
                  {destination.primaryCategory}
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md">
                  {destination.difficulty} Difficulty
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md">
                  {destination.season} Season
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-md text-white">
                {destination.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{destination.state}, {destination.country}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{destination.rating}</span>
                  <span className="text-slate-300 font-normal">({destination.reviewsCount} reviews)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-blue-400" />
                  <span>{destination.adventureCount} Adventures Available</span>
                </span>
              </div>
            </div>

            {/* Starting Price Header Box */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-white shrink-0 sm:min-w-[240px]">
              <span className="text-xs text-slate-300 block font-semibold">Starting price</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-black">₹{destination.price.toLocaleString()}</span>
                <span className="text-xs text-slate-300 font-medium">/ person</span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Best price guarantee included</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. WEATHER & MAP PLACEHOLDERS BAR                        */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weather Placeholder Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CloudSun className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Live Weather Forecast
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    {destination.weather.temperature}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    {destination.weather.condition}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 border-l border-slate-100 dark:border-slate-800 pl-4">
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>{destination.weather.humidity} Humidity</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-teal-500" />
                <span>{destination.weather.windSpeed}</span>
              </div>
            </div>
          </div>

          {/* Map Placeholder Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Map className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Topographic Coordinates
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {destination.latitude}° N, {destination.longitude}° E
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Elevation: {destination.overview.altitude}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Map Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. IN-DEPTH SECTIONS                                     */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* SECTION 1: OVERVIEW & FAST FACTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Badge variant="primary" className="mb-2">
                Expedition Briefing
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                About {destination.name}
              </h2>
              <p className="mt-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {destination.description}
              </p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {destination.overview.summary}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-3">
                <Mountain className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Altitude</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{destination.overview.altitude}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Ideal Season</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{destination.overview.bestMonths}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-3">
                <Plane className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Nearest Airport</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{destination.overview.nearestAirport}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex items-start gap-3">
                <Train className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Nearest Railway</h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{destination.overview.nearestRailway}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Booking Assistance Sidebar Card */}
          <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-200 border border-white/20 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Certified Adventure Assurance</span>
              </div>
              <h3 className="text-2xl font-black">Plan Your Expedition</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Connect with verified local trek leaders, gear rental hubs, and emergency satellite dispatch.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% verified adventure operators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Comprehensive rescue insurance coverage</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <button
                type="button"
                onClick={() => navigate(`/booking/${destination.adventures[0]?.id || destination.id}`)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
              >
                Book Expedition Now
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: AVAILABLE ADVENTURES */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="accent" className="mb-2">
                Curated Packages
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Available Adventures in {destination.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Handcrafted itineraries led by UIAGM/IMF certified instructors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.adventures.map((adv) => (
              <div
                key={adv.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                      {adv.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                      {adv.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {adv.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold mt-2">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{adv.duration}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {adv.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Package price</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ₹{adv.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Book Now - Opens Booking Page */}
                  <button
                    type="button"
                    onClick={() => navigate(`/booking/${adv.id}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: PHOTO GALLERY */}
        <div className="space-y-6">
          <div>
            <Badge variant="primary" className="mb-2">
              Visual Highlights
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Photo Gallery
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              High-resolution captures by expedition leaders. Click any photo to view in Lightbox.
            </p>
          </div>

          <DestinationGallery
            images={destination.images}
            destinationName={destination.name}
          />
        </div>

        {/* SECTION 4, 5, 6: BEST TIME, THINGS TO CARRY & SAFETY GUIDELINES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Best Time to Visit */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Best Time to Visit
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {destination.overview.bestMonths}
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold block text-slate-900 dark:text-white">Seasonal Weather Tip:</span>
              <p>Evenings experience a sharp temperature drop. Layered synthetic clothing is strictly recommended.</p>
            </div>
          </div>

          {/* Things to Carry */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Things to Carry
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {destination.thingsToCarry.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Guidelines */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Safety Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {destination.safetyGuidelines.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 7: NEARBY ATTRACTIONS */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              Side Trips
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nearby Attractions
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Scenic valley spots, high passes, and waterfalls located within day-trip distance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {destination.nearbyAttractions.map((spot, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden h-44 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-bold text-sm drop-shadow-sm">{spot.name}</h4>
                  <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{spot.distance}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 8 & 9: REVIEWS & FAQS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Reviews */}
          <div>
            <DestinationReview reviews={destination.reviews} />
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Everything you need to know about preparation, weather, and safety.
              </p>
            </div>
            <FAQAccordion faqs={destination.faqs} />
          </div>
        </div>

        {/* SECTION 10: RELATED DESTINATIONS */}
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div>
            <Badge variant="primary" className="mb-2">
              Similar Expeditions
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Related Destinations You Might Like
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore similar rugged landscapes and adventure hotspots across India.
            </p>
          </div>

          <RelatedDestinations
            currentDestination={destination}
            allDestinations={DESTINATIONS_DATA}
          />
        </div>

      </section>
    </div>
  );
};

export default DestinationDetails;
