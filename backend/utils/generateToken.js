const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for admin authentication
 * @param {string} id - Admin MongoDB _id
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
