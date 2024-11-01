const Usuario = require('../models/Usuario');

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    const { telefone, senha } = req.body;

    Usuario.findByEmail(telefone, (usuario) => {
        if(usuario && usuario.senha === senha){
            res.send('Login bem-sucedido!');
        }else{
            res.send('Email ou senha incorretos!');
        }
    });
};

exports.showRegister = (req, res) => {
    const erro = req.query.erro === 'true'; // Verifica se o erro é passado na query
    res.render('register', { erro }); // Passa o erro para a página EJS
};

exports.register = (req, res) => {
    const { nome, telefone, senha } = req.body;
    Usuario.createUser(nome, telefone, senha, (results) => {
        if (results) { // Agora `results` é passado como argumento
            res.redirect('/entrar');
        } else {
            res.redirect('/cadastrar?erro=true');
        }
    });
};