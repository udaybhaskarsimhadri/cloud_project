import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const DestinationReview = ({ reviews = [] }) => {
  const [localReviews, setLocalReviews] = useState(reviews);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const reviewToAdd = {
      name: newReview.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: newReview.rating,
      location: 'Verified Explorer',
      date: 'Just Now',
      comment: newReview.comment
    };

    setLocalReviews([reviewToAdd, ...localReviews]);
    setNewReview({ name: '', comment: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Review Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Traveler Reviews ({localReviews.length})
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Real feedback from verified adventure participants.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{showForm ? 'Cancel' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Review Submission Form (Mock) */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Share Your Expedition Experience
          </h4>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Your Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= newReview.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Full Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            placeholder="Describe the trails, equipment, guides, and overall safety..."
            rows={3}
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center justify-between">
            {submitted ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Review posted successfully!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md active:scale-95 transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Review Items List */}
      <div className="space-y-4">
        {localReviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {rev.location} • {rev.date}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(rev.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationReview;
