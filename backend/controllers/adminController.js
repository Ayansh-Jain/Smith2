const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Resort = require('../models/Resort');
const generateToken = require('../utils/generateToken');

// ─── POST /api/admin/login ────────────────────────────────────────────────────
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
  if (!admin || !admin.isActive) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Update last login
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });

  const token = generateToken(admin._id);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token,
    },
  });
});

// ─── GET /api/admin/me ────────────────────────────────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin });
});

// ─── GET /api/admin/dashboard ─────────────────────────────────────────────────
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalBookings,
    confirmedBookings,
    pendingBookings,
    totalResorts,
    totalRevenue,
    recentBookings,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ bookingStatus: 'confirmed' }),
    Booking.countDocuments({ bookingStatus: 'pending' }),
    Resort.countDocuments({ isActive: true }),
    Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$advanceAmount' } } },
    ]),
    Booking.find()
      .populate('resortId', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customerName resortName checkIn guestCount advanceAmount bookingStatus paymentStatus createdAt bookingRef'),
  ]);

  res.json({
    success: true,
    data: {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      totalResorts,
      totalRevenueCollected: totalRevenue[0]?.total || 0,
      recentBookings,
    },
  });
});

// ─── GET /api/admin/bookings ──────────────────────────────────────────────────
const getAllBookings = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.bookingStatus = req.query.status;
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
  if (req.query.resort) filter.resortId = req.query.resort;

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate('resortId', 'name location images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-razorpaySignature'),
    Booking.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: bookings.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    data: bookings,
  });
});

// ─── GET /api/admin/bookings/:id ──────────────────────────────────────────────
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('resortId', 'name location images pricePerPerson')
    .select('-razorpaySignature');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json({ success: true, data: booking });
});

// ─── PATCH /api/admin/refund/:bookingId ──────────────────────────────────────
// Manual refund — only marks as refunded in DB, NO Razorpay API call
const markRefund = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.paymentStatus !== 'paid') {
    res.status(400);
    throw new Error('Refund can only be processed for paid bookings');
  }

  booking.refundStatus = 'refunded';
  booking.paymentStatus = 'refunded';
  booking.bookingStatus = 'cancelled';
  booking.refundedAt = new Date();
  booking.refundNote = req.body.note || 'Manual refund by admin';
  await booking.save();

  res.json({
    success: true,
    message: `Booking ${booking.bookingRef} marked as refunded`,
    data: {
      bookingRef: booking.bookingRef,
      refundStatus: booking.refundStatus,
      paymentStatus: booking.paymentStatus,
      refundedAt: booking.refundedAt,
    },
  });
});

// ─── PATCH /api/admin/bookings/:id/cancel ────────────────────────────────────
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  booking.bookingStatus = 'cancelled';
  await booking.save();
  res.json({ success: true, message: 'Booking cancelled', data: booking });
});

module.exports = {
  adminLogin,
  getMe,
  getDashboardStats,
  getAllBookings,
  getBookingById,
  markRefund,
  cancelBooking,
};
