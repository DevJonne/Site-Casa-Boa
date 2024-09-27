const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

router.get('/entrar', usuarioController.showLogin);
router.post('/entrar', usuarioController.login);

router.get('/cadastrar', usuarioController.showRegister);
router.post('/cadastrar', usuarioController.register);

module.exports = router;