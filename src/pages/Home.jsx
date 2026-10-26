import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Compass,
  Star,
  Clock,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Tag,
  Headphones,
  CloudSun,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Send,
  CheckCircle2,
  X,
  Flame,
  Award,
  BookOpen,
  Camera,
  ExternalLink,
  Ticket
} from 'lucide-react';
import {
  FaHiking,
  FaCampground,
  FaWater,
  FaFish,
  FaWind,
  FaBiking,
  FaBinoculars,
  FaMountain
} from 'react-icons/fa';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import Counter from '../components/common/Counter';
import { 
  CATEGORIES, 
  POPULAR_DESTINATIONS, 
  FEATURED_ADVENTURES, 
  WHY_CHOOSE_US, 
  TESTIMONIALS, 
  STATISTICS,
  GALLERY_ITEMS,
  BLOG_POSTS
} from '../utils/constants';

// Icon mapper for categories
const categoryIconMap = {
  FaHiking,
  FaCampground,
  FaWater,
  FaFish,
  FaWind,
  FaBiking,
  FaBinoculars,
  FaMountain,
};

// Icon mapper for why choose us
const whyChooseIconMap = {
  BadgeCheck,
  Tag,
  Headphones,
  ShieldCheck,
  CloudSun,
  HeartPulse,
};

const Home = () => {
  const navigate = useNavigate();

  // Search Bar UI State (UI only)
  const [searchDestination, setSearchDestination] = useState('');
  const [searchType, setSearchType] = useState('All Adventures');
  const [searchDate, setSearchDate] = useState('');
  const [searchGuests, setSearchGuests] = useState('2 Guests');

  // Testimonials Carousel State
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  // Newsletter UI state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Organizer Modal UI state
  const [organizerModal, setOrganizerModal] = useState(false);

  // Blog article modal / alert UI state
  const [activeBlog, setActiveBlog] = useState(null);

  // Auto-scroll testimonials
  useEffect(() => {
    if (isTestimonialPaused) return;
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isTestimonialPaused]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/destinations');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus('success');
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterStatus(null);
      }, 4000);
    }
  };

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const scrollToSearch = () => {
    const searchElem = document.getElementById('search-section');
    if (searchElem) {
      searchElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* ======================================================== */}
      {/* SECTION 1: HERO SECTION                                  */}
      {/* ======================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Full-screen Background Image with Dark Overlay (40-60% opacity) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85"
            alt="Mountain, Camping & Adventure background"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Dark Overlay for readability and WCAG AA contrast */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Subtle bottom gradient blending into search */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full flex-1 flex flex-col items-center justify-center mt-6">
          {/* Frosted Glass Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-10 md:p-14 rounded-3xl shadow-2xl border border-white/60 dark:border-slate-800 max-w-4xl mx-auto"
          >
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 text-xs sm:text-sm font-bold shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>Premium Global Expedition Platform</span>
            </div>

            {/* Animated Headline */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12]"
            >
              <span className="text-[#0F172A] dark:text-white">Explore Extraordinary </span>
              <span className="bg-gradient-to-r from-[#2563EB] via-teal-500 to-[#10B981] bg-clip-text text-transparent">
                Adventures
              </span>
              <span className="text-[#0F172A] dark:text-white"> Around the World</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-[#475569] dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Discover trekking, camping, rafting, scuba diving, paragliding and unforgettable outdoor experiences.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => navigate('/destinations')}
                className="w-full sm:w-auto inline-flex items-center justify-center font-bold rounded-xl px-8 py-4 gap-2 text-base bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Explore Adventures</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>

              <button
                type="button"
                onClick={() => setOrganizerModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center font-bold rounded-xl px-8 py-4 gap-2 text-base bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-2 border-[#2563EB] text-[#2563EB] dark:text-blue-400 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Award className="w-5 h-5 mr-1 text-[#2563EB] dark:text-blue-400" />
                <span>Become an Organizer</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollToSearch}
          className="mt-10 cursor-pointer flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors z-20 group"
          role="button"
          aria-label="Scroll down to search adventures"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-200 group-hover:text-white">
            Scroll to Discover
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all">
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: FLOATING SEARCH CARD                          */}
      {/* ======================================================== */}
      <section id="search-section" className="relative -mt-16 sm:-mt-20 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white dark:bg-slate-900 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-left"
        >
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Destination */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
                Destination
              </label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder="Where to? (e.g. Manali, Leh)"
                  className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-slate-100 placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Adventure Type */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
                Adventure Type
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-slate-100 focus:outline-none cursor-pointer"
                >
                  <option value="All Adventures" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">All Adventures</option>
                  <option value="Trekking" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🏔 Trekking</option>
                  <option value="Camping" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🏕 Camping</option>
                  <option value="River Rafting" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🚣 River Rafting</option>
                  <option value="Paragliding" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🪂 Paragliding</option>
                  <option value="Scuba Diving" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🤿 Scuba Diving</option>
                  <option value="Mountain Biking" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🚵 Mountain Biking</option>
                  <option value="Rock Climbing" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🧗 Rock Climbing</option>
                  <option value="Wildlife Safari" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🦁 Wildlife Safari</option>
                </select>
              </div>
            </div>

            {/* Travel Date */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
                Travel Date
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-slate-100 focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
                Guests
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Users className="w-4 h-4 text-blue-500 shrink-0" />
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-slate-100 focus:outline-none cursor-pointer"
                >
                  <option value="1 Guest" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">1 Guest</option>
                  <option value="2 Guests" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">2 Guests</option>
                  <option value="3-5 Guests" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">3-5 Guests</option>
                  <option value="Group 6+" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Group 6+</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="p-1 flex items-center justify-center">
              <button
                type="submit"
                aria-label="Search Adventures"
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer px-6"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: ADVENTURE CATEGORIES                         */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            Explore By Discipline
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Adventure Categories
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg">
            Choose from an elite collection of outdoor disciplines tailored for beginners and seasoned explorers alike.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = categoryIconMap[cat.icon] || FaHiking;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div
                  onClick={() => navigate('/destinations')}
                  className={`group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${cat.borderHover} hover:-translate-y-1`}
                >
                  {/* Subtle corner gradient blob */}
                  <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${cat.accentColor} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />

                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${cat.bgLight} flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 shadow-sm`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-2xl" role="img" aria-label={cat.title}>
                      {cat.emoji}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mt-1">
                    {cat.count}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: FEATURED DESTINATIONS                         */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/70 dark:bg-slate-900/40 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <Badge variant="secondary" className="mb-3">
              Top Trending Expeditions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Destinations
            </h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 max-w-xl">
              India’s most sought-after adventure hotspots featuring Manali, Leh Ladakh, Goa, Rishikesh, Coorg, and Munnar.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/destinations')}
            >
              View All Destinations
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {POPULAR_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Card className="group h-full flex flex-col cursor-pointer border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300" onClick={() => navigate('/destinations')}>
                {/* Large Destination Image with Hover Zoom */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Tag badge with high contrast */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white border border-white/20 backdrop-blur-md shadow-md">
                    {dest.tag}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 text-xs font-bold border border-white/10 backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dest.rating}</span>
                  </div>

                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black drop-shadow-md">{dest.name}</h3>
                    <p className="text-xs text-slate-100 flex items-center gap-1 mt-0.5 font-medium drop-shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{dest.state}</span>
                    </p>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{dest.duration}</span>
                    </span>
                    <span>{dest.adventuresCount} Adventures Available</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 block font-semibold">Starting from</span>
                      <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                        ₹{dest.startingPrice.toLocaleString()}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Explore <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: FEATURED ADVENTURES                          */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="accent" className="mb-3">
            Handpicked Thrills
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Adventures
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300 text-base sm:text-lg">
            Tested and certified wilderness expeditions curated for peak excitement, safety compliance, and breathtaking vistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_ADVENTURES.map((adv, idx) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Card className="group h-full flex flex-col justify-between border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div>
                  {/* Image with Difficulty Badge */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={adv.image}
                      alt={adv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${adv.difficultyColor}`}>
                        {adv.difficulty}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md flex items-center gap-1 border border-amber-300/80">
                        <Flame className="w-3 h-3 fill-slate-950 text-slate-950" />
                        {adv.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{adv.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
                      <span className="flex items-center gap-1 text-blue-700 dark:text-blue-400 font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{adv.location}</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{adv.rating}</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">({adv.reviewsCount})</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {adv.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & "Book Now" Button (UI Only) */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 line-through mr-2 font-medium">
                      ₹{adv.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      ₹{adv.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 block font-semibold">/ person</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/booking/${adv.id}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Book Now</span>
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: WHY CHOOSE US                                 */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-blue-50/60 dark:bg-blue-950/20 rounded-3xl border border-blue-200/60 dark:border-blue-900/40">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="primary" className="mb-3">
            Safety & Standards
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Choose AdventureX
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 text-base sm:text-lg">
            Engineered with traveler safety, audited guides, transparent pricing, and 24×7 emergency assistance at the forefront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComp = whyChooseIconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-5">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: ADVENTURE STATS                               */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Abstract light bursts */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" className="bg-white/15 text-white border-white/20 mb-3">
              Scale & Milestones
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Adventure Statistics
            </h2>
            <p className="mt-2 text-slate-200 font-medium">
              Trusted by adrenaline seekers nationwide for safe, world-standard expedition operations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATISTICS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm shadow-inner hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-teal-200 to-emerald-300">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-normal font-medium">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 8: TESTIMONIALS (CAROUSEL)                      */}
      {/* ======================================================== */}
      <section 
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        onMouseEnter={() => setIsTestimonialPaused(true)}
        onMouseLeave={() => setIsTestimonialPaused(false)}
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-3">
            Real Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Testimonials
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            Hear from genuine adventurers who transformed their outdoor dreams into unforgettable expeditions.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-200 dark:border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
            >
              {/* Profile image with decorative border */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-lg">
                  <img
                    src={TESTIMONIALS[testimonialIdx].avatar}
                    alt={TESTIMONIALS[testimonialIdx].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1.5 rounded-full shadow-md">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Review details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                  {[...Array(TESTIMONIALS[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg italic text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                  "{TESTIMONIALS[testimonialIdx].review}"
                </blockquote>

                <div className="pt-2">
                  <p className="font-bold text-slate-900 dark:text-white text-base">
                    {TESTIMONIALS[testimonialIdx].name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {TESTIMONIALS[testimonialIdx].role} • {TESTIMONIALS[testimonialIdx].location}
                  </p>
                  <div className="mt-1 inline-flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
                      {TESTIMONIALS[testimonialIdx].adventureType}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Trip: {TESTIMONIALS[testimonialIdx].trip}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === testimonialIdx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous Testimonial"
                className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next Testimonial"
                className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 9: ADVENTURE GALLERY                            */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="accent" className="mb-3">
            Captured Moments
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Adventure Gallery
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300 text-base sm:text-lg">
            A glimpse into the raw thrills, frozen summits, and underwater wonderlands documented by our expedition teams.
          </p>
        </div>

        {/* Responsive Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`relative group rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 ${item.span} h-64 md:h-72 cursor-pointer`}
              onClick={() => navigate('/destinations')}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.location}</span>
                  </p>
                  <h3 className="text-xl font-bold mt-1 text-white drop-shadow-sm">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Explore this trail</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 10: BLOG / ADVENTURE TIPS PREVIEW               */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/70 dark:bg-slate-900/40 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <Badge variant="primary" className="mb-3">
              Guides & Field Notes
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Adventure Tips & Stories
            </h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300 max-w-xl">
              Expert advice on trail survival, gear checklists, and peak weather seasons written by veteran mountaineers.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              icon={BookOpen}
              iconPosition="right"
              onClick={() => navigate('/about')}
            >
              Explore All Stories
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="group h-full flex flex-col justify-between border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    By {blog.author}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveBlog(blog)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 11: NEWSLETTER                                   */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-700 p-8 sm:p-14 text-white shadow-2xl overflow-hidden">
          {/* Subtle pattern decoration */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <Badge variant="neutral" className="bg-white/20 text-white border-white/30 mb-4">
              Weekly Expedition Digest
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Stay Ahead of the Next Trail
            </h2>
            <p className="mt-3 text-blue-50 text-sm sm:text-base leading-relaxed font-medium">
              Get secret trail recommendations, off-season discount alerts, and wilderness safety gear guides sent directly to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/80 shadow-md"
              />
              <Button
                variant="accent"
                type="submit"
                size="md"
                icon={Send}
                className="shadow-lg cursor-pointer"
              >
                Subscribe
              </Button>
            </form>

            {newsletterStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 inline-flex items-center gap-2 text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Thank you for subscribing! Check your inbox soon.</span>
              </motion.div>
            )}

            <p className="mt-4 text-xs text-blue-100 font-medium">
              We respect your privacy. No spam, unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 12: FINAL CALL TO ACTION                         */}
      {/* ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge variant="primary" className="mb-2">
            Begin Your Journey
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Ready For Your Next Adventure?
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium">
            Join thousands of travelers exploring amazing destinations. Pack your backpack and step into the extraordinary today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/destinations')}
              className="w-full sm:w-auto shadow-xl shadow-blue-600/30 cursor-pointer"
            >
              Explore Adventures
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Award}
              onClick={() => setOrganizerModal(true)}
              className="w-full sm:w-auto shadow-xl shadow-emerald-600/30 cursor-pointer"
            >
              Become Organizer
            </Button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MODALS / UI PLACEHOLDERS (UI ONLY)                      */}
      {/* ======================================================== */}

      {/* Become Organizer Modal */}
      <AnimatePresence>
        {organizerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setOrganizerModal(false)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-4">
                <Award className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Become a Certified Organizer
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                List your expeditions, manage outdoor groups, and reach over 10,000+ active travelers on AdventureX. The Organizer Dashboard module is coming in future phases.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Direct booking deposits with instant payouts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Wilderness rescue liability & equipment coverage</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Comprehensive customer review management</span>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setOrganizerModal(false)}
                >
                  Got It (Close Placeholder)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  {activeBlog.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
                <span>•</span>
                <span>By {activeBlog.author}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {activeBlog.title}
              </h3>

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeBlog.excerpt}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <Button variant="outline" onClick={() => setActiveBlog(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
