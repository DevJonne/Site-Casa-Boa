const Vendedor = require('../models/Vendedor');

exports.dashboard = (req, res) => {
    if(req.user && req.user.tipo === 'admin'){
        res.render('admin');
    }
    res.redirect('/login');
}
exports.adicionarVendedor = (req, res) => {
    // função para adicionar vendedor, puxar essa função de models/Vendedor.js
};
