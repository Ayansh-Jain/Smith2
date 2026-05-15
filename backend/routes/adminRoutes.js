const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  adminLogin,
  getMe,
  getDashboardStats,
  getAllBookings,
  getBookingById,
  markRefund,
  cancelBooking,
} = require('../controllers/adminController');
const {
  createResort,
  updateResort,
  deleteResort,
  getResorts,
} = require('../controllers/resortController');

// ─── Auth routes (no protect needed) ─────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validate,
  adminLogin
);

// ─── Protected routes ─────────────────────────────────────────────────────────
router.use(protect);

// Admin profile
router.get('/me', getMe);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Resort management
router.get('/resorts', getResorts);
router.post('/resorts', upload.array('images', 10), createResort);
router.put('/resorts/:id', upload.array('images', 10), updateResort);
router.delete('/resorts/:id', deleteResort);

// Booking management
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.patch('/bookings/:id/cancel', cancelBooking);

// Refund (manual — only DB update, no Razorpay API)
router.patch('/refund/:bookingId', markRefund);

module.exports = router;
