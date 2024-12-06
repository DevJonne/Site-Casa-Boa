const db = require('../config/database');

exports.getAllCategorias = (callback) => {
    const query = 'SELECT * FROM categorias;';

    db.query(query, (err, results) => {
        if(err) throw err;
        callback(results);
    });
}; 

exports.createCategoria = (nome, callback) => {
    const query = 'INSERT INTO categorias (Nome) VALUES(?);';
    db.query(query, [nome], (err, result) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, result);
        }
    })
}