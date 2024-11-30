const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedorController');

router.get('/vendedor', vendedorController.dashboard);

module.exports = router;