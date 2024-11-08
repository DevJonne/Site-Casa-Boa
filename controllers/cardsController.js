const Imovel = require('../models/Imovel');

exports.renderHome = (req, res) => {
    /*Imovel.getApartamentos((err, apartamentos) => {
        if(err){
            return res.status(500).send('Erro ao buscar apartamentos!');
        }
        res.render('home', { apartamentos });
    });*/

    Imovel.getCategoriasComImoveis()
        .then((categoriasComImoveis) => {
            res.render('home', { categoriasComImoveis });
        })
        .catch((err) => {
            console.error('Erro ao buscar dados: ', err);
            res.status(500).send('Erro ao carregar imóveis.');
        });
};