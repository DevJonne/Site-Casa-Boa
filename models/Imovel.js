const db = require('../config/database');

class Imovel {
    /*static getApartamentos(callback){
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
    }*/
    static getCategoriasComImoveis(){
        return new Promise((resolve, reject) => {
            //Busca todas as categorias
            const categoriasQuery = 'SELECT * FROM Categorias;';

            db.query(categoriasQuery, (err, categorias) => {
                if(err) return reject(err);

                //Para cada categoria, busca os imóveis relacionados
                const promises = categorias.map(categoria => {
                    const imoveisQuery = `SELECT * FROM Imovel WHERE idCategorias = ?;`;

                    return new Promise((resolve, reject) => {
                        db.query(imoveisQuery, [categoria.idCategorias], (err, imoveis) => {
                            if(err) return reject(err);
                            resolve({
                                categoria,
                                imoveis
                            });
                        });
                    });
                });
                Promise.all(promises).then(results => resolve(results)).catch(err => reject(err));
            });
        });
    }
    
}

module.exports = Imovel;