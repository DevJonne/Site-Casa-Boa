const db = require('../config/database');

class Usuario {
    constructor(email, senha, tipo, nome){
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.nome = nome;
    }

    static findByEmail(email, callback){
        const query = 'SELECT * FROM Usuarios WHERE email = ?;';

        db.query(query, [email], (err, results) => {
            if(err) throw err;
            callback(results[0]);
        });
    }

    static createUser(email, senha, tipo, nome, callback){
        const query = 'INSERT INTO Usuarios (email, senha, tipo, nome) VALUES (?, ?, ?, ?);';

        db.query(query, [email, senha, tipo, nome], (err, results) => {
            if(err) throw err;
            console.log('Usuario criado: ', results);
            callback(results);
        });
    }
}

module.exports = Usuario;