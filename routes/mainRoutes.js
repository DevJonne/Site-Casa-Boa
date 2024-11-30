const express = require('express');
const router = express.Router();
const homeController = require('../controllers/cardsController');

router.get('/', homeController.renderHome);
router.get('/login', homeController.showLogin);
router.get('/logout', homeController.logout);

router.get('/faleConosco', (req, res) => {
    res.render('faleConosco');
});


module.exports = router;