import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * ProtectedRoute
 * Guards private pages (Dashboard, Booking, Profile, Organizer, Admin)
 * 
 * Usage:
 *   <Route path="profile" element={
 *     <ProtectedRoute allowedRoles={['traveler', 'organizer', 'admin']}>
 *       <Profile />
 *     </ProtectedRoute>
 *   } />
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Authenticating session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login preserving intended destination URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization if specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Access Restricted</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Your current account role ({user?.role}) does not have permission to view this section.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
