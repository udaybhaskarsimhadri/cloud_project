import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { auditLogger, AUDIT_ACTIONS } from '../utils/auditLogger';

/**
 * RoleRoute enforces role-based access control:
 * - Traveler cannot access organizer routes -> redirects to /dashboard
 * - Organizer cannot access traveler dashboard routes -> redirects to /organizer
 * - Unauthenticated user -> redirects to /login
 */
const RoleRoute = ({ allowedRole, children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const userRole = (user?.role || 'traveler').toLowerCase();
  const isAuthorized = isAuthenticated && user && (
    userRole === 'admin' ||
    (allowedRole === 'admin' && userRole === 'admin') ||
    (allowedRole === 'organizer' && userRole === 'organizer') ||
    (allowedRole === 'traveler' && userRole === 'traveler')
  );

  useEffect(() => {
    if (!loading && isAuthenticated && !isAuthorized) {
      auditLogger.logEvent(
        AUDIT_ACTIONS.SECURITY_VIOLATION,
        {
          attemptedRole: allowedRole,
          currentRole: userRole,
          routePath: location.pathname
        },
        user
      );
    }
  }, [loading, isAuthenticated, isAuthorized, allowedRole, userRole, location.pathname, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="md" text="Verifying permissions..." />
      </div>
    );
  }

  // If not authenticated, redirect to /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin access control
  if (allowedRole === 'admin' && userRole !== 'admin') {
    return <Navigate to={userRole === 'organizer' ? '/organizer' : '/dashboard'} replace />;
  }

  // Organizer access control
  if (allowedRole === 'organizer' && userRole !== 'organizer') {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  // Traveler access control
  if (allowedRole === 'traveler' && userRole !== 'traveler') {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/organizer'} replace />;
  }

  return children;
};

export default RoleRoute;
