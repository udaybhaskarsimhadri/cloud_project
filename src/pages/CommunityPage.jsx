import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Send, 
  Image, 
  Upload, 
  X, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Filter, 
  Search, 
  Star, 
  Award, 
  Gift, 
  ShieldCheck, 
  Edit3, 
  Trash2, 
  Check, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { communityService } from '../services/communityService';
import { useAuth } from '../context/AuthContext';
import ReviewSystem from '../components/community/ReviewSystem';
import FollowSystem from '../components/community/FollowSystem';
import WishlistManager from '../components/community/WishlistManager';
import NotificationCenter from '../components/community/NotificationCenter';
import LoyaltyDashboard from '../components/community/LoyaltyDashboard';
import ReferralSystem from '../components/community/ReferralSystem';
import BadgeSystem from '../components/community/BadgeSystem';
import ActivityFeed from '../components/community/ActivityFeed';
import SocialShare from '../components/community/SocialShare';

const CATEGORIES = ['All', 'Trekking', 'River Rafting', 'Safety & Trail Advisory', 'Camping', 'Photography'];

const CommunityPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Navigation tab state
  const [activeMainTab, setActiveMainTab] = useState('discussions'); // 'discussions' | 'reviews' | 'loyalty' | 'referrals' | 'events' | 'feed'
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' | 'trending'
  const [searchQuery, setSearchQuery] = useState('');

  // Posts state
  const [posts, setPosts] = useState(() => communityService.getPosts('All'));
  const [events, setEvents] = useState(() => communityService.getEvents());

  // Create post modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Trekking');
  const [postLocation, setPostLocation] = useState('Himachal Pradesh');
  const [postAdventureTag, setPostAdventureTag] = useState('');
  const [postImages, setPostImages] = useState([]);

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState({});
  const [openCommentsId, setOpenCommentsId] = useState(null);

  // Photo uploader for post
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.slice(0, 3).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPostImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePostImage = (idx) => {
    setPostImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Create or Update post
  const handleSavePost = (e) => {
    e?.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    if (editingPost) {
      const updated = communityService.updatePost(editingPost.id, {
        title: postTitle,
        content: postContent,
        category: postCategory,
        location: postLocation,
        images: postImages
      });
      setPosts(updated);
      setEditingPost(null);
    } else {
      const updated = communityService.createPost({
        title: postTitle,
        content: postContent,
        category: postCategory,
        location: postLocation,
        adventureTag: postAdventureTag,
        images: postImages
      });
      setPosts(updated);
    }

    setPostTitle('');
    setPostContent('');
    setPostImages([]);
    setShowCreateModal(false);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Delete this community post?')) {
      const updated = communityService.deletePost(postId);
      setPosts(updated);
    }
  };

  const handleEditPost = (p) => {
    setEditingPost(p);
    setPostTitle(p.title);
    setPostContent(p.content);
    setPostCategory(p.category || 'Trekking');
    setPostLocation(p.location || 'Himachal Pradesh');
    setPostImages(p.images || []);
    setShowCreateModal(true);
  };

  const handleLikePost = (postId) => {
    const updated = communityService.toggleLikePost(postId);
    setPosts(updated);
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const updated = communityService.addComment(postId, text);
    setPosts(updated);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleFeaturePost = (postId, currentFeatured) => {
    const updated = communityService.featurePost(postId, !currentFeatured);
    setPosts(updated);
  };

  // Filter & Search logic
  let visiblePosts = posts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.content?.toLowerCase().includes(q) ||
      p.author?.name?.toLowerCase().includes(q) ||
      p.location?.toLowerCase().includes(q) ||
      p.adventureTag?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  if (sortOrder === 'trending') {
    visiblePosts = [...visiblePosts].sort((a, b) => (b.likes || 0) + (b.commentsCount || 0) - ((a.likes || 0) + (a.commentsCount || 0)));
  } else {
    visiblePosts = [...visiblePosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors pb-24">
      {/* ======================================================== */}
      {/* 1. HERO BANNER & SEARCH                                  */}
      {/* ======================================================== */}
      <section className="relative isolate pt-14 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=2000&q=80"
            alt="Adventure Camp Community"
            className="w-full h-full object-cover scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AdventureX Global Community & Engagement Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Connect, Share & Explore Together
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto">
            Exchange genuine trail stories, get advice from certified mountain guides, earn badges, and join upcoming wilderness meetups.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions, verified reviews, guides, or destinations..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. MAIN NAVIGATION TABS                                   */}
      {/* ======================================================== */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 gap-2">
          <div className="flex items-center gap-1 text-xs font-bold">
            {[
              { id: 'discussions', label: 'Discussions & Stories', icon: MessageSquare },
              { id: 'reviews', label: 'Verified Reviews', icon: Star },
              { id: 'loyalty', label: 'Adventure Points', icon: Award },
              { id: 'referrals', label: 'Referrals (₹500)', icon: Gift },
              { id: 'events', label: 'Events & Meetups', icon: Calendar },
              { id: 'feed', label: 'Followers & Live Feed', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeMainTab === 'discussions' && (
            <button
              onClick={() => {
                setEditingPost(null);
                setPostTitle('');
                setPostContent('');
                setPostImages([]);
                setShowCreateModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Story</span>
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. TAB CONTENT VIEWS                                     */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: DISCUSSIONS & COMMUNITY POSTS */}
        {activeMainTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Posts Feed */}
            <div className="lg:col-span-8 space-y-6">
              {/* Filter & Sort Bar */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sort Order Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-slate-400 font-bold">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none font-bold"
                  >
                    <option value="latest">Latest Stories</option>
                    <option value="trending">Trending & Popular</option>
                  </select>
                </div>
              </div>

              {/* Posts Stream */}
              <div className="space-y-6">
                {visiblePosts.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                    No community posts found matching this search or category filter.
                  </div>
                ) : (
                  visiblePosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                {post.author.name}
                              </h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                {post.author.badge}
                              </span>
                              {post.isFeatured && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                              <span>{post.location}</span>
                              <span>•</span>
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                              {post.category && (
                                <>
                                  <span>•</span>
                                  <span className="font-semibold text-slate-500">{post.category}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Admin or Author Controls */}
                        <div className="flex items-center gap-2 text-xs">
                          {isAdmin && (
                            <button
                              onClick={() => handleFeaturePost(post.id, post.isFeatured)}
                              className="text-[11px] font-bold text-amber-500 hover:underline"
                            >
                              {post.isFeatured ? 'Unfeature' : 'Feature'}
                            </button>
                          )}
                          {post.author.id === 'usr-current' && (
                            <>
                              <button
                                onClick={() => handleEditPost(post)}
                                className="text-slate-400 hover:text-blue-500"
                                title="Edit Post"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="text-slate-400 hover:text-rose-500"
                                title="Delete Post"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Post Title & Content */}
                      <div className="space-y-2">
                        <h3 className="font-black text-base text-slate-900 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>
                      </div>

                      {/* Photo Gallery Grid */}
                      {post.images && post.images.length > 0 && (
                        <div className={`grid gap-2 rounded-2xl overflow-hidden ${
                          post.images.length === 1 ? 'grid-cols-1 max-h-80' : 'grid-cols-2 max-h-72'
                        }`}>
                          {post.images.map((imgSrc, i) => (
                            <img
                              key={i}
                              src={imgSrc}
                              alt="Expedition moment"
                              className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
                              onClick={() => window.open(imgSrc, '_blank')}
                            />
                          ))}
                        </div>
                      )}

                      {/* Tagged Adventure Link */}
                      {post.adventureTag && (
                        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Expedition Mentioned: <strong className="text-slate-800 dark:text-slate-200">{post.adventureTag}</strong>
                          </span>
                          {post.adventureId && (
                            <Link
                              to={`/adventure/${post.adventureId}`}
                              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                            >
                              <span>View Trail</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Post Actions: Like, Comment count, Share */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1.5 font-bold transition-colors ${
                              post.likedBy?.includes('usr-current')
                                ? 'text-rose-500'
                                : 'text-slate-500 hover:text-rose-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${post.likedBy?.includes('usr-current') ? 'fill-current' : ''}`} />
                            <span>{post.likes || 0} Likes</span>
                          </button>

                          <button
                            onClick={() => setOpenCommentsId(openCommentsId === post.id ? null : post.id)}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 font-bold transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments?.length || post.commentsCount || 0} Comments</span>
                          </button>
                        </div>

                        <SocialShare
                          title={post.title}
                          description={post.content.slice(0, 100)}
                        />
                      </div>

                      {/* Comments Collapsible Thread */}
                      {openCommentsId === post.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3"
                        >
                          {/* Comments List */}
                          <div className="space-y-2">
                            {post.comments?.map((c) => (
                              <div
                                key={c.id}
                                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={c.author.avatar}
                                    alt={c.author.name}
                                    className="w-5 h-5 rounded-full object-cover"
                                  />
                                  <span className="font-bold text-slate-900 dark:text-white">
                                    {c.author.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 ml-auto">
                                    {new Date(c.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 pl-7">
                                  {c.text}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Add Comment Input */}
                          <div className="flex gap-2 items-center pt-1">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                              }
                              placeholder="Write a helpful response or ask about the trail..."
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right 4 Cols: Activity Feed & Badges Side Widget */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ActivityFeed />
              </div>

              {/* Ambassador / Referral Mini Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-900 to-emerald-950 text-white shadow-md space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Gift className="w-4 h-4" />
                  <span>Refer & Earn</span>
                </div>
                <h4 className="font-black text-sm">
                  Earn ₹500 in Adventure Points for every invited friend!
                </h4>
                <p className="text-[11px] text-slate-300">
                  Share your code <code>ADVX-AARAV26</code>. When they take their first high-altitude step, points deposit instantly.
                </p>
                <button
                  onClick={() => setActiveMainTab('referrals')}
                  className="w-full py-2 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  View Referral Portal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFIED REVIEWS */}
        {activeMainTab === 'reviews' && (
          <div className="space-y-6">
            <ReviewSystem />
          </div>
        )}

        {/* TAB 3: ADVENTURE POINTS LOYALTY & BADGES */}
        {activeMainTab === 'loyalty' && (
          <div className="space-y-8">
            <LoyaltyDashboard />
            <BadgeSystem />
          </div>
        )}

        {/* TAB 4: REFERRAL SYSTEM */}
        {activeMainTab === 'referrals' && (
          <div className="space-y-6">
            <ReferralSystem />
          </div>
        )}

        {/* TAB 5: EVENTS, MEETUPS & WEBINARS */}
        {activeMainTab === 'events' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  Upcoming Adventure Events & Workshops
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Join certified mountaineering clinics, dark sky photography meetups, and rescue workshops.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 rounded-2xl overflow-hidden">
                      <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                        {evt.category}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {evt.date}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400 font-medium">Host: {evt.host}</span>
                      <span className="text-rose-500 font-bold">{evt.seatsLeft} spots left</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-black text-sm text-slate-900 dark:text-white">
                      {evt.price === 0 ? 'Free Entry' : `₹${evt.price.toLocaleString('en-IN')}`}
                    </span>
                    <button
                      onClick={() => alert(`Registered for ${evt.title}! Confirmation sent to your email.`)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FOLLOWERS & LIVE PULSE FEED */}
        {activeMainTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <FollowSystem />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ActivityFeed />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* 4. CREATE / EDIT POST MODAL                              */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {editingPost ? 'Edit Community Story' : 'Share Your Adventure Story'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. Crossing Hampta Pass at Sunrise: What to Expect"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                      Category
                    </label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                      Location / Mountain Range
                    </label>
                    <input
                      type="text"
                      value={postLocation}
                      onChange={(e) => setPostLocation(e.target.value)}
                      placeholder="e.g. Spiti Valley, HP"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Tagged Expedition Package (Optional)
                  </label>
                  <input
                    type="text"
                    value={postAdventureTag}
                    onChange={(e) => setPostAdventureTag(e.target.value)}
                    placeholder="e.g. Hampta Pass Cross-Valley Trek"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Your Experience & Tips
                  </label>
                  <textarea
                    rows={5}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Describe the trail, acclimatization tips, river crossings, campsite moments..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                  />
                </div>

                {/* Upload Photos */}
                <div>
                  <label className="block font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Attach Trip Photos (Up to 3)
                  </label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {postImages.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={img} alt="Post preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePostImage(i)}
                          className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    {postImages.length < 3 && (
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

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                  >
                    {editingPost ? 'Update Post' : 'Publish Story (+50 Pts)'}
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

export default CommunityPage;
