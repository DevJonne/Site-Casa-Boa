const passport = require('passport');
const bcrypt = require('bcryptjs');

const Cliente = require('../models/Cliente');
const Imovel = require('../models/Imovel');

exports.login = passport.authenticate('local', {
    successRedirect: '/cliente',
    failureRedirect: '/entrar',
    failureFlash: true
});

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

exports.showRegister = (req, res) => {
    res.render('register');
}

exports.register = (req, res) => {
    //console.log('Cliente req.body: ', req.body);
    const { email, senha, nome, dataNascimento, endereco, telefone } = req.body;
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if(err){
            console.error('Erro ao gerar hash da senha: ', err);
            return res.status(500).send('Erro ao cadastrar o usuario.');
        }

        Cliente.createCliente(email, hashedPassword, nome, dataNascimento, endereco, telefone, () => {
            res.send('Cliente cadastrado com sucesso!');
            //res.render('/cliente');
        });
    });
};
//alterar
exports.favoritarImovel = (req, res) => {
    const idCliente = req.user.idUsuario;
    console.log('Dados recebidos: ', req.body);
    const { idImovel } = req.body;

    // Validação do valor de idImovel
    if (!idImovel || isNaN(parseInt(idImovel))) {
        return res.status(400).send('ID do imóvel inválido.');
    }

    Cliente.getIdClienteByUsuario(idCliente, (err, idCliente) => {
        if(err){
            console.error(err);
            return res.status(500).send('Erro ao buscar o cliente');
        }

        //Adicionar o favorito com o idCliente
        Cliente.addFavorito(idCliente, parseInt(idImovel), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao favoritar imóvel.');
            }
            res.redirect('/cliente');
        });
    });
};


exports.renderCliente = (req, res) => {
    const idUsuario = req.user.idUsuario;

    Cliente.getIdClientePorIdUsuario(idUsuario)
        .then(idCliente => {
            return Imovel.getFavoritosPorCliente(idCliente)
        })
        .then(imoveisFavoritos => {
            console.log('Favoritos encontrados:', imoveisFavoritos);
            res.render('cliente', { user: req.user, imoveisFavoritos });
        })
        .catch(err => {
            console.error('Erro ao buscar imóveis favoritos: ', err);
            res.status(500).send('Erro ao carregar imóveis favoritos.');
        })
}

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){ return next(err); }
        res.redirect('/');
    });
};
