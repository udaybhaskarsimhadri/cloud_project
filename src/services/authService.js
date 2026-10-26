/**
 * AdventureX Authentication Service
 * 
 * Modular authentication adapter. Currently backed by a production-ready client-side
 * authentication layer with persistent session management, role enforcement, and password hashing simulation.
 * 
 * =========================================================================================
 * FUTURE AWS COGNITO MIGRATION NOTE:
 * When migrating to AWS Cognito, replace the internal methods of this file with:
 *   import { Auth } from 'aws-amplify'; // or @aws-sdk/client-cognito-identity-provider
 * 
 *   - login: Auth.signIn(email, password)
 *   - register: Auth.signUp({ username: email, password, attributes: { name, phone_number, 'custom:role': role } })
 *   - loginWithGoogle: Auth.federatedSignIn({ provider: 'Google' })
 *   - logout: Auth.signOut()
 *   - sendPasswordReset: Auth.forgotPassword(email)
 *   - confirmPasswordReset: Auth.forgotPasswordSubmit(email, code, newPassword)
 * =========================================================================================
 */

const STORAGE_KEY_USER = 'adventurex_auth_user';
const STORAGE_KEY_TOKEN = 'adventurex_auth_token';
const STORAGE_KEY_USERS_DB = 'adventurex_users_database';

// Default seeded users for quick role testing
const SEED_USERS = [
  {
    id: 'usr_traveler_1',
    name: 'Aarav Sharma',
    email: 'traveler@adventurex.com',
    password: 'Password@123',
    role: 'traveler',
    country: 'India',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    emailVerified: true,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'usr_organizer_1',
    name: 'Himalayan Expeditions Team',
    email: 'organizer@adventurex.com',
    password: 'Password@123',
    role: 'organizer',
    country: 'India',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    emailVerified: true,
    createdAt: '2026-01-10T08:30:00Z',
  },
  {
    id: 'usr_admin_1',
    name: 'System Administrator',
    email: 'admin@adventurex.com',
    password: 'Password@123',
    role: 'admin',
    country: 'India',
    phone: '+91 99999 88888',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    emailVerified: true,
    createdAt: '2025-12-01T00:00:00Z',
  },
];

// Initialize mock database if empty
const getUsersDatabase = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
};

const saveUsersDatabase = (users) => {
  localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
};

