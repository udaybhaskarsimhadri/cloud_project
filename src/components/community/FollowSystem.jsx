import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  ShieldCheck, 
  Compass, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { communityService } from '../../services/communityService';

const ORGANIZERS_DIRECTORY = [
  {
    id: 'org-vikram',
    name: 'Vikramaditya Rathore',
    company: 'Himalayan Ridge Expeditions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    trips: 420,
    rating: 4.95,
    specialty: 'High Altitude Passes (14,000+ ft)'
  },
  {
    id: 'org-ganga',
    name: 'Ganga White Water Collective',
    company: 'Rishikesh River Masters',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    trips: 280,
    rating: 4.9,
    specialty: 'Grade IV Rapids & Cliff Camps'
  },
  {
    id: 'org-ladakh',
    name: 'Zanskar Frozen Trails',
    company: 'Ladakh High Expeditions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    trips: 190,
    rating: 4.98,
    specialty: 'Chadar & Sub-Zero Trekking'
  }
];

const TRAVELERS_DIRECTORY = [
  {
    id: 'usr-1',
    name: 'Rohan Mehra',
    badge: 'Mountain Explorer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    tripsCompleted: 8,
    followersCount: 142
  },
  {
    id: 'usr-2',
    name: 'Aditi Deshmukh',
    badge: 'Rafting Veteran',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    tripsCompleted: 6,
    followersCount: 98
  },
  {
    id: 'usr-3',
    name: 'Pooja Hegde',
    badge: 'Camping Expert',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    tripsCompleted: 11,
    followersCount: 230
  }
];

const FollowSystem = () => {
  const [follows, setFollows] = useState(() => communityService.getFollows());
  const [activeTab, setActiveTab] = useState('organizers'); // 'organizers' | 'travelers' | 'followers'

  const handleToggleOrg = (orgId) => {
    const updated = communityService.toggleFollowOrganizer(orgId);
    setFollows(updated);
  };

  const handleToggleTraveler = (travelerId) => {
    const updated = communityService.toggleFollowTraveler(travelerId);
    setFollows(updated);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Header Tabs */}
      <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold max-w-md">
        <button
          onClick={() => setActiveTab('organizers')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'organizers'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Organizers ({follows.followingOrganizers?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('travelers')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'travelers'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Travelers ({follows.followingTravelers?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('followers')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'followers'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Followers ({follows.followers?.length || 0})
        </button>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Organizers Tab */}
        {activeTab === 'organizers' &&
          ORGANIZERS_DIRECTORY.map((org) => {
            const isFollowing = follows.followingOrganizers?.includes(org.id);
            return (
              <div
                key={org.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={org.avatar}
                    alt={org.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {org.name}
                    </h4>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                      {org.company}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{org.trips} Trips</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{org.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {org.specialty}
                  </span>
                  <button
                    onClick={() => handleToggleOrg(org.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isFollowing
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

        {/* 2. Travelers Tab */}
        {activeTab === 'travelers' &&
          TRAVELERS_DIRECTORY.map((trav) => {
            const isFollowing = follows.followingTravelers?.includes(trav.id);
            return (
              <div
                key={trav.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={trav.avatar}
                    alt={trav.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {trav.name}
                    </h4>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold mt-0.5">
                      {trav.badge}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {trav.tripsCompleted} Expeditions • {trav.followersCount} Followers
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleToggleTraveler(trav.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isFollowing
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

        {/* 3. Followers Tab */}
        {activeTab === 'followers' &&
          follows.followers?.map((f) => (
            <div
              key={f.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {f.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">{f.badge}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Follows You
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowSystem;
