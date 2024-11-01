const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

class Usuario {
    static findByEmail(telefone, callback){
        pool.query('SELECT * FROM Cadastro WHERE telefone = ?', [telefone], (err, results) => {
            if(err) throw err;
            callback(results[0]);
        });
    }

    static createUser(nome, telefone, senha, callback) {
        pool.query('INSERT INTO Cadastro(nome, telefone, senha) VALUES (?, ?, ?)',
            [nome, telefone, senha], (err, results) => {
                if (err) {
                    console.error(err); // Log do erro
                    return callback(null); // Chama o callback com null em caso de erro
                }
                callback(results); // Chama o callback com o resultado
            }
        );
    }
}
 
module.exports = Usuario;