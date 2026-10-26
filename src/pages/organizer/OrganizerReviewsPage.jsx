import React, { useState, useEffect } from 'react';
import OrganizerNav from '../../components/organizer/OrganizerNav';
import OrganizerReviews from '../../components/organizer/OrganizerReviews';
import { organizerService } from '../../services/organizerService';
import { CheckCircle2 } from 'lucide-react';

const OrganizerReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const loadReviews = () => {
    const list = organizerService.getReviews();
    setReviews(list);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleAddReply = (reviewId, replyText) => {
    organizerService.addOrganizerReply(reviewId, replyText);
    loadReviews();
    setToastMessage('Organizer reply posted successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
      <OrganizerNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <OrganizerReviews
          reviews={reviews}
          onAddReply={handleAddReply}
        />
      </div>
    </div>
  );
};

export default OrganizerReviewsPage;
