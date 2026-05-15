const Razorpay = require('razorpay');
const crypto = require('crypto');

// Lazily initialise so app doesn't crash on missing env vars during testing
let razorpayInstance;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      throw new Error('Razorpay credentials not configured in .env');
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }
  return razorpayInstance;
};

/**
 * Create a Razorpay order
 * @param {number} amountInRupees - Amount in INR (will be converted to paise)
 * @param {string} receiptId - Unique receipt ID (booking _id or bookingRef)
 * @returns {Object} Razorpay order object
 */
const createRazorpayOrder = async (amountInRupees, receiptId) => {
  const instance = getRazorpayInstance();
  const options = {
    amount: amountInRupees * 100, // Convert to paise
    currency: 'INR',
    receipt: `rcpt_${receiptId}`.substring(0, 40), // Razorpay limit
    notes: {
      receipt: receiptId,
    },
  };
  const order = await instance.orders.create(options);
  return order;
};

/**
 * Verify Razorpay payment signature using HMAC SHA256
 * @param {string} orderId - razorpay_order_id
 * @param {string} paymentId - razorpay_payment_id
 * @param {string} signature - razorpay_signature from frontend
 * @returns {boolean} true if signature is valid
 */
const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return expectedSignature === signature;
};

/**
 * Verify Razorpay webhook signature
 * @param {Buffer|string} rawBody - Raw request body
 * @param {string} webhookSignature - X-Razorpay-Signature header
 * @returns {boolean} true if valid
 */
const verifyWebhookSignature = (rawBody, webhookSignature) => {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    console.warn('⚠️  RAZORPAY_WEBHOOK_SECRET not set — skipping webhook verification');
    return true; // Allow in dev without secret
  }
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  return expectedSignature === webhookSignature;
};

module.exports = {
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
};
