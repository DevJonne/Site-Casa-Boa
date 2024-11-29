const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/login', clienteController.showLogin);
router.post('/login', clienteController.login);

router.get('/cliente', clienteController.isAuthenticated, clienteController.renderCliente);
router.get('/logout', clienteController.logout);
//alterar
router.post('/favoritar', clienteController.isAuthenticated, clienteController.favoritarImovel);
router.post('/removerFavorito', clienteController.isAuthenticated, clienteController.desfavoritarImovel);

router.get('/cadastrar', clienteController.showRegister);
router.post('/cadastrar', clienteController.register);

module.exports = router;