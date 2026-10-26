// Future: Amazon DynamoDB, AWS Lambda & Amazon EventBridge
// Handles expedition batch reservations, seat locks, cancellations, and promo logic.

import { bookingService as localBookingService } from '../bookingService';
import { logger } from '../../utils/logger';

export const bookingService = {
  // Future: DynamoDB Scan or Query on 'AdventureX_Bookings_Prod'
  async getBookings() {
    logger.info('DynamoDB', 'Fetching all confirmed bookings from cloud data store');
    try {
      const data = await localBookingService.getBookings();
      return {
        success: true,
        data,
        total: data.length
      };
    } catch (err) {
      logger.error('DynamoDB', 'Failed to retrieve bookings', err);
      return { success: false, data: [], error: err.message };
    }
  },

  async getBookingById(bookingId) {
    logger.info('DynamoDB', `GetItem booking ID: ${bookingId}`);
    try {
      const booking = await localBookingService.getBookingById(bookingId);
      return {
        success: Boolean(booking),
        data: booking
      };
    } catch (err) {
      return { success: false, data: null, error: err.message };
    }
  },

  // Future: AWS Lambda createReservation with distributed lock
  async createBooking(bookingPayload) {
    logger.info('EventBridge', `Triggering reservation lock event for "${bookingPayload.adventureName}"`);
    try {
      const created = await localBookingService.createBooking(bookingPayload);
      return {
        success: true,
        data: created,
        message: 'Expedition batch slot locked successfully'
      };
    } catch (err) {
      logger.error('DynamoDB', 'Error creating booking', err);
      return { success: false, error: err.message };
    }
  },

  async cancelBooking(bookingId, reason = 'Traveler Request') {
    logger.info('EventBridge', `Canceling booking ${bookingId}`);
    try {
      const updated = await localBookingService.cancelBooking(bookingId);
      return {
        success: true,
        data: updated,
        message: 'Reservation cancelled. Refund processed.'
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async applyCoupon(code, subtotal) {
    try {
      const result = await localBookingService.applyCoupon(code, subtotal);
      return {
        success: result.isValid,
        data: result
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

export default bookingService;
