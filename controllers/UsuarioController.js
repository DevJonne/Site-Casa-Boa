//apagar, desnecessário pois usuario é uma classe abstrata agora
const Usuario = require('../models/Usuario');

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    Cliente.findByEmail(email, (usuario) => {
        if(usuario && usuario.senha === senha){
            res.send('Login bem-sucedido!');
        }else{
            res.send('Email ou senha incorretos!');
        }
    });
};

exports.showRegister = (req, res) => {
    res.render('register');
}

exports.register = (req, res) => {
    const { nome, email, senha, cpf } = req.body;
    Cliente.createUser(nome, email, senha, cpf, () => {
        //res.send('Cliente cadastrado com sucesso!');
        console.log('Usuário cadastrado com sucesso!');
    });
};