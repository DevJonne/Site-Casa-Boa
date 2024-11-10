const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/entrar', clienteController.showLogin);
router.post('/entrar', clienteController.login);

router.get('/cadastrar', clienteController.showRegister);
router.post('/cadastrar', clienteController.register);

module.exports = router;