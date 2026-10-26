// Future: Amazon Simple Email Service (SES)
// Templates and dispatcher for transactional communications.

export const EMAIL_TEMPLATES = {
  VERIFICATION: {
    subject: 'Verify your AdventureX Account',
    generateBody: ({ name, verificationCode }) => `
      Namaste ${name},
      Welcome to AdventureX! Your verification security code is:
      ${verificationCode}
      This code will expire in 15 minutes.
    `
  },
  BOOKING_CONFIRMATION: {
    subject: 'Expedition Confirmed: AdventureX Booking',
    generateBody: ({ name, adventureName, bookingId, totalAmount, travelDate }) => `
      Hello ${name},
      Your expedition "${adventureName}" is confirmed!
      Booking Reference: ${bookingId}
      Travel Dates: ${travelDate}
      Total Paid: ₹${totalAmount}
      Please carry your medical fitness certificate to basecamp.
    `
  },
  ORGANIZER_APPROVAL: {
    subject: 'Organizer Verification Approved - Welcome Partner!',
    generateBody: ({ organizerName, company }) => `
      Dear ${organizerName},
      Your partner account for "${company}" has been verified and approved by the AdventureX Expedition Safety Board.
      You can now create and manage tours.
    `
  },
  COUPON_RECEIVED: {
    subject: 'Congratulations! You unlocked a new reward voucher',
    generateBody: ({ name, code, discountAmount }) => `
      Hey ${name},
      You unlocked ₹${discountAmount} off on your next high-altitude trail.
      Use Coupon Code: ${code} at checkout.
    `
  },
  PASSWORD_RESET: {
    subject: 'Reset your AdventureX Password',
    generateBody: ({ resetLink }) => `
      We received a request to reset your AdventureX password.
      Click the link below to set a new password:
      ${resetLink}
    `
  }
};

export const emailService = {
  // Future: Amazon SES SendEmailCommand via AWS SDK v3
  async sendEmail(templateKey, recipientEmail, data = {}) {
    const template = EMAIL_TEMPLATES[templateKey];
    if (!template) throw new Error(`Unknown email template: ${templateKey}`);

    // Simulate SES transmission
    const messageId = `ses-msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      success: true,
      messageId,
      recipient: recipientEmail,
      subject: template.subject,
      timestamp: new Date().toISOString()
    };
  }
};

export default emailService;
