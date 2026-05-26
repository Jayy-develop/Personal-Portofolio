const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected route - only authenticated admins can sync
router.post('/portfolio', authMiddleware, syncController.syncToPortfolio);

module.exports = router;