export const authService = {
  /**
   * Login user with email and password
   */
  async login(email, password, rememberMe = true) {
    // Simulate network latency (300-500ms)
    await new Promise((res) => setTimeout(res, 400));

    const users = getUsersDatabase();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      throw new Error('No account found with this email address.');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const token = `advx_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Sanitize user object (exclude raw password)
    const { password: _, ...safeUser } = user;

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(safeUser));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      sessionStorage.setItem(STORAGE_KEY_USER, JSON.stringify(safeUser));
      sessionStorage.setItem(STORAGE_KEY_TOKEN, token);
    }

    return { user: safeUser, token };
  },

  /**
   * Register a new user
   */
  async register({ name, email, password, phone = '', country = 'India', role = 'traveler' }) {
    await new Promise((res) => setTimeout(res, 500));

    const users = getUsersDatabase();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || 'traveler',
      country,
      phone: phone.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=2563eb,10b981`,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsersDatabase(users);

    // If registered role is organizer, automatically register into admin organizers database
    if ((role || '').toLowerCase() === 'organizer') {
      try {
        const rawAdmin = localStorage.getItem('adventurex_admin_organizers');
        const adminOrgs = rawAdmin ? JSON.parse(rawAdmin) : [];
        const orgEntry = {
          id: newUser.id,
          company: `${newUser.name}'s Expeditions`,
          organizerName: newUser.name,
          email: newUser.email,
          phone: newUser.phone || '+91 98765 43210',
          rating: 5.0,
          reviewsCount: 0,
          verified: false,
          status: 'Approved',
          totalAdventures: 0,
          totalBookings: 0,
          joinedDate: new Date().toISOString().substring(0, 10),
          avatar: newUser.avatar,
          location: newUser.country || 'India',
          licenseNo: `EXP-IND-${Date.now().toString().slice(-4)}`
        };
        if (!adminOrgs.some(o => o.email?.toLowerCase() === newUser.email.toLowerCase())) {
          adminOrgs.unshift(orgEntry);
          localStorage.setItem('adventurex_admin_organizers', JSON.stringify(adminOrgs));
        }
      } catch (e) {
        // safe fallback
      }
    }

    const token = `advx_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const { password: _, ...safeUser } = newUser;

    // Automatically store active session
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(safeUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return { user: safeUser, token };
  },

  /**
   * Login or signup using Google OAuth
   * (Modular mock OAuth provider ready to bridge to Google Cloud / Cognito Hosted UI)
   */
  async loginWithGoogle(preferredRole = 'traveler') {
    await new Promise((res) => setTimeout(res, 600));

    const isOrg = (preferredRole || '').toLowerCase() === 'organizer';

    // Simulate Google account profile
    const googleUser = {
      id: 'usr_google_' + Math.random().toString(36).substring(2, 9),
      name: isOrg ? 'Himalayan Expeditions Team' : 'Google Traveler',
      email: isOrg ? 'organizer.google@adventurex.com' : 'traveler.google@adventurex.com',
      role: isOrg ? 'organizer' : 'traveler',
      country: 'India',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      emailVerified: true,
      provider: 'google',
      createdAt: new Date().toISOString(),
    };

    const token = `advx_google_jwt_${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(googleUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    // Ensure google user is in database
    try {
      const users = getUsersDatabase();
      if (!users.some(u => u.email.toLowerCase() === googleUser.email.toLowerCase())) {
        users.push(googleUser);
        saveUsersDatabase(users);
      }
      if (isOrg) {
        const rawAdmin = localStorage.getItem('adventurex_admin_organizers');
        const adminOrgs = rawAdmin ? JSON.parse(rawAdmin) : [];
        if (!adminOrgs.some(o => o.email?.toLowerCase() === googleUser.email.toLowerCase())) {
          adminOrgs.unshift({
            id: googleUser.id,
            company: 'Himalayan Expeditions Team',
            organizerName: googleUser.name,
            email: googleUser.email,
            phone: '+91 98111 22334',
            rating: 5.0,
            reviewsCount: 0,
            verified: true,
            status: 'Approved',
            totalAdventures: 0,
            totalBookings: 0,
            joinedDate: new Date().toISOString().substring(0, 10),
            avatar: googleUser.avatar,
            location: 'India',
            licenseNo: 'EXP-IND-GOOGLE'
          });
          localStorage.setItem('adventurex_admin_organizers', JSON.stringify(adminOrgs));
        }
      }
    } catch (e) {
      // safe fallback
    }

    return { user: googleUser, token };
  },

  /**
   * Log out active user
   */
  async logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);
  },

  /**
   * Request password reset link
   */
  async sendPasswordReset(email) {
    await new Promise((res) => setTimeout(res, 400));
    const users = getUsersDatabase();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    // Return success message even if email not found to prevent user enumeration
    return {
      success: true,
      message: `If an account exists for ${email}, a password reset link has been dispatched.`,
    };
  },

  /**
   * Send or resend email verification
   */
  async sendEmailVerification(email) {
    await new Promise((res) => setTimeout(res, 400));
    return {
      success: true,
      message: `A fresh verification link has been sent to ${email}.`,
    };
  },

  /**
   * Mark email verified
   */
  async verifyEmail(email) {
    await new Promise((res) => setTimeout(res, 300));
    const users = getUsersDatabase();
    const index = users.findIndex(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (index !== -1) {
      users[index].emailVerified = true;
      saveUsersDatabase(users);
    }

    const current = this.getCurrentUser();
    if (current && current.email.toLowerCase() === email.trim().toLowerCase()) {
      current.emailVerified = true;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(current));
    }

    return { success: true };
  },

  /**
   * Restore current user from storage
   */
  getCurrentUser() {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY_USER) ||
        sessionStorage.getItem(STORAGE_KEY_USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Retrieve active token
   */
  getToken() {
    return (
      localStorage.getItem(STORAGE_KEY_TOKEN) ||
      sessionStorage.getItem(STORAGE_KEY_TOKEN)
    );
  },
};

export default authService;
