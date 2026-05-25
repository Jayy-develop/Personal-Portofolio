const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducationById);

// Protected routes
router.post('/', authMiddleware, educationController.createEducation);
router.put('/:id', authMiddleware, educationController.updateEducation);
router.delete('/:id', authMiddleware, educationController.deleteEducation);

module.exports = router;
