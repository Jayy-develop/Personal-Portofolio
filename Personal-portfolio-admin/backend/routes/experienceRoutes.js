const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', experienceController.getAllExperience);
router.get('/:id', experienceController.getExperienceById);

// Protected routes
router.post('/', authMiddleware, experienceController.createExperience);
router.put('/:id', authMiddleware, experienceController.updateExperience);
router.delete('/:id', authMiddleware, experienceController.deleteExperience);

module.exports = router;
