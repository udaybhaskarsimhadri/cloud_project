import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles,
  MapPin,
  Star,
  Compass,
  ArrowRight,
  Clock,
  Ticket
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import DestinationCard from '../components/destinations/DestinationCard';
import DestinationFilters from '../components/destinations/DestinationFilters';
import DestinationSearch from '../components/destinations/DestinationSearch';
import SmartSearchHelper from '../components/ai/SmartSearchHelper';
import Badge from '../components/common/Badge';
import useDebounce from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 6;

const Destinations = () => {
  const navigate = useNavigate();

  // Search Bar State (Top section)
  const [searchDestination, setSearchDestination] = useState('');
  const [searchType, setSearchType] = useState('All');
  const [searchDifficulty, setSearchDifficulty] = useState('All');
  const [searchBudget, setSearchBudget] = useState('All');
  const [searchDuration, setSearchDuration] = useState('All');

  // Sidebar Filters State
  const [filters, setFilters] = useState({
    categories: [],
    difficulties: [],
    durations: [],
    seasons: [],
    minRating: 0,
    maxPrice: 30000,
  });

  // Sort State
  // Options: 'popular' | 'newest' | 'rating' | 'price-asc' | 'price-desc'
  const [sortBy, setSortBy] = useState('popular');

  // View Mode: 'grid' | 'list'
  const [viewMode, setViewMode] = useState('grid');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer Toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick View Modal State
  const [quickViewItem, setQuickViewItem] = useState(null);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      difficulties: [],
      durations: [],
      seasons: [],
      minRating: 0,
      maxPrice: 30000,
    });
    setSearchDestination('');
    setSearchType('All');
    setSearchDifficulty('All');
    setSearchBudget('All');
    setSearchDuration('All');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setCurrentPage(1);
  };

  // Debounce search input for performance
  const debouncedSearch = useDebounce(searchDestination, 250);

  // Local filtering & sorting logic on DESTINATIONS_DATA
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS_DATA.filter((item) => {
      // 1. Text search (Destination name or state)
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesState = item.state.toLowerCase().includes(query);
        if (!matchesName && !matchesState) return false;
      }

      // 2. Top Bar Type Filter
      if (searchType !== 'All' && item.primaryCategory !== searchType && !item.categories.includes(searchType)) {
        return false;
      }

      // 3. Top Bar Difficulty Filter
      if (searchDifficulty !== 'All' && item.difficulty.toLowerCase() !== searchDifficulty.toLowerCase()) {
        return false;
      }

      // 4. Top Bar Budget Filter
      if (searchBudget !== 'All' && item.price > Number(searchBudget)) {
        return false;
      }

      // 5. Top Bar Duration Filter
      if (searchDuration !== 'All' && item.duration !== searchDuration) {
        return false;
      }

      // 6. Sidebar Category Multi-select
      if (filters.categories.length > 0) {
        const matchesAnyCat = filters.categories.some(
          (cat) => item.primaryCategory === cat || item.categories.includes(cat)
        );
        if (!matchesAnyCat) return false;
      }

      // 7. Sidebar Difficulty Multi-select
      if (filters.difficulties.length > 0) {
        const matchesAnyDiff = filters.difficulties.some(
          (diff) => item.difficulty.toLowerCase() === diff.toLowerCase()
        );
        if (!matchesAnyDiff) return false;
      }

      // 8. Sidebar Duration Multi-select
      if (filters.durations.length > 0) {
        if (!filters.durations.includes(item.duration)) return false;
      }

      // 9. Sidebar Season Multi-select
      if (filters.seasons.length > 0) {
        const matchesAnySeason = filters.seasons.some(
          (s) => item.season === s || item.seasonsAvailable.includes(s)
        );
        if (!matchesAnySeason) return false;
      }

      // 10. Sidebar Max Price Slider
      if (filters.maxPrice && item.price > filters.maxPrice) {
        return false;
      }

      // 11. Sidebar Min Rating
      if (filters.minRating && item.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return b.reviewsCount - a.reviewsCount;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt || '2026-01-01') - new Date(a.createdAt || '2026-01-01');
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [
    debouncedSearch,
    searchType,
    searchDifficulty,
    searchBudget,
    searchDuration,
    filters,
    sortBy
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE) || 1;
  const paginatedDestinations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDestinations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDestinations, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* ======================================================== */}
      {/* TOP SECTION: BANNER & SEARCH BAR                         */}
      {/* ======================================================== */}
      <section className="relative isolate pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
        {/* Full-bleed banner background with dark overlay between 45% and 60% */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
            alt="Adventure mountain landscape"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Dark Overlay between 45% and 60% ensuring WCAG AA contrast & visible background image */}
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-10"
          >
            {/* High-Contrast Readable Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#0F172A] text-xs sm:text-sm font-bold shadow-md mb-6">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>Curated Worldwide Expeditions</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              Explore Amazing Adventure Destinations
            </h1>
            <p className="mt-5 text-base sm:text-xl text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              Find your perfect adventure experience.
            </p>
          </motion.div>

          {/* Integrated Modern Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <DestinationSearch
              searchDestination={searchDestination}
              setSearchDestination={setSearchDestination}
              searchType={searchType}
              setSearchType={setSearchType}
              searchDifficulty={searchDifficulty}
              setSearchDifficulty={setSearchDifficulty}
              searchBudget={searchBudget}
              setSearchBudget={setSearchBudget}
              searchDuration={searchDuration}
              setSearchDuration={setSearchDuration}
              onSearchSubmit={handleSearchSubmit}
            />
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MAIN CONTENT: FILTERS & DESTINATIONS LIST               */}
      {/* ======================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Filter Sidebar (Desktop) */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24">
            <DestinationFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onApplyFilters={() => setCurrentPage(1)}
              totalResults={filteredDestinations.length}
            />
          </div>

          {/* Right Main Grid/List Container */}
          <div className="flex-1 w-full space-y-6">
            {/* Part 10: AI Smart Search Suggestions */}
            <SmartSearchHelper 
              searchQuery={searchDestination} 
              onSelectDestination={(name) => setSearchDestination(name)} 
            />

            {/* Control Bar: Total Count, Mobile Filter Trigger, Sort, View Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Showing {filteredDestinations.length} Destinations
                </span>

                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span className="hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid View"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="List View"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Destinations Grid / List */}
            {paginatedDestinations.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {paginatedDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    viewMode={viewMode}
                    onQuickView={(item) => setQuickViewItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Compass className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  No Destinations Match Your Filter
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Try adjusting your budget slider, season, or keywords to discover other extraordinary expeditions.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* ======================================================== */}
            {/* PAGINATION CONTROLS                                      */}
            {/* ======================================================== */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/30'
                          : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <DestinationFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onApplyFilters={() => {
            setCurrentPage(1);
            setMobileFiltersOpen(false);
          }}
          totalResults={filteredDestinations.length}
          isMobileModal={true}
          onCloseMobileModal={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setQuickViewItem(null)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <img
                  src={quickViewItem.images[0]}
                  alt={quickViewItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white mb-2 inline-block">
                    {quickViewItem.difficulty}
                  </span>
                  <h3 className="text-3xl font-black">{quickViewItem.name}</h3>
                  <p className="text-xs text-slate-200 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{quickViewItem.state}, {quickViewItem.country}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {quickViewItem.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-normal">Rating</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {quickViewItem.rating} ({quickViewItem.reviewsCount})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-normal">Best Season</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{quickViewItem.season}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-normal">Duration</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{quickViewItem.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block font-normal">Expeditions</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 block mt-0.5">{quickViewItem.adventureCount} Available</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Popular Adventures Included:
                  </h4>
                  <div className="space-y-2">
                    {quickViewItem.adventures?.slice(0, 2).map((adv) => (
                      <div key={adv.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{adv.name}</p>
                          <p className="text-slate-500 dark:text-slate-400">{adv.duration} • {adv.difficulty}</p>
                        </div>
                        <span className="font-extrabold text-slate-900 dark:text-white">₹{adv.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">Starting from</span>
                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      ₹{quickViewItem.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickViewItem(null)}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white dark:bg-slate-800 border-2 border-[#2563EB] text-[#2563EB] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const targetId = quickViewItem.id;
                        setQuickViewItem(null);
                        navigate(`/destination/${targetId}`);
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Full Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Destinations;
