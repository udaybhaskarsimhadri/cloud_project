import React, { useState, useEffect } from 'react';
import DashboardNav from '../components/dashboard/DashboardNav';
import WishlistGrid from '../components/dashboard/WishlistGrid';
import WishlistManager from '../components/community/WishlistManager';
import { dashboardService } from '../services/dashboardService';
import { Heart, Sparkles, CheckCircle2, SlidersHorizontal, LayoutGrid } from 'lucide-react';

const Wishlist = () => {
  const [wishlistAdventures, setWishlistAdventures] = useState([]);
  const [viewMode, setViewMode] = useState('manager'); // 'manager' | 'grid'
  const [toast, setToast] = useState('');

  const loadWishlist = () => {
    const list = dashboardService.getWishlistAdventures();
    setWishlistAdventures(list);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = (adventureId) => {
    dashboardService.removeFromWishlist(adventureId);
    loadWishlist();
    setToast('Adventure removed from wishlist.');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <DashboardNav activeTab="wishlist" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white">
                My Saved Wishlist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400">
              Keep track of your dream expeditions with categories, booking notes, and priority levels.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setViewMode('manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'manager'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Enhanced Manager</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="p-4 rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{toast}</span>
          </div>
        )}

        {viewMode === 'manager' ? (
          <WishlistManager />
        ) : (
          <WishlistGrid
            adventures={wishlistAdventures}
            onRemoveFromWishlist={handleRemove}
          />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
