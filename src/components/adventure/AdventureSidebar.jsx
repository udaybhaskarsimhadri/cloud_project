import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Clock, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lock, 
  Sparkles, 
  Users, 
  Calendar,
  AlertCircle,
  X,
  Compass
} from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const AdventureSidebar = ({ adventure }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!adventure) return null;

  const {
    duration,
    difficulty,
    cancellationPolicy = 'Free cancellation up to 7 days before departure',
    name,
  } = adventure;

  const currentPrice = adventure.pricing?.discountPrice || adventure.discountPrice || adventure.price || 8999;
  const strikePrice = adventure.pricing?.originalPrice || adventure.originalPrice || null;
  const seatsLeft = adventure.availableDates?.[0]?.availableSeats ?? adventure.seatsLeft ?? 6;
  const nextBatchDates = adventure.availableDates?.[0]
    ? `${adventure.availableDates[0].startDate} - ${adventure.availableDates[0].endDate}`
    : (adventure.batches?.[0]?.dates || null);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this incredible expedition on AdventureX: ${name} - ${currentUrl}`)}`, '_blank');
  };

  const handleShareInstagram = () => {
    // Instagram doesn't support web direct URL sharing, copy link instead with notice
    handleCopyLink();
    alert('Instagram does not support web direct links. The expedition link has been copied to your clipboard!');
  };

  const nextBatch = batches && batches.length > 0 ? batches[0] : null;

  return (
    <>
      <div className="sticky top-28 space-y-6">
        {/* Main Booking Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-7 overflow-hidden relative">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Pricing Header */}
          <div className="space-y-2 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Starting from
              </span>
              {strikePrice && strikePrice > currentPrice && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                  Save ₹{(strikePrice - currentPrice).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {strikePrice && strikePrice > currentPrice && (
                <span className="text-lg line-through text-slate-600 dark:text-slate-500 font-medium">
                  ₹{strikePrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                / person
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              *Taxes & all adventure permits included in final checkout
            </p>
          </div>

          {/* Key Facts Pills */}
          <div className="py-5 space-y-3 border-b border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Duration
                </span>
                <p className="mt-1 font-bold text-sm text-[#0F172A] dark:text-white">
                  {duration}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Difficulty
                </span>
                <p className="mt-1 font-bold text-sm text-[#0F172A] dark:text-white">
                  {difficulty}
                </p>
              </div>
            </div>

            {/* Seats Left Alert */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-xs font-bold">
                  Seats Availability:
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                {seatsLeft} Seats Left
              </span>
            </div>

            {/* Next Available Batch */}
            {nextBatchDates && (
              <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="font-semibold">Next Batch:</span>
                </div>
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  {nextBatchDates}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-5 space-y-3">
            {/* Book Now - Routes to Booking Flow */}
            <div className="relative group">
              <Link to={`/booking/${adventure.id}`} className="block w-full">
                <Button
                  variant="primary"
                  className="w-full py-4 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  <Compass className="w-5 h-5" />
                  <span>Book Now</span>
                </Button>
              </Link>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant reservation confirmation • Free cancellation</span>
              </div>
            </div>

            {/* Secondary Actions: Wishlist and Share */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold border transition-all duration-200 ${
                  isWishlisted
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#1E293B] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-500'
                  }`}
                />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#1E293B] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-200"
              >
                <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Guarantees & Trust Badges */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Verified Guides & Certified Equipment</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{cancellationPolicy}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#475569] dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Best Price Guarantee & No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 w-full max-w-md relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#0F172A] dark:text-white">
                    Share Expedition
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-5 space-y-4">
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400">
                  Invite your friends and trekking partners to join this journey:
                </p>

                {/* Social Share Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.45 1.488 1.761 2.068.324.143.514.225.688.28.175.056.334.048.46-.07.159-.148.679-.792.86-.966.181-.174.362-.145.607-.058s1.56.735 1.828.868c.267.133.447.199.512.308.065.109.065.636-.079 1.041z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold">WhatsApp</span>
                  </button>

                  {/* Facebook */}
                  <button
                    type="button"
                    onClick={handleShareFacebook}
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold">Facebook</span>
                  </button>

                  {/* Instagram */}
                  <button
                    type="button"
                    onClick={handleShareInstagram}
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-pink-50/80 dark:bg-pink-950/40 hover:bg-pink-100 dark:hover:bg-pink-900/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold">Instagram</span>
                  </button>
                </div>

                {/* Copy Link Input */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-[#1E293B] dark:text-slate-300 block mb-1.5">
                    Or copy page link
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={currentUrl}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 select-all focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdventureSidebar;
