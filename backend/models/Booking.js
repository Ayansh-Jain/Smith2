const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // Resort reference
    resortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resort',
      required: [true, 'Resort is required'],
    },
    resortName: {
      type: String,
      required: true,
    },

    // Customer details
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number'],
    },

    // Booking details
    guestCount: {
      type: Number,
      required: [true, 'Guest count is required'],
      min: [1, 'At least 1 guest required'],
    },
    adults: { type: Number, default: 1 },
    kids: { type: Number, default: 0 },
    checkIn: {
      type: Date,
      required: [true, 'Check-in date is required'],
    },
    checkOut: {
      type: Date,
    },
    specialNote: { type: String, maxlength: 500 },
    travelAssistance: { type: Boolean, default: false },


    // Financial details
    pricePerPerson: { type: Number, required: true },
    advanceAmount: {
      type: Number,
      required: [true, 'Advance amount is required'],
      // ₹50 × guestCount
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },

    // Razorpay
    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
    },
    razorpaySignature: {
      type: String,
    },

    // Status enums
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    refundStatus: {
      type: String,
      enum: ['not_requested', 'requested', 'refunded'],
      default: 'not_requested',
    },

    // Timestamps
    paymentCompletedAt: { type: Date },
    refundedAt: { type: Date },
    refundNote: { type: String },

    // Booking reference ID for user-facing
    bookingRef: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate booking reference
bookingSchema.pre('save', function (next) {
  if (!this.bookingRef) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingRef = `BMR-${timestamp}-${random}`;
  }
  next();
});

// Index for faster queries
bookingSchema.index({ email: 1, createdAt: -1 });
bookingSchema.index({ razorpayOrderId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
