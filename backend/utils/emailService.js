const nodemailer = require('nodemailer');

/**
 * Send a booking confirmation email
 * @param {Object} params
 * @param {string} params.to - Recipient email
 * @param {string} params.customerName
 * @param {string} params.bookingRef
 * @param {string} params.resortName
 * @param {string} params.checkIn
 * @param {string} params.guestCount
 * @param {number} params.advanceAmount
 * @param {number} params.remainingAmount
 */
const sendBookingConfirmationEmail = async ({
  to,
  customerName,
  bookingRef,
  resortName,
  checkIn,
  guestCount,
  advanceAmount,
  remainingAmount,
}) => {
  // Use env vars — gracefully skip if not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Skipping email send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const checkInFormatted = new Date(checkIn).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 40px 32px; text-align: center; }
        .header h1 { color: #111; margin: 0; font-size: 28px; font-weight: 900; }
        .header p { color: rgba(0,0,0,0.7); margin: 8px 0 0; }
        .body { padding: 32px; }
        .ref-badge { background: #f8f4e8; border: 2px solid #D4AF37; border-radius: 10px; padding: 16px 24px; text-align: center; margin-bottom: 24px; }
        .ref-badge span { font-size: 13px; color: #888; display: block; }
        .ref-badge strong { font-size: 22px; color: #B8860B; font-weight: 900; letter-spacing: 2px; }
        .detail-grid { background: #fafafa; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #888; font-size: 14px; }
        .detail-value { color: #111; font-weight: 700; font-size: 14px; }
        .payment-box { background: linear-gradient(135deg, #D4AF37, #FFD700); border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
        .payment-box h3 { color: #111; margin: 0 0 12px; font-size: 16px; }
        .payment-row { display: flex; justify-content: space-between; margin: 6px 0; }
        .payment-row span { font-size: 14px; color: rgba(0,0,0,0.7); }
        .payment-row strong { font-weight: 900; color: #111; }
        .footer { background: #111; color: rgba(255,255,255,0.6); text-align: center; padding: 20px 32px; font-size: 13px; }
        .footer a { color: #FFD700; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your resort adventure awaits, ${customerName}!</p>
        </div>
        <div class="body">
          <div class="ref-badge">
            <span>Your Booking Reference</span>
            <strong>${bookingRef}</strong>
          </div>

          <div class="detail-grid">
            <div class="detail-row">
              <span class="detail-label">🏖️ Resort</span>
              <span class="detail-value">${resortName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 Visit Date</span>
              <span class="detail-value">${checkInFormatted}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">👥 Guests</span>
              <span class="detail-value">${guestCount} person${guestCount > 1 ? 's' : ''}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">👤 Name</span>
              <span class="detail-value">${customerName}</span>
            </div>
          </div>

          <div class="payment-box">
            <h3>💳 Payment Summary</h3>
            <div class="payment-row">
              <span>Advance Paid (Online)</span>
              <strong>₹${advanceAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div class="payment-row">
              <span>Remaining (Pay at Resort)</span>
              <strong>₹${remainingAmount.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <p style="color:#555; font-size:14px; line-height:1.7;">
            Please show this email or your booking reference <strong>${bookingRef}</strong> at the resort entry gate.
            For any queries, contact us on WhatsApp: <a href="https://wa.me/7721819073" style="color:#D4AF37;">7721819073</a>
          </p>
        </div>
        <div class="footer">
          <p>© 2025 Book My Resorts — Your Passport to Adventure</p>
          <p><a href="mailto:support@myresortbooking.in">support@myresortbooking.in</a> | Virar West, Mumbai</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Book My Resorts" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Booking Confirmed — ${resortName} | Ref: ${bookingRef}`,
    html,
  });

  console.log(`📧 Confirmation email sent to ${to}`);
};

module.exports = { sendBookingConfirmationEmail };
