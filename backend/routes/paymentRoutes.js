const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const {
  createOrder,
  verifyPayment,
  handleWebhook,
  getBookingStatus,
} = require('../controllers/paymentController');

// POST /api/payment/create-order
router.post(
  '/create-order',
  [
    body('resortId').notEmpty().withMessage('Resort ID is required'),
    body('guestCount')
      .isInt({ min: 1 })
      .withMessage('Guest count must be at least 1'),
    body('checkIn').notEmpty().withMessage('Check-in date is required'),
    body('userDetails.name')
      .trim()
      .notEmpty()
      .withMessage('Customer name is required'),
    body('userDetails.email')
      .isEmail()
      .withMessage('Valid email is required'),
    body('userDetails.phone')
      .matches(/^[6-9]\d{9}$/)
      .withMessage('Valid 10-digit Indian phone number required'),
  ],
  validate,
  createOrder
);

// POST /api/payment/verify-payment
router.post(
  '/verify-payment',
  [
    body('razorpay_order_id').notEmpty().withMessage('Order ID required'),
    body('razorpay_payment_id').notEmpty().withMessage('Payment ID required'),
    body('razorpay_signature').notEmpty().withMessage('Signature required'),
    body('bookingId').notEmpty().withMessage('Booking ID required'),
  ],
  validate,
  verifyPayment
);

// POST /api/payment/webhook — raw body required (handled in app.js)
router.post('/webhook', handleWebhook);

// GET /api/payment/booking/:id — check booking status
router.get('/booking/:id', getBookingStatus);

module.exports = router;
