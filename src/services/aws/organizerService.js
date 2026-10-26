// Future: Amazon DynamoDB, Amazon S3 & Amazon CloudFront
// Handles organizer partner portal, tour creation, booking rosters, and revenue calculation.

import { organizerService as localOrganizerService } from '../organizerService';
import { logger } from '../../utils/logger';

export const organizerService = {
  // Future: DynamoDB Query on 'AdventureX_Adventures_Prod' by organizerId
  async getOrganizerStats() {
    logger.info('DynamoDB', 'Calculating aggregate partner analytics from cloud records');
    try {
      const stats = localOrganizerService.getStats();
      return {
        success: true,
        data: stats
      };
    } catch (err) {
      return { success: false, data: null, error: err.message };
    }
  },

  async getAdventures() {
    try {
      const data = localOrganizerService.getAdventures();
      return {
        success: true,
        data,
        total: data.length
      };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async createAdventure(advData) {
    logger.info('DynamoDB', `Creating new adventure: "${advData.name}"`);
    try {
      const created = localOrganizerService.createAdventure(advData);
      return {
        success: true,
        data: created
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateAdventure(id, advData) {
    logger.info('DynamoDB', `Updating adventure ID: ${id}`);
    try {
      const updated = localOrganizerService.updateAdventure(id, advData);
      return {
        success: true,
        data: updated
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async deleteAdventure(id) {
    logger.info('DynamoDB', `Deleting adventure ID: ${id}`);
    try {
      const result = localOrganizerService.deleteAdventure(id);
      return {
        success: true,
        data: result
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async getBookings() {
    try {
      const bookings = localOrganizerService.getBookings();
      return {
        success: true,
        data: bookings
      };
    } catch (err) {
      return { success: false, data: [], error: err.message };
    }
  },

  async getRevenueData() {
    try {
      const revenue = localOrganizerService.getRevenueData();
      return {
        success: true,
        data: revenue
      };
    } catch (err) {
      return { success: false, data: null, error: err.message };
    }
  }
};

export default organizerService;
