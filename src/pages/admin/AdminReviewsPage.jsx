import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';
import ReviewModeration from '../../components/admin/ReviewModeration';
import { adminService } from '../../services/adminService';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  const refreshReviews = () => {
    setReviews(adminService.getReviews());
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const pendingCount = reviews.filter(r => r.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Reviews & Quality Moderation
            </h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {pendingCount} Pending Moderation
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Ensure integrity of customer feedback, hide fraudulent ratings, and reply as the AdventureX safety team
          </p>
        </div>

        {/* Review Moderation Module */}
        <ReviewModeration
          initialReviews={reviews}
          onReviewsUpdated={refreshReviews}
        />
      </main>
    </div>
  );
};

export default AdminReviewsPage;
