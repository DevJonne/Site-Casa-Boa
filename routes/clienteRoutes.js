const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//router.get('/login', clienteController.showLogin);

//quero que ao fazer o login tenha a verificação se é admin, cliente ou vendedor e redirecione para admin.ejs, cliente.ejs ou vendedor.ejs
//router.post('/login', clienteController.login);

//router.get('/cliente', clienteController.isAuthenticated, clienteController.dashboard);
router.get('/cliente', clienteController.dashboard);

//router.get('/cliente', clienteController.isAuthenticated, clienteController.renderCliente);
//router.get('/logout', clienteController.logout);
//alterar
router.post('/favoritar', clienteController.isAuthenticated, clienteController.favoritarImovel);
router.post('/removerFavorito', clienteController.isAuthenticated, clienteController.desfavoritarImovel);

router.get('/cadastrar', clienteController.showRegister);
router.post('/cadastrar', clienteController.register);

module.exports = router;