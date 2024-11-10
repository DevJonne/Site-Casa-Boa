const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    const { email, senha } = req.body;

    Usuario.findByEmail(email, (cliente) => {
        if(cliente && cliente.senha === senha){
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
    console.log('Cliente req.body: ', req.body);
    const { email, senha, nome, dataNascimento, endereco, telefone } = req.body;
    Cliente.createCliente(email, senha, nome, dataNascimento, endereco, telefone, () => {
        res.send('Cliente cadastrado com sucesso!');
    });
};