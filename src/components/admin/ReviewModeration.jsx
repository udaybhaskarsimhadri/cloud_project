import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Search, 
  CheckCircle2, 
  EyeOff, 
  Trash2, 
  MessageSquare, 
  ShieldCheck,
  X
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const ReviewModeration = ({ initialReviews = [], onReviewsUpdated }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [replyingReview, setReplyingReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = 
      r.adventureTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.travelerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.review?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id, newStatus) => {
    const updated = adminService.updateReviewStatus(id, newStatus);
    if (updated) {
      setReviews(adminService.getReviews());
      if (onReviewsUpdated) onReviewsUpdated();
      showToast(`Review status updated to ${newStatus}.`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      adminService.deleteReview(id);
      setReviews(adminService.getReviews());
      if (onReviewsUpdated) onReviewsUpdated();
      showToast('Review removed.');
    }
  };

  const handleSaveReply = (e) => {
    e.preventDefault();
    if (!replyingReview) return;
    const updated = adminService.replyReview(replyingReview.id, replyText);
    if (updated) {
      setReviews(adminService.getReviews());
      if (onReviewsUpdated) onReviewsUpdated();
      setReplyingReview(null);
      setReplyText('');
      showToast('Official platform response published.');
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reviews, adventurers, expeditions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white cursor-pointer focus:outline-none"
          >
            <option value="All">All Reviews</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending Audit</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 font-bold">
            No reviews match your filters.
          </div>
        ) : (
          filteredReviews.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={r.travelerAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.travelerName)}`}
                      alt={r.travelerName}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                        {r.travelerName}
                      </p>
                      <p className="text-[10px] text-slate-400">{r.date}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    r.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : r.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {r.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {r.rating}.0
                  </span>
                </div>

                <p className="text-xs font-bold text-purple-700 dark:text-purple-400 mb-1">
                  Trip: {r.adventureTitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{r.review}"
                </p>

                {r.reply && (
                  <div className="mt-3 p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-[11px] text-purple-900 dark:text-purple-300">
                    <span className="font-black block text-[10px] uppercase text-purple-600">Official Moderator Reply:</span>
                    <span>{r.reply}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  {r.status !== 'Approved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(r.id, 'Approved')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== 'Hidden' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(r.id, 'Hidden')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      Hide
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingReview(r);
                      setReplyText(r.reply || '');
                    }}
                    title="Reply to Review"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    title="Delete Review"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {replyingReview && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setReplyingReview(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                Moderator Response
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Publish official response to {replyingReview.travelerName}'s feedback
              </p>

              <form onSubmit={handleSaveReply} className="space-y-4">
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official response..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-purple-600"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReplyingReview(null)}
                    className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    Publish Reply
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ReviewModeration;
