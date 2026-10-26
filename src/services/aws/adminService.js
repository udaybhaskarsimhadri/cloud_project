// Future: Amazon API Gateway, Amazon DynamoDB & AWS Lambda (Super Admin Domain)
// Centralized Super Admin operations with role-based execution and audit trails.

import { adminService as localAdminService } from '../adminService';
import { logger } from '../../utils/logger';

export const adminService = {
  // Future: DynamoDB aggregate queries & CloudWatch Metrics
  async getAdminStats() {
    logger.info('CloudWatch', 'Pulling platform health and operational metrics');
    try {
      const stats = localAdminService.getStats();
      return {
        success: true,
        data: stats
      };
    } catch (err) {
      return { success: false, data: null, error: err.message };
    }
  },

  async getUsers() {
    try {
      const users = localAdminService.getUsers();
      return {
        success: true,
        data: users
      };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async updateUserStatus(id, status) {
    logger.info('Cognito', `Admin updating user ${id} status to ${status}`);
    try {
      const updated = localAdminService.updateUserStatus(id, status);
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async deleteUser(id) {
    logger.info('Cognito', `Admin deleting user ${id}`);
    try {
      const updated = localAdminService.deleteUser(id);
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getOrganizers() {
    try {
      const organizers = localAdminService.getOrganizers();
      return {
        success: true,
        data: organizers
      };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async updateOrganizerStatus(id, status) {
    logger.info('DynamoDB', `Admin moderating organizer ${id} to ${status}`);
    try {
      const updated = localAdminService.updateOrganizerStatus(id, status);
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getAdventures() {
    try {
      const adventures = localAdminService.getAdventures();
      return { success: true, data: adventures };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async updateAdventureStatus(id, status) {
    try {
      const updated = localAdminService.updateAdventureStatus(id, status);
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getBookings() {
    try {
      const bookings = localAdminService.getBookings();
      return { success: true, data: bookings };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async updateBookingStatus(id, status) {
    try {
      const updated = localAdminService.updateBookingStatus(id, status);
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

export default adminService;
