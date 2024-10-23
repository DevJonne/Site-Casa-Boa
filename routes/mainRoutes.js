const express = require('express');
const router = express.Router();
const homeController = require('../controllers/cardsController');

router.get('/', homeController.renderHome);

router.get('/produtos', (req, res) => {
    res.render('produtos');
});

module.exports = router;