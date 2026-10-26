import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hydrate user session on initial load and refresh
  useEffect(() => {
    try {
      const storedUser = authService.getCurrentUser();
      const storedToken = authService.getToken();

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (err) {
      console.error('Failed to restore session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(email, password, rememberMe);
      setUser(res.user);
      setToken(res.token);
      return res.user;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(userData);
      setUser(res.user);
      setToken(res.token);
      return res.user;
    } catch (err) {
      setError(err.message || 'Failed to register account');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (preferredRole = 'traveler') => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.loginWithGoogle(preferredRole);
      setUser(res.user);
      setToken(res.token);
      return res.user;
    } catch (err) {
      setError(err.message || 'Failed to authenticate with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.sendPasswordReset(email);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (email) => {
    setError(null);
    try {
      return await authService.sendEmailVerification(email);
    } catch (err) {
      setError(err.message || 'Failed to send verification email');
      throw err;
    }
  };

  const verifyEmailNow = async (email) => {
    try {
      await authService.verifyEmail(email);
      if (user && user.email.toLowerCase() === email.toLowerCase()) {
        setUser({ ...user, emailVerified: true });
      }
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to verify email');
      throw err;
    }
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    forgotPassword,
    resendVerification,
    verifyEmailNow,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
