const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', certificateController.getAllCertificates);
router.get('/:id', certificateController.getCertificateById);

// Protected routes
router.post('/', authMiddleware, certificateController.createCertificate);
router.put('/:id', authMiddleware, certificateController.updateCertificate);
router.delete('/:id', authMiddleware, certificateController.deleteCertificate);

module.exports = router;
