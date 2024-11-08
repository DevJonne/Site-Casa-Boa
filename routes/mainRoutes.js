const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/produtos', (req, res) => {
    res.render('produtos');
});

router.get('/busca', (req, res) => {
    res.render('busca');
});


module.exports = router;