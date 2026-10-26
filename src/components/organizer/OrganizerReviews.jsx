import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageSquare, 
  CornerDownRight, 
  Send, 
  Check, 
  User, 
  Sparkles,
  Mountain
} from 'lucide-react';

const OrganizerReviews = ({ reviews = [], onAddReply }) => {
  const [replyInputs, setReplyInputs] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleTextChange = (id, text) => {
    setReplyInputs((prev) => ({ ...prev, [id]: text }));
  };

  const handleSendReply = (reviewId) => {
    const text = replyInputs[reviewId];
    if (!text || !text.trim()) return;

    onAddReply(reviewId, text.trim());
    setActiveReplyId(null);
    setReplyInputs((prev) => ({ ...prev, [reviewId]: '' }));
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white">
              Customer Reviews & Feedback ({reviews.length})
            </h3>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            Verified traveler testimonials. Respond to travelers to build trust and high host ratings.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>4.95 Rating • Superhost Status</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.customerPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={rev.customerName}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
                    {rev.customerName}
                  </h4>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold block">
                    {rev.adventure}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed italic">
              "{rev.review}"
            </p>

            {/* Existing Organizer Reply */}
            {rev.organizerReply && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-start gap-2.5 text-xs">
                <CornerDownRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-extrabold text-blue-700 dark:text-blue-300 block text-[11px]">
                    Organizer Response (Himalayan Ridge Expeditions):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{rev.organizerReply}</p>
                </div>
              </div>
            )}

            {/* Reply Input or Trigger Button */}
            {!rev.organizerReply && (
              <div className="pt-2">
                {activeReplyId === rev.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={2}
                      value={replyInputs[rev.id] || ''}
                      onChange={(e) => handleTextChange(rev.id, e.target.value)}
                      placeholder="Write a professional host reply..."
                      className="w-full p-3 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveReplyId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSendReply(rev.id)}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white flex items-center gap-1.5 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Reply</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveReplyId(rev.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reply to this review</span>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerReviews;
