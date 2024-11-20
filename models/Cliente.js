const db = require('../config/database');
const Usuario = require('./Usuario');

class Cliente extends Usuario{
    constructor(id, email, senha, nome, dataNascimento, endereco, telefone){
        super(id, email, senha, 'cliente', nome);
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.telefone = telefone;
    }
    
    static createCliente(email, senha, nome, dataNascimento, endereco, telefone, callback){
        Usuario.createUser(email, senha, 'cliente', nome, (userResult) => {
            console.log('Usuário cadastrado com sucesso!');
            const idUsuario = userResult.insertId;
            console.log('id do usuario: ', idUsuario);

            const query = 'INSERT INTO Clientes (idUsuario, dataNascimento, endereco, telefone) VALUES (?, ?, ?, ?);';

            db.query(query, [idUsuario, dataNascimento, endereco, telefone], (err, results) => {
                if(err) throw err;
                console.log('Cliente criado: ', results);
                callback(results);
            });
        });
    }

    /**/static getIdClienteByUsuario(idUsuario, callback){
        const query = 'SELECT idCliente FROM Clientes WHERE idUsuario = ?;';

        db.query(query, [idUsuario], (err, results) => {
            if(err) return callback(err, null);
            if(results.lenght === 0) return callback(new Error('Cliente não encontrado'), null);
            callback(null, results[0].idCliente);
        });
    }

    static getIdClientePorIdUsuario(idUsuario){
        return new Promise((resolve, reject) => {
            const query = 'SELECT idCliente FROM Clientes WHERE idUsuario = ?;';
            db.query(query, [idUsuario], (err, results) => {
                if(err) return reject(err);
                if(results.lenght === 0) return callback(new Error('Cliente não encontrado'));
                resolve(results[0].idCliente);
            });
        });  
    }

    static addFavorito(idCliente, idImovel, callback){
            db.query('INSERT INTO Favoritos (idCliente, idImovel) VALUES (?, ?);',
            [idCliente, idImovel],
            (err, results) => {
                if(err) throw err;
                callback(null, results);    
            }
        );
    }
}

module.exports = Cliente;