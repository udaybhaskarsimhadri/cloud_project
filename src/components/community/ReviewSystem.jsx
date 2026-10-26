import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageSquare, 
  Image, 
  Upload, 
  X, 
  Check, 
  Trash2, 
  Edit3, 
  CornerDownRight, 
  ThumbsUp, 
  ShieldCheck, 
  AlertTriangle,
  Send,
  Calendar,
  Filter
} from 'lucide-react';
import RatingStars from './RatingStars';
import { communityService } from '../../services/communityService';
import { useAuth } from '../../context/AuthContext';

const ReviewSystem = ({ adventureId = null, adventureName = 'Expedition' }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isOrganizer = user?.role === 'organizer';

  const [reviews, setReviews] = useState(() => communityService.getReviews(adventureId));
  const [filterRating, setFilterRating] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Form states
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [replyTextMap, setReplyTextMap] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Photo upload handler (local base64 preview)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.slice(0, 4).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUploadedPhotos((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit new review or update existing
  const handleSubmitReview = (e) => {
    e?.preventDefault();
    if (!comment.trim()) return;

    if (editingReview) {
      const updated = communityService.updateReview(editingReview.id, {
        rating,
        title,
        comment,
        photos: uploadedPhotos
      });
      setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
      setEditingReview(null);
    } else {
      const updated = communityService.addReview({
        adventureId: adventureId || 'hampta-pass-trek',
        adventureName,
        rating,
        title: title || 'Incredible experience!',
        comment,
        photos: uploadedPhotos
      });
      setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
    }

    // Reset form
    setTitle('');
    setComment('');
    setRating(5);
    setUploadedPhotos([]);
    setShowAddModal(false);
  };

  // Delete review
  const handleDelete = (revId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updated = communityService.deleteReview(revId);
      setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
    }
  };

  // Edit review setup
  const handleEdit = (rev) => {
    setEditingReview(rev);
    setRating(rev.rating);
    setTitle(rev.title || '');
    setComment(rev.comment || '');
    setUploadedPhotos(rev.photos || []);
    setShowAddModal(true);
  };

  // Like review
  const handleLike = (revId) => {
    const updated = communityService.likeReview(revId);
    setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
  };

  // Submit organizer reply
  const handleOrganizerReply = (revId) => {
    const text = replyTextMap[revId];
    if (!text || !text.trim()) return;

    const organizerName = user?.name || 'Expedition Leader';
    const updated = communityService.replyToReview(revId, text.trim(), organizerName);
    setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
    setReplyTextMap((prev) => ({ ...prev, [revId]: '' }));
    setActiveReplyId(null);
  };

  // Admin moderation
  const handleModerate = (revId, newStatus) => {
    const updated = communityService.moderateReview(revId, newStatus);
    setReviews(adventureId ? updated.filter((r) => r.adventureId === adventureId) : updated);
  };

  // Calculate metrics
  const avgData = communityService.getAverageRating(adventureId);
  const filteredReviews = filterRating === 'All'
    ? reviews
    : reviews.filter((r) => Math.floor(r.rating) === Number(filterRating));

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header Bar with Overall Rating & Write Review Button */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black text-2xl border border-amber-500/20">
            {avgData.rating}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <RatingStars rating={avgData.rating} size="sm" />
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                {avgData.count} Verified Reviews
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              100% verified experiences from certified high-altitude travelers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Rating filter pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {['All', '5', '4'].map((star) => (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filterRating === star
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {star === 'All' ? 'All' : `${star} ★`}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setEditingReview(null);
              setRating(5);
              setTitle('');
              setComment('');
              setUploadedPhotos([]);
              setShowAddModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Write/Edit Review Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {editingReview ? 'Edit Your Expedition Review' : 'Share Your Trip Experience'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                {/* Rating selection */}
                <div>
                  <label className="block font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                    Your Rating
                  </label>
                  <RatingStars
                    rating={rating}
                    setRating={setRating}
                    interactive={true}
                    size="lg"
                    showScore={true}
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Unforgettable summit climb and supportive mountain guides!"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Detailed Trip Review
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share trail conditions, gear usability, campsites, meal quality, and safety..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Photo Upload with Local Preview */}
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Upload Expedition Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {uploadedPhotos.map((photo, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {uploadedPhotos.length < 4 && (
                      <label className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5" />
                        <span className="text-[9px] mt-0.5">Upload</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                  >
                    {editingReview ? 'Save Changes' : 'Submit Verified Review (+150 Pts)'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No reviews match this filter. Be the first to share an expedition review!
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              {/* Header: User avatar, rating, date */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {rev.userName}
                      </h4>
                      {rev.verifiedBooking && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Verified Trekker</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{rev.tripDate}</span>
                      <span>•</span>
                      <span className="text-slate-500">{rev.userBadge}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <RatingStars rating={rev.rating} size="sm" />
                  {/* Status pill for Admin */}
                  {isAdmin && (
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ml-2 ${
                      rev.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                    }`}>
                      {rev.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Comment */}
              <div className="space-y-1">
                <h5 className="font-black text-xs text-slate-900 dark:text-white">
                  {rev.title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Uploaded Photos Grid */}
              {rev.photos && rev.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {rev.photos.map((imgSrc, i) => (
                    <img
                      key={i}
                      src={imgSrc}
                      alt="Review snapshot"
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(imgSrc, '_blank')}
                    />
                  ))}
                </div>
              )}

              {/* Organizer Reply Card */}
              {rev.organizerReply && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1 pl-4 border-l-4 border-l-emerald-500">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-[11px]">
                    <CornerDownRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Response from {rev.organizerReply.author}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {rev.organizerReply.text}
                  </p>
                </div>
              )}

              {/* Organizer Reply Input box when open */}
              {activeReplyId === rev.id && (
                <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <span className="font-bold text-[11px] text-emerald-700 dark:text-emerald-300">
                    Reply as Trip Organizer
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyTextMap[rev.id] || ''}
                      onChange={(e) => setReplyTextMap({ ...replyTextMap, [rev.id]: e.target.value })}
                      placeholder="Write your professional response to this traveler..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                    />
                    <button
                      onClick={() => handleOrganizerReply(rev.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 font-semibold transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.likes || 0})</span>
                </button>

                <div className="flex items-center gap-2 text-[11px]">
                  {/* Reply button for Organizer */}
                  {isOrganizer && !rev.organizerReply && (
                    <button
                      onClick={() => setActiveReplyId(rev.id)}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                    >
                      Reply to Review
                    </button>
                  )}

                  {/* Edit / Delete if author */}
                  {rev.userId === 'usr-current' && (
                    <>
                      <button
                        onClick={() => handleEdit(rev)}
                        className="text-slate-500 hover:text-blue-500 flex items-center gap-0.5"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="text-slate-400 hover:text-rose-500 flex items-center gap-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </>
                  )}

                  {/* Admin Moderation controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => handleModerate(rev.id, 'approved')}
                        className="text-emerald-600 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleModerate(rev.id, 'flagged')}
                        className="text-amber-500 hover:underline"
                      >
                        Flag
                      </button>
                      <button
                        onClick={() => handleModerate(rev.id, 'deleted')}
                        className="text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
