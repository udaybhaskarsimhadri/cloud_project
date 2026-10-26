import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Calendar, 
  Globe2, 
  ThumbsUp,
  Award
} from 'lucide-react';

const AdventureReviews = ({ reviews = [], rating = 4.9, reviewsCount = 120 }) => {
  const [filterRating, setFilterRating] = useState('All');

  if (!reviews || reviews.length === 0) return null;

  const filteredReviews = filterRating === 'All'
    ? reviews
    : reviews.filter((r) => Math.floor(r.rating) === Number(filterRating));

  return (
    <div className="space-y-6">
      {/* Reviews Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
              Verified Traveler Reviews
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Genuine experiences documented by trekkers and adventurers who completed this journey.
          </p>
        </div>

        {/* Big Rating Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 shrink-0">
          <div className="text-3xl font-black text-[#0F172A] dark:text-white flex items-center gap-1.5">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
          <div className="text-left text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-200">Overall Rating</p>
            <p className="text-slate-500 font-medium">{reviewsCount} Verified Reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                      {rev.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                        <span>{rev.country}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Explorer</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-xs font-black text-slate-900 dark:text-white">{rev.rating}</span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal italic">
                "{rev.review}"
              </blockquote>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Traveled in {rev.tripDate}</span>
              </span>

              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                100% Recommendation
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureReviews;
