import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Tag, 
  Edit3, 
  Check, 
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { communityService } from '../../services/communityService';

const CATEGORIES = ['All', 'Himalayan Treks', 'Weekend Getaways', 'Bucket List', 'Summer Rafting'];

const WishlistManager = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => communityService.getEnhancedWishlist());
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');

  const handleRemove = (advId) => {
    const updated = communityService.removeFromEnhancedWishlist(advId);
    setWishlist(updated);
  };

  const handleSaveNotes = (advId) => {
    const updated = communityService.updateWishlistItem(advId, { notes: notesDraft });
    setWishlist(updated);
    setEditingNotesId(null);
  };

  const handleChangePriority = (advId, priority) => {
    const updated = communityService.updateWishlistItem(advId, { priority });
    setWishlist(updated);
  };

  const filteredItems = activeCategory === 'All'
    ? wishlist
    : wishlist.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Category Pills & Count Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold text-slate-500 shrink-0">
          {filteredItems.length} Saved Expeditions
        </span>
      </div>

      {/* Grid of Enhanced Wishlist Cards */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Heart className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            No expeditions in this category
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse our curated destinations and save your dream trails with custom priorities and booking notes.
          </p>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.adventureId}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Image + Priority Badge */}
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                      {item.category}
                    </span>
                  </div>

                  {/* Priority selector */}
                  <div className="absolute top-2.5 right-2.5">
                    <select
                      value={item.priority || 'Medium'}
                      onChange={(e) => handleChangePriority(item.adventureId, e.target.value)}
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border outline-none cursor-pointer ${
                        item.priority === 'High'
                          ? 'bg-rose-500 text-white border-rose-600'
                          : item.priority === 'Low'
                          ? 'bg-slate-700 text-slate-200 border-slate-600'
                          : 'bg-amber-500 text-white border-amber-600'
                      }`}
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                {/* Adventure Details */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">
                      {item.duration || '5 Days'}
                    </span>
                    <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{item.destination}</span>
                  </p>
                </div>

                {/* Personal Notes Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                  {editingNotesId === item.adventureId ? (
                    <div className="space-y-1.5">
                      <textarea
                        rows={2}
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        placeholder="Add booking notes, target month, gear reminders..."
                        className="w-full text-[11px] p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 outline-none"
                      />
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="px-2 py-0.5 text-[10px] text-slate-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(item.adventureId)}
                          className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditingNotesId(item.adventureId);
                        setNotesDraft(item.notes || '');
                      }}
                      className="cursor-pointer group flex items-start justify-between gap-2"
                    >
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 italic line-clamp-2">
                        {item.notes ? `"${item.notes}"` : 'Click to add personal trip notes...'}
                      </p>
                      <Edit3 className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Remove & Move to Booking */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRemove(item.adventureId)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate(`/booking/${item.adventureId}`)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Book Expedition</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistManager;
