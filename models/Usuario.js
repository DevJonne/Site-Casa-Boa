const db = require('../config/database');

class Usuario {
    static findByEmail(email, callback){
        const query = 'SELECT * FROM usuario WHERE email = ?;';

        db.query(query, [email], (err, results) => {
            if(err) throw err;
            callback(results[0]);
        });
    }
    
    static createUser(nome, email, senha, cpf, callback){
        const query = 'INSERT INTO usuario(nome, email, senha, cpf) VALUES (?, ?, ?, ?);';

        pool.query(query, [nome, email, senha, cpf], (err, results) => {
                if(err) throw err;
                callback(results);
            }
        );
    }
}

module.exports = Usuario;