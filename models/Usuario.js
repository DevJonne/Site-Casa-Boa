const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

class Usuario {
    static findByEmail(email, callback){
        pool.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
            if(err) throw err;
            callback(results[0]);
        });
    }
    
    static createUser(nome, email, senha, cpf, callback){
        pool.query('INSERT INTO usuario(nome, email, senha, cpf) VALUES (?, ?, ?, ?)',
            [nome, email, senha, cpf], (err, results) => {
                if(err) throw err;
                callback(results);
            }
        );
    }
}

module.exports = Usuario;