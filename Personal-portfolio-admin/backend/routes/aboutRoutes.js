const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/', aboutController.getAbout);

// Protected routes
router.post('/', authMiddleware, aboutController.saveAbout);
router.put('/', authMiddleware, aboutController.saveAbout);

module.exports = router;
