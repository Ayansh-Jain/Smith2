const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Resort name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDesc: {
      type: String,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    pricePerPerson: {
      type: Number,
      required: [true, 'Price per person is required'],
      min: [0, 'Price cannot be negative'],
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String }, // Cloudinary public_id for deletion
      },
    ],
    amenities: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    facilities: [{ type: String, trim: true }],
    included: [{ type: String, trim: true }],
    excluded: [{ type: String, trim: true }],
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    availableRooms: {
      type: Number,
      default: 0,
    },
    roomAvailability: {
      type: Boolean,
      default: true,
    },
    beachAccess: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emoji: { type: String, default: '🏖️' },
    reviews: [
      {
        name: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        avatar: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from name before saving
resortSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  // Calculate average rating
  if (this.reviews && this.reviews.length > 0) {
    this.averageRating =
      this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
  next();
});

module.exports = mongoose.model('Resort', resortSchema);
