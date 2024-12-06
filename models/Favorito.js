const db = require('../config/database');

class Favorito{
    static getFavoritosPorCliente(idCliente, callback){
        const query = `SELECT idimovel FROM Favoritos WHERE idCliente = ?;`;
        console.log('Executando query para getFavoritosPorCliente:', query);
        db.query(query, [idCliente], (err, results) => {
            if(err){ 
                console.error('Erro na query getFavoritosPorVliente: ', err);
                return callback(err, null);
            }
            console.log('Favoritos carregados para idCliente: ', results);
            callback(null, results);
        });
    }   

    static jaFavoritado(idCliente, idImovel, callback){
        const query = `SELECT COUNT(*) AS total FROM favoritos
            WHERE idcliente = ? AND idimovel = ?;`;
        db.query(query, [idCliente, idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results[0].total > 0);
        });
    }

    static addFavorito(idCliente, idImovel, callback){
        const query = `INSERT INTO favoritos (idcliente, idImovel) VALUES (?, ?);`;
        db.query(query, [idCliente, idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }

    static removerFavorito(idCliente, idImovel, callback){
        const query = `DELETE FROM favoritos WHERE idcliente = ? AND idimovel = ?;`;
        db.query(query, [idCliente, idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }
}

module.exports = Favorito;