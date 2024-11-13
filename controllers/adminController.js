const db = require('../config/database');

exports.dashboard = (req, res) => {
    res.render('admin');
}

exports.consultarUsuarios = (req, res) => {
    db.query('SELECT * FROM Usuarios;', (err, results) => {
        if (err) throw err;
        res.render('admin/usuarios', { usuarios: results });
    });
};

exports.consultarClientes = (req, res) => {
    db.query('SELECT * FROM Clientes', (err, results) => {
        if(err) throw err;
        res.render('admin/clientes', { clientes: results });
    });
};

exports.consultarAgentes = (req, res) => {
    db.query('SELECT * FROM Agentes', (err, results) => {
        if(err) throw err;
        res.render('admin/kagentes', { agentes: results });
    });
};

exports.formAdicionarAgente = (req, res) => {
    res.render('admin/adicionarAgente');
};

exports.adicionarAgente = (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 10);

    db.query('INSERT INTO Usuarios (nome, email, senha, telefone, tipo) VALUES (?, ?, ?, ?, "agente");',
        [nome, email, hashedPassword, telefone],
        (err, results) => {
            if(err) throw err;
            res.redirect('admin/agentes');
        }
    );
};

exports.gerenciarCategorias = (req, res) => {
    db.query('SELECT * FROM Categorias;', (err, results) => {
        if(err) throw err;
        res.render('admin/categorias', { categorias: results });
    });
};

exports.gerenciarImoveis = (req, res) => {
    db.query('SELECT * FROM Imovies;', (err, results) => {
        if(err) throw err;
        res.render('admin/imoveis', { imoveis: results });
    });
};