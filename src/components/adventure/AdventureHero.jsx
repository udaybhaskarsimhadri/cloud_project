import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Clock, 
  Compass, 
  ArrowLeft, 
  UserCheck, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import Badge from '../common/Badge';

const difficultyBadgeVariant = {
  Easy: 'easy',
  Moderate: 'moderate',
  Hard: 'challenging',
  Challenging: 'challenging'
};

const AdventureHero = ({ adventure }) => {
  if (!adventure) return null;

  return (
    <section className="relative isolate min-h-[65vh] lg:min-h-[72vh] flex items-end pb-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Full-bleed Hero Image with 50% dark overlay keeping background image clearly visible */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={adventure.images[0]}
          alt={adventure.name}
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay between 45% and 60% for WCAG AA readability */}
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto w-full text-white relative z-10 space-y-6">
        {/* Breadcrumb Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-white font-bold truncate max-w-xs">{adventure.name}</span>
        </motion.div>

        {/* Hero Meta Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>{adventure.category}</span>
          </span>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md inline-flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              adventure.difficulty === 'Easy' ? 'bg-emerald-500' : adventure.difficulty === 'Moderate' ? 'bg-amber-500' : 'bg-rose-500'
            }`} />
            <span>{adventure.difficulty} Difficulty</span>
          </span>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#0F172A] border border-slate-200 shadow-md inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{adventure.duration}</span>
          </span>
        </motion.div>

        {/* Adventure Title & Essential Details */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4 max-w-3xl"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              {adventure.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{adventure.destination}</span>
              </span>

              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-amber-300">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span className="font-bold text-white">{adventure.rating}</span>
                <span className="text-slate-300 font-normal">({adventure.reviewsCount} reviews)</span>
              </span>

              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Led by <strong className="text-white">{adventure.organizer.name}</strong></span>
              </span>
            </div>
          </motion.div>

          {/* Pricing Highlight Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/20 text-white shrink-0 sm:min-w-[260px] shadow-2xl"
          >
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider block">
              Starting From
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black text-white">
                ₹{adventure.price.toLocaleString()}
              </span>
              {adventure.originalPrice && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  ₹{adventure.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-emerald-400 mt-2 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Guide & Insurance Included</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdventureHero;
