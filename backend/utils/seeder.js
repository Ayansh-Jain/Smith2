/**
 * Database Seeder
 * Seeds default admin and resorts from the existing siteData
 *
 * Usage: npm run seed
 *        npm run seed -- --destroy (to wipe all data)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Resort = require('../models/Resort');

const defaultResorts = [
  {
    name: 'DreamWorld Resort',
    location: 'Virar West, Mumbai',
    description: 'Best Waterpark & Beach Resort in Virar — offering 7 stunning pools, 15 thrilling water slides, rain dance, unlimited meals and direct beach access.',
    shortDesc: 'Best Waterpark & Beach Resort in Virar',
    pricePerPerson: 525,
    capacity: 500,
    availableRooms: 20,
    emoji: '🌊',
    images: [
      { url: 'https://www.dreamworldresort.in/images/DWGallery/mobile1stNew.webp' },
      { url: 'https://www.dreamworldresort.in/images/DWGallery/mobile2ndNew.webp' },
      { url: 'https://www.dreamworldresort.in/images/DWGallery/galleryDreamworldVirar3.webp' },
    ],
    features: ['7 Pools', '15 Water Slides', 'Rain Dance', 'Unlimited Breakfast & Lunch', 'Free WiFi', 'Beach Access'],
    facilities: ['Changing Rooms', 'Lockers Available', 'Parking', 'First Aid', 'Restaurant'],
    included: ['Entry Ticket', 'Unlimited Water Slides', 'Wave Pool', 'Rain Dance', 'Lunch Buffet', 'Locker', 'Travel Assistance'],
    roomAvailability: true,
    beachAccess: true,
    wifi: true,
    parking: true,
    isFeatured: true,
  },
  {
    name: 'Manthan Resort',
    location: 'Virar West, Mumbai',
    description: 'Jungle-themed Waterpark with massive wave pool, multi-racer slide, 12 exciting slides, DJ music.',
    shortDesc: 'Jungle-themed Waterpark with Wave Pool & DJ',
    pricePerPerson: 525,
    capacity: 400,
    availableRooms: 0,
    emoji: '🏖️',
    images: [
      { url: 'https://api.waterparkchalo.com/waterbackend/data/uploads/products/1763448214652-mainImage.jpg' },
    ],
    features: ['Wave Pool', 'Multi Racer Slide', '12 Slides', 'DJ Music', 'Jungle Theme', 'Rain Dance'],
    facilities: ['Changing Rooms', 'Lockers Available', 'Parking', 'Food Court', 'DJ Area'],
    included: ['Entry Ticket', 'All Water Slides', 'Wave Pool', 'DJ Music', 'Rain Dance', 'Locker'],
    roomAvailability: false,
    wifi: true,
    parking: true,
    isFeatured: true,
  },
  {
    name: 'Vaity Aqua Resort',
    location: 'Virar West, Mumbai',
    description: 'Perfect Family Waterpark Getaway Near Mumbai with stunning pools, water attractions, and vibrant atmosphere.',
    shortDesc: 'Perfect Family Waterpark Getaway Near Mumbai',
    pricePerPerson: 550,
    capacity: 450,
    availableRooms: 15,
    emoji: '🌊',
    images: [
      { url: 'https://vaityaqua.com/img/width/1.jpg' },
      { url: 'https://vaityaqua.com/img/width/2.jpg' },
    ],
    features: ['Family Pools', 'Water Slides', 'Rain Dance', 'Food Court', 'Kids Area', 'Ample Parking'],
    facilities: ['Changing Rooms', 'Lockers Available', 'Parking', 'Restaurant'],
    included: ['Entry Ticket', 'All Water Slides', 'Kids Pool', 'Rain Dance', 'Locker'],
    roomAvailability: true,
    wifi: true,
    parking: true,
    isFeatured: false,
  },
];

const seedData = async () => {
  await connectDB();

  if (process.argv[2] === '--destroy') {
    await Admin.deleteMany();
    await Resort.deleteMany();
    console.log('🗑️  All data destroyed');
    process.exit(0);
  }

  // Seed admin
  const existingAdmin = await Admin.findOne({ email: 'admin@bookmyresorts.in' });
  if (!existingAdmin) {
    await Admin.create({
      name: 'Super Admin',
      email: 'admin@bookmyresorts.in',
      password: 'Admin@123456',
      role: 'superadmin',
    });
    console.log('👤 Default admin created: admin@bookmyresorts.in / Admin@123456');
    console.log('⚠️  IMPORTANT: Change the admin password immediately after first login!');
  } else {
    console.log('👤 Admin already exists — skipping');
  }

  // Seed resorts
  const existingResorts = await Resort.countDocuments();
  if (existingResorts === 0) {
    await Resort.insertMany(defaultResorts);
    console.log(`🏖️  ${defaultResorts.length} resorts seeded`);
  } else {
    console.log(`🏖️  ${existingResorts} resorts already exist — skipping resort seed`);
  }

  console.log('\n✅ Seeding complete!');
  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Seeder error:', err.message);
  process.exit(1);
});
