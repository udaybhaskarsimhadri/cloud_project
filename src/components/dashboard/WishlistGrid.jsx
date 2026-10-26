import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Star, 
  Trash2, 
  CalendarPlus, 
  Search, 
  Compass, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistGrid = ({ adventures = [], onRemoveFromWishlist }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(adventures.map((a) => a.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [adventures]);

  const filteredAdventures = useMemo(() => {
    return adventures.filter((adv) => {
      const matchesSearch = 
        adv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adv.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adv.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        categoryFilter === 'All' ? true : adv.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [adventures, searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Saved Expeditions ({adventures.length})
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Compare and book your saved dream adventures whenever you are ready.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Wishlist */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Tabs */}
          {categories.length > 2 && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid of Wishlisted Adventures */}
      {filteredAdventures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredAdventures.map((adv) => {
              const image = adv.images?.[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
              const priceVal = adv.price || 8999;

              return (
                <motion.div
                  key={adv.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group transition-all"
                >
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={adv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
                      {adv.category || 'Trek'}
                    </span>

                    {/* Remove from Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(adv.id)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-sm cursor-pointer"
                      title="Remove from saved wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-black text-amber-300 bg-slate-900/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{adv.rating || 4.9}</span>
                      <span className="text-slate-300 font-normal">({adv.reviewsCount || 120})</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{adv.destination}</span>
                      </div>

                      <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {adv.name}
                      </h4>

                      <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 line-clamp-2">
                        {adv.description || adv.experienceSummary}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting from</span>
                        <span className="text-lg font-black text-[#0F172A] dark:text-white">
                          ₹{priceVal.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold"> / person</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/adventure/${adv.id}`}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/booking/${adv.id}`}
                          className="px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1 transition-colors"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
              Your Wishlist is Empty
            </h4>
            <p className="text-xs text-[#475569] dark:text-slate-400 max-w-sm mx-auto">
              Save captivating Himalayan passes, river rafting gorges, and scuba reefs to plan your upcoming journeys.
            </p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Expeditions</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistGrid;
