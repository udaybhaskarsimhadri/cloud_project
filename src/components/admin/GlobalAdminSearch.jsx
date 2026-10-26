import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Mountain, Building2, TicketCheck, ArrowRight, X } from 'lucide-react';

const GlobalAdminSearch = ({ users = [], organizers = [], adventures = [], bookings = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase().trim();

    const matchedUsers = users.filter(
      u => u.name?.toLowerCase().includes(term) || u.email?.toLowerCase().includes(term)
    ).slice(0, 3);

    const matchedOrganizers = organizers.filter(
      o => o.company?.toLowerCase().includes(term) || o.organizerName?.toLowerCase().includes(term)
    ).slice(0, 3);

    const matchedAdventures = adventures.filter(
      a => a.title?.toLowerCase().includes(term) || a.destination?.toLowerCase().includes(term)
    ).slice(0, 3);

    const matchedBookings = bookings.filter(
      b => b.id?.toLowerCase().includes(term) || b.travelerName?.toLowerCase().includes(term)
    ).slice(0, 3);

    const total = matchedUsers.length + matchedOrganizers.length + matchedAdventures.length + matchedBookings.length;

    return {
      users: matchedUsers,
      organizers: matchedOrganizers,
      adventures: matchedAdventures,
      bookings: matchedBookings,
      total
    };
  }, [searchTerm, users, organizers, adventures, bookings]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Global search across users, adventures, organizers, and bookings..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 shadow-sm transition-all"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {focused && results && (
        <div 
          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
          onMouseDown={(e) => e.preventDefault()} // prevent input blur before clicking link
        >
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Search Results ({results.total} found)</span>
            <span className="text-[10px] text-purple-600 dark:text-purple-400">Esc to dismiss</span>
          </div>

          {results.total === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching records found for "{searchTerm}"
            </div>
          ) : (
            <div className="p-2 space-y-3">
              {/* Users */}
              {results.users.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
                    Users
                  </span>
                  {results.users.map(u => (
                    <Link
                      key={u.id}
                      to="/admin/users"
                      onClick={() => setFocused(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{u.name}</p>
                          <p className="text-[10px] text-slate-500">{u.email} • {u.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">View</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Organizers */}
              {results.organizers.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
                    Organizers
                  </span>
                  {results.organizers.map(o => (
                    <Link
                      key={o.id}
                      to="/admin/organizers"
                      onClick={() => setFocused(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{o.company}</p>
                          <p className="text-[10px] text-slate-500">{o.organizerName} • {o.status}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">View</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Adventures */}
              {results.adventures.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
                    Adventures
                  </span>
                  {results.adventures.map(a => (
                    <Link
                      key={a.id}
                      to="/admin/adventures"
                      onClick={() => setFocused(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Mountain className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                          <p className="text-[10px] text-slate-500">{a.destination} • ₹{a.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">View</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Bookings */}
              {results.bookings.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-1">
                    Bookings
                  </span>
                  {results.bookings.map(b => (
                    <Link
                      key={b.id}
                      to="/admin/bookings"
                      onClick={() => setFocused(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <TicketCheck className="w-4 h-4 text-cyan-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{b.id}</p>
                          <p className="text-[10px] text-slate-500">{b.travelerName} • ₹{b.amount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">View</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalAdminSearch;
