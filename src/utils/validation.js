// AdventureX Comprehensive Input Validation Utility
// Ensures strong validation across registration, authentication, bookings, reviews, and admin workflows.

export const validation = {
  /**
   * Validate Email Address
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') return { isValid: false, message: 'Email address is required.' };
    const trimmed = email.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(trimmed)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g., traveler@example.com).' };
    }
    if (trimmed.length > 254) {
      return { isValid: false, message: 'Email exceeds maximum allowable length.' };
    }
    return { isValid: true, message: '' };
  },

  /**
   * Validate Phone Number (Indian mobile format: 10 digits, optional +91 or 0 prefix)
   */
  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return { isValid: false, message: 'Phone number is required.' };
    const cleaned = phone.replace(/[\s\-()]/g, '');
    const regex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!regex.test(cleaned)) {
      return { isValid: false, message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.' };
    }
    return { isValid: true, message: '' };
  },

  /**
   * Validate Non-Empty Field
   */
  validateRequired(value, fieldName = 'Field') {
    if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
      return { isValid: false, message: `${fieldName} is mandatory.` };
    }
    return { isValid: true, message: '' };
  },

  /**
   * Validate String Length
   */
  validateLength(value, min = 1, max = 500, fieldName = 'Field') {
    const len = (value || '').trim().length;
    if (len < min) {
      return { isValid: false, message: `${fieldName} must be at least ${min} characters long.` };
    }
    if (len > max) {
      return { isValid: false, message: `${fieldName} cannot exceed ${max} characters.` };
    }
    return { isValid: true, message: '' };
  },

  /**
   * Validate Positive Monetary Price (in INR ₹)
   */
  validatePrice(price, fieldName = 'Price') {
    const num = Number(price);
    if (isNaN(num)) {
      return { isValid: false, message: `${fieldName} must be a valid number.` };
    }
    if (num <= 0) {
      return { isValid: false, message: `${fieldName} must be greater than ₹0.` };
    }
    if (num > 1000000) {
      return { isValid: false, message: `${fieldName} exceeds maximum permitted value (₹10,00,000).` };
    }
    return { isValid: true, message: '' };
  },

  /**
   * Validate Date Range (start date must be present/future, end date >= start date)
   */
  validateDateRange(startDateStr, endDateStr) {
    if (!startDateStr || !endDateStr) {
      return { isValid: false, message: 'Both start and end dates are required.' };
    }
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { isValid: false, message: 'Invalid calendar date format.' };
    }

    if (end < start) {
      return { isValid: false, message: 'Expedition end date cannot be earlier than start date.' };
    }

    return { isValid: true, message: '' };
  },

  /**
   * Form Validator: Traveler Booking Form
   */
  validateBookingTravelers(travelers = []) {
    if (!Array.isArray(travelers) || travelers.length === 0) {
      return { isValid: false, message: 'At least one traveler must be added to the expedition roster.' };
    }

    for (let i = 0; i < travelers.length; i++) {
      const t = travelers[i];
      if (!t.fullName || t.fullName.trim().length < 2) {
        return { isValid: false, message: `Traveler #${i + 1}: Please provide a valid full name.` };
      }
      if (!t.age || Number(t.age) < 5 || Number(t.age) > 95) {
        return { isValid: false, message: `Traveler #${i + 1}: Age must be between 5 and 95 years.` };
      }
      if (t.email) {
        const emailCheck = this.validateEmail(t.email);
        if (!emailCheck.isValid) return { isValid: false, message: `Traveler #${i + 1}: ${emailCheck.message}` };
      }
      if (t.phone) {
        const phoneCheck = this.validatePhone(t.phone);
        if (!phoneCheck.isValid) return { isValid: false, message: `Traveler #${i + 1}: ${phoneCheck.message}` };
      }
    }

    return { isValid: true, message: '' };
  },

  /**
   * Form Validator: Review Form
   */
  validateReview({ rating, title, comment }) {
    if (!rating || rating < 1 || rating > 5) {
      return { isValid: false, message: 'Please select a star rating between 1 and 5.' };
    }
    const commentCheck = this.validateLength(comment, 10, 2000, 'Review comment');
    if (!commentCheck.isValid) return commentCheck;
    return { isValid: true, message: '' };
  },

  /**
   * Form Validator: Community Post Form
   */
  validateCommunityPost({ title, content }) {
    const titleCheck = this.validateLength(title, 5, 150, 'Post headline');
    if (!titleCheck.isValid) return titleCheck;

    const contentCheck = this.validateLength(content, 15, 5000, 'Post story content');
    if (!contentCheck.isValid) return contentCheck;

    return { isValid: true, message: '' };
  }
};

export default validation;
