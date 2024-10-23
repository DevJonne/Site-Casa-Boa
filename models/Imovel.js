const db = require('../config/database');

class Imovel {
    static getApartamentos(callback){
        const query = `
            SELECT Imovel.Descricao
            FROM Imovel
            INNER JOIN Categorias ON Imovel.idCategorias = Categorias.idCategorias
            WHERE Categorias.Nome = 'apartamento';
        `;

        db.query(query, (err, results) => {
            if(err){
                console.error(err);
                callback(err, null);
            }else{
                callback(null, results);
            }
        });
    }
}

module.exports = Imovel;