import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import RoleRoute from './RoleRoute';

// Core Public Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/Home'));
const Destinations = lazy(() => import('../pages/Destinations'));
const DestinationDetails = lazy(() => import('../pages/DestinationDetails'));
const AdventureDetails = lazy(() => import('../pages/AdventureDetails'));
const Booking = lazy(() => import('../pages/Booking'));
const BookingSuccess = lazy(() => import('../pages/BookingSuccess'));
const MyBookings = lazy(() => import('../pages/MyBookings'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const CommunityPage = lazy(() => import('../pages/CommunityPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Auth Pages (Part 2 - Lazy Loaded)
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const EmailVerification = lazy(() => import('../pages/EmailVerification'));

// User Dashboard Pages (Part 7 - Lazy Loaded)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Notifications = lazy(() => import('../pages/Notifications'));

// Organizer Dashboard Pages (Part 8 - Lazy Loaded)
const OrganizerDashboard = lazy(() => import('../pages/organizer/OrganizerDashboard'));
const OrganizerAdventures = lazy(() => import('../pages/organizer/OrganizerAdventures'));
const OrganizerBookings = lazy(() => import('../pages/organizer/OrganizerBookings'));
const OrganizerCalendarPage = lazy(() => import('../pages/organizer/OrganizerCalendarPage'));
const OrganizerRevenuePage = lazy(() => import('../pages/organizer/OrganizerRevenuePage'));
const OrganizerReviewsPage = lazy(() => import('../pages/organizer/OrganizerReviewsPage'));
const OrganizerProfilePage = lazy(() => import('../pages/organizer/OrganizerProfilePage'));

// Super Admin Dashboard Pages (Part 9 - Lazy Loaded)
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminOrganizersPage = lazy(() => import('../pages/admin/AdminOrganizersPage'));
const AdminAdventuresPage = lazy(() => import('../pages/admin/AdminAdventuresPage'));
const AdminBookingsPage = lazy(() => import('../pages/admin/AdminBookingsPage'));
const AdminPaymentsPage = lazy(() => import('../pages/admin/AdminPaymentsPage'));
const AdminReviewsPage = lazy(() => import('../pages/admin/AdminReviewsPage'));
const AdminReportsPage = lazy(() => import('../pages/admin/AdminReportsPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Preparing Expedition..." />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public core pages */}
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destination/:id" element={<DestinationDetails />} />
          <Route path="destinations/:id" element={<DestinationDetails />} />
          <Route path="adventure/:id" element={<AdventureDetails />} />
          <Route path="adventures/:id" element={<AdventureDetails />} />
          <Route path="community" element={<CommunityPage />} />
          
          {/* Booking System Routes (Part 6) */}
          <Route path="booking/:adventureId" element={<Booking />} />
          <Route path="booking/success" element={<BookingSuccess />} />
          <Route path="my-bookings" element={
            <RoleRoute allowedRole="traveler">
              <MyBookings />
            </RoleRoute>
          } />

          {/* User Dashboard Routes (Part 7) */}
          <Route path="dashboard" element={
            <RoleRoute allowedRole="traveler">
              <Dashboard />
            </RoleRoute>
          } />
          <Route path="profile" element={
            <RoleRoute allowedRole="traveler">
              <Profile />
            </RoleRoute>
          } />
          <Route path="settings" element={
            <RoleRoute allowedRole="traveler">
              <Settings />
            </RoleRoute>
          } />
          <Route path="wishlist" element={
            <RoleRoute allowedRole="traveler">
              <Wishlist />
            </RoleRoute>
          } />
          <Route path="notifications" element={
            <RoleRoute allowedRole="traveler">
              <Notifications />
            </RoleRoute>
          } />

          {/* Organizer Dashboard Routes (Part 8) */}
          <Route path="organizer" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerDashboard />
            </RoleRoute>
          } />
          <Route path="organizer/adventures" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerAdventures />
            </RoleRoute>
          } />
          <Route path="organizer/bookings" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerBookings />
            </RoleRoute>
          } />
          <Route path="organizer/calendar" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerCalendarPage />
            </RoleRoute>
          } />
          <Route path="organizer/revenue" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerRevenuePage />
            </RoleRoute>
          } />
          <Route path="organizer/reviews" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerReviewsPage />
            </RoleRoute>
          } />
          <Route path="organizer/profile" element={
            <RoleRoute allowedRole="organizer">
              <OrganizerProfilePage />
            </RoleRoute>
          } />

          {/* Super Admin Dashboard Routes (Part 9) */}
          <Route path="admin" element={
            <RoleRoute allowedRole="admin">
              <AdminDashboard />
            </RoleRoute>
          } />
          <Route path="admin/users" element={
            <RoleRoute allowedRole="admin">
              <AdminUsersPage />
            </RoleRoute>
          } />
          <Route path="admin/organizers" element={
            <RoleRoute allowedRole="admin">
              <AdminOrganizersPage />
            </RoleRoute>
          } />
          <Route path="admin/adventures" element={
            <RoleRoute allowedRole="admin">
              <AdminAdventuresPage />
            </RoleRoute>
          } />
          <Route path="admin/bookings" element={
            <RoleRoute allowedRole="admin">
              <AdminBookingsPage />
            </RoleRoute>
          } />
          <Route path="admin/payments" element={
            <RoleRoute allowedRole="admin">
              <AdminPaymentsPage />
            </RoleRoute>
          } />
          <Route path="admin/reviews" element={
            <RoleRoute allowedRole="admin">
              <AdminReviewsPage />
            </RoleRoute>
          } />
          <Route path="admin/reports" element={
            <RoleRoute allowedRole="admin">
              <AdminReportsPage />
            </RoleRoute>
          } />
          <Route path="admin/settings" element={
            <RoleRoute allowedRole="admin">
              <AdminSettingsPage />
            </RoleRoute>
          } />

          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Authentication routes (Part 2) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="email-verification" element={<EmailVerification />} />

          {/* 404 handler */}
          <Route path="not-found" element={<NotFound />} />

          {/* Unknown routes redirect to /not-found */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
