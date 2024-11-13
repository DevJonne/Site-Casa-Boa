const passport = require('passport');
const bcrypt = require('bcryptjs');

const Cliente = require('../models/Cliente');
const Imovel = require('../models/Imovel');

exports.showLogin = (req, res) => {
    res.render('login');
};

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

exports.favoritarImovel = (req, res) => {
    const idCliente = req.user.idUsuario;
    const { idImovel } = req.body;

    db.query('INSERT INTO Favoritos (idCliente, idImovel) VALUES (?, ?);',
        [idCliente, idImovel],
        (err) => {
            if(err) throw err;
            res.redirect('/cliente');    
        }
    );
};

exports.renderCliente = (req, res) => {
    Imovel.getFavoritosPorCliente(req.user.idUsuario)
        .then(imoveisFavoritos => {
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
