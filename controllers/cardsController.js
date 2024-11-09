const Imovel = require('../models/Imovel');

exports.renderHome = (req, res) => {
    Imovel.getCategoriasComImoveis()
        .then((categoriasComImoveis) => {
            res.render('home', { categoriasComImoveis });
        })
        .catch((err) => {
            console.error('Erro ao buscar dados: ', err);
            res.status(500).send('Erro ao carregar imóveis.');
        });
};