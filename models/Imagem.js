const db = require('../config/database');

class Imagem {
    static getByImovelId(idImovel, callback){
        const query = 'SELECT * FROM Imagens WHERE idImovel = ?;';
        db.query(query, [idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }
}

module.exports = Imagem;