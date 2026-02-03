const express = require('express');
const publicController = require('../controllers/publicController');

const router = express.Router();

// Rutas públicas
router.get('/health', publicController.getHealth);
router.get('/info', publicController.getInfo);

module.exports = router;
