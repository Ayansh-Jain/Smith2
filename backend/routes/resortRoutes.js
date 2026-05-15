const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validateMiddleware');
const { getResorts, getResortById } = require('../controllers/resortController');

// GET /api/resorts — public list of all active resorts
router.get('/', getResorts);

// GET /api/resorts/:id — single resort
router.get('/:id', getResortById);

module.exports = router;
