import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Compass, 
  Heart, 
  Eye, 
  ArrowRight, 
  Calendar, 
  Sparkles,
  Clock
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

const difficultyBadgeVariant = {
  Easy: 'easy',
  Moderate: 'moderate',
  Hard: 'challenging',
};

const DestinationCard = ({ destination, viewMode = 'grid', onQuickView }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  const handleCardClick = () => {
    navigate(`/destination/${destination.id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(destination);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={handleCardClick}
        className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row"
      >
        {/* Left Image Section */}
        <div className="relative md:w-80 h-64 md:h-auto overflow-hidden shrink-0">
          <img
            src={destination.images[0]}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

          {/* Difficulty Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={difficultyBadgeVariant[destination.difficulty] || 'primary'}>
              {destination.difficulty}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
              }`}
            />
          </button>

          {/* Season Indicator on Image */}
          <div className="absolute bottom-4 left-4 text-white text-xs font-semibold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Season: {destination.season}</span>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.state}, {destination.country}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{destination.rating}</span>
                <span className="text-slate-500 font-normal">({destination.reviewsCount})</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {destination.name}
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {destination.description}
            </p>

            {/* Quick meta details */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{destination.adventureCount} Expeditions</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>{destination.duration}</span>
              </span>
              <span>•</span>
              <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-semibold">
                {destination.primaryCategory}
              </span>
            </div>
          </div>

          {/* Pricing & Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-600 dark:text-slate-400 block font-semibold">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{destination.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">/ person</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickView}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Quick View</span>
              </button>

              <button
                type="button"
                onClick={handleCardClick}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View Mode (Default)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Large Image Container */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={destination.images[0]}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Difficulty Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge variant={difficultyBadgeVariant[destination.difficulty] || 'primary'}>
              {destination.difficulty}
            </Badge>
          </div>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-white'
              }`}
            />
          </button>

          {/* Rating in image header */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-400 text-xs font-bold border border-white/10 backdrop-blur-md shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-16 text-white">
            <h3 className="text-2xl font-black drop-shadow-md truncate">{destination.name}</h3>
            <p className="text-xs text-slate-100 flex items-center gap-1 mt-0.5 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{destination.state}, {destination.country}</span>
            </p>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-semibold pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{destination.adventureCount} Expeditions</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{destination.season}</span>
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Pricing & Quick View / Details Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-400 block font-semibold">Starting from</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              ₹{destination.price.toLocaleString()}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold"> / person</span>
          </div>

          <button
            type="button"
            onClick={handleQuickView}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleCardClick}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-1.5 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
