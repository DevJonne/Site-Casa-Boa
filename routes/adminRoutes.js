const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.dashboard);
router.get('/usuarios', adminController.consultarUsuarios);
router.get('/clientes', adminController.consultarClientes);
router.get('/agentes', adminController.consultarAgentes);
router.get('/adicionarAgente', adminController.formAdicionarAgente);
router.post('/adicionarAgente', adminController.adicionarAgente);
router.get('/categorias', adminController.gerenciarCategorias);
router.get('/imoveis', adminController.gerenciarImoveis);

module.exports = router;