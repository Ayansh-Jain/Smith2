const asyncHandler = require('express-async-handler');
const Resort = require('../models/Resort');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// ─── GET All Resorts (Public) ─────────────────────────────────────────────────
const getResorts = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.featured === 'true') filter.isFeatured = true;

  const resorts = await Resort.find(filter)
    .select('-__v')
    .sort({ isFeatured: -1, createdAt: -1 });

  res.json({ success: true, count: resorts.length, data: resorts });
});

// ─── GET Single Resort (Public) ───────────────────────────────────────────────
const getResortById = asyncHandler(async (req, res) => {
  const resort = await Resort.findById(req.params.id).select('-__v');
  if (!resort || !resort.isActive) {
    res.status(404);
    throw new Error('Resort not found');
  }
  res.json({ success: true, data: resort });
});

// ─── CREATE Resort (Admin) ────────────────────────────────────────────────────
const createResort = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    description,
    shortDesc,
    pricePerPerson,
    capacity,
    availableRooms,
    amenities,
    features,
    facilities,
    included,
    excluded,
    roomAvailability,
    beachAccess,
    wifi,
    parking,
    isFeatured,
    emoji,
  } = req.body;

  // Handle uploaded images
  const images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      // Upload to Cloudinary if configured, else keep local path
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'book-my-resorts',
        });
        images.push({ url: result.secure_url, public_id: result.public_id });
        fs.unlinkSync(file.path); // Remove temp file
      } else {
        images.push({ url: `/uploads/${file.filename}` });
      }
    }
  }

  // Also accept imageUrls from body (for external URLs)
  if (req.body.imageUrls) {
    const urls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
      : [req.body.imageUrls];
    urls.forEach((url) => images.push({ url }));
  }

  const resort = await Resort.create({
    name,
    location,
    description,
    shortDesc,
    pricePerPerson: parseFloat(pricePerPerson),
    capacity: parseInt(capacity),
    availableRooms: parseInt(availableRooms) || 0,
    amenities: amenities
      ? Array.isArray(amenities)
        ? amenities
        : amenities.split(',').map((s) => s.trim())
      : [],
    features: features
      ? Array.isArray(features)
        ? features
        : features.split(',').map((s) => s.trim())
      : [],
    facilities: facilities
      ? Array.isArray(facilities)
        ? facilities
        : facilities.split(',').map((s) => s.trim())
      : [],
    included: included
      ? Array.isArray(included)
        ? included
        : included.split(',').map((s) => s.trim())
      : [],
    excluded: excluded
      ? Array.isArray(excluded)
        ? excluded
        : excluded.split(',').map((s) => s.trim())
      : [],
    images,
    roomAvailability: roomAvailability !== 'false',
    beachAccess: beachAccess === 'true',
    wifi: wifi === 'true',
    parking: parking !== 'false',
    isFeatured: isFeatured === 'true',
    emoji: emoji || '🏖️',
  });

  res.status(201).json({ success: true, data: resort });
});

// ─── UPDATE Resort (Admin) ────────────────────────────────────────────────────
const updateResort = asyncHandler(async (req, res) => {
  const resort = await Resort.findById(req.params.id);
  if (!resort) {
    res.status(404);
    throw new Error('Resort not found');
  }

  // Handle new image uploads
  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'book-my-resorts',
        });
        newImages.push({ url: result.secure_url, public_id: result.public_id });
        fs.unlinkSync(file.path);
      } else {
        newImages.push({ url: `/uploads/${file.filename}` });
      }
    }
    req.body.images = [...(resort.images || []), ...newImages];
  }

  const updatedResort = await Resort.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.json({ success: true, data: updatedResort });
});

// ─── DELETE Resort (Admin) ────────────────────────────────────────────────────
const deleteResort = asyncHandler(async (req, res) => {
  const resort = await Resort.findById(req.params.id);
  if (!resort) {
    res.status(404);
    throw new Error('Resort not found');
  }

  // Delete images from Cloudinary if applicable
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    for (const img of resort.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }
  }

  await resort.deleteOne();
  res.json({ success: true, message: 'Resort deleted successfully' });
});

module.exports = {
  getResorts,
  getResortById,
  createResort,
  updateResort,
  deleteResort,
};
