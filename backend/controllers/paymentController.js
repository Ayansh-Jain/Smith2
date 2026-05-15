const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Resort = require('../models/Resort');
const {
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
} = require('../services/razorpayService');
const { sendBookingConfirmationEmail } = require('../utils/emailService');

const ADVANCE_PER_PERSON = 50; // ₹50 per guest

// ─── POST /api/payment/create-order ──────────────────────────────────────────
const createOrder = asyncHandler(async (req, res) => {
  const { resortId, guestCount, checkIn, checkOut, userDetails, adults, kids, specialNote, travelAssistance } = req.body;

  // Validate resort
  const resort = await Resort.findById(resortId);
  if (!resort || !resort.isActive) {
    res.status(404);
    throw new Error('Resort not found or unavailable');
  }

  // Validate guestCount
  const numGuests = parseInt(guestCount);
  if (!numGuests || numGuests < 1) {
    res.status(400);
    throw new Error('Guest count must be at least 1');
  }

  // Check for duplicate pending booking (same email + resort + date)
  const existingBooking = await Booking.findOne({
    email: userDetails.email.toLowerCase(),
    resortId,
    checkIn: new Date(checkIn),
    bookingStatus: { $in: ['pending', 'confirmed'] },
  });
  if (existingBooking) {
    res.status(409);
    throw new Error(
      'A booking for this resort and date already exists with your email. Please contact support if this is an error.'
    );
  }

  // Calculate amounts
  const numAdults = parseInt(adults) || numGuests;
  const numKids = parseInt(kids) || 0;
  const adultTotal = resort.pricePerPerson * numAdults;
  const kidsTotal = 350 * numKids; // ₹350 for kids under 8
  const totalAmount = adultTotal + kidsTotal;
  const advanceAmount = ADVANCE_PER_PERSON * numGuests;
  const remainingAmount = totalAmount - advanceAmount;

  // Create Razorpay order
  const razorpayOrder = await createRazorpayOrder(advanceAmount, Date.now().toString());

  // Create temporary booking record with pending status
  const booking = await Booking.create({
    resortId: resort._id,
    resortName: resort.name,
    customerName: userDetails.name,
    email: userDetails.email.toLowerCase(),
    phone: userDetails.phone,
    guestCount: numGuests,
    adults: numAdults,
    kids: numKids,
    checkIn: new Date(checkIn),
    checkOut: checkOut ? new Date(checkOut) : undefined,
    specialNote: specialNote || '',
    travelAssistance: Boolean(travelAssistance),
    pricePerPerson: resort.pricePerPerson,
    advanceAmount,
    totalAmount,
    remainingAmount: remainingAmount < 0 ? 0 : remainingAmount,
    razorpayOrderId: razorpayOrder.id,
    paymentStatus: 'pending',
    bookingStatus: 'pending',
  });

  res.status(201).json({
    success: true,
    data: {
      orderId: razorpayOrder.id,
      amount: advanceAmount,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID,
      bookingId: booking._id,
      bookingRef: booking.bookingRef,
      resortName: resort.name,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
    },
  });
});

// ─── POST /api/payment/verify-payment ────────────────────────────────────────
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
    res.status(400);
    throw new Error('Missing payment verification parameters');
  }

  // Find booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Verify order ID matches
  if (booking.razorpayOrderId !== razorpay_order_id) {
    res.status(400);
    throw new Error('Order ID mismatch — possible tampering');
  }

  // Verify HMAC SHA256 signature — CRITICAL security step
  const isValid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    // Mark payment as failed
    booking.paymentStatus = 'failed';
    booking.bookingStatus = 'cancelled';
    await booking.save();

    res.status(400);
    throw new Error('Payment signature verification failed — payment rejected');
  }

  // Signature valid — confirm booking
  booking.razorpayPaymentId = razorpay_payment_id;
  booking.razorpaySignature = razorpay_signature;
  booking.paymentStatus = 'paid';
  booking.bookingStatus = 'confirmed';
  booking.paymentCompletedAt = new Date();
  await booking.save();

  // Send confirmation email (non-blocking)
  sendBookingConfirmationEmail({
    to: booking.email,
    customerName: booking.customerName,
    bookingRef: booking.bookingRef,
    resortName: booking.resortName,
    checkIn: booking.checkIn,
    guestCount: booking.guestCount,
    advanceAmount: booking.advanceAmount,
    remainingAmount: booking.remainingAmount,
  }).catch((err) => console.error('Email send error:', err.message));

  res.json({
    success: true,
    message: 'Payment verified and booking confirmed',
    data: {
      bookingId: booking._id,
      bookingRef: booking.bookingRef,
      resortName: booking.resortName,
      checkIn: booking.checkIn,
      guestCount: booking.guestCount,
      advanceAmount: booking.advanceAmount,
      remainingAmount: booking.remainingAmount,
      paymentStatus: booking.paymentStatus,
      bookingStatus: booking.bookingStatus,
    },
  });
});

// ─── POST /api/payment/webhook ────────────────────────────────────────────────
// NOTE: This route needs raw body — configured in app.js
const handleWebhook = asyncHandler(async (req, res) => {
  const webhookSignature = req.headers['x-razorpay-signature'];
  const rawBody = req.rawBody; // Set in app.js via express.raw()

  // Verify webhook signature
  const isValid = verifyWebhookSignature(rawBody, webhookSignature);
  if (!isValid) {
    res.status(400);
    throw new Error('Invalid webhook signature');
  }

  const event = req.body;
  const eventType = event.event;
  const paymentEntity = event.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id;

  if (!orderId) {
    return res.json({ success: true, message: 'Event processed (no order_id)' });
  }

  const booking = await Booking.findOne({ razorpayOrderId: orderId });
  if (!booking) {
    // Not our booking — acknowledge anyway
    return res.json({ success: true, message: 'Booking not found — acknowledged' });
  }

  switch (eventType) {
    case 'payment.captured':
      if (booking.paymentStatus !== 'paid') {
        booking.razorpayPaymentId = paymentEntity.id;
        booking.paymentStatus = 'paid';
        booking.bookingStatus = 'confirmed';
        booking.paymentCompletedAt = new Date();
        await booking.save();
        console.log(`✅ Webhook: Payment captured for booking ${booking.bookingRef}`);
      }
      break;

    case 'payment.failed':
      if (booking.paymentStatus === 'pending') {
        booking.paymentStatus = 'failed';
        booking.bookingStatus = 'cancelled';
        await booking.save();
        console.log(`❌ Webhook: Payment failed for booking ${booking.bookingRef}`);
      }
      break;

    case 'refund.created':
      booking.refundStatus = 'refunded';
      booking.paymentStatus = 'refunded';
      booking.refundedAt = new Date();
      await booking.save();
      console.log(`↩️  Webhook: Refund created for booking ${booking.bookingRef}`);
      break;

    default:
      console.log(`ℹ️  Unhandled webhook event: ${eventType}`);
  }

  res.json({ success: true, message: `Event ${eventType} processed` });
});

// ─── GET /api/payment/booking/:id ─────────────────────────────────────────────
const getBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('resortId', 'name location images')
    .select('-razorpaySignature');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json({ success: true, data: booking });
});

module.exports = { createOrder, verifyPayment, handleWebhook, getBookingStatus };
