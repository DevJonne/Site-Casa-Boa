const db = require('../config/database');

class Imovel {
    static getCategoriasComImoveis(){
        return new Promise((resolve, reject) => {
            //Busca todas as categorias
            const categoriasQuery = 'SELECT * FROM Categorias;';
            console.log('Executando query para getCategoriasComImoveis:', categoriasQuery);
            db.query(categoriasQuery, (err, categorias) => {
                if(err){ 
                    console.error('Erro na query getCategoriasComImoveis:', err);
                    return reject(err);
                }

                //Para cada categoria, busca os imóveis relacionados
                const promises = categorias.map(categoria => {
                    const imoveisQuery = `SELECT * FROM Imoveis WHERE idCategorias = ?;`;

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
    static getFavoritosPorCliente(idCliente, callback){
        const query = `
            SELECT Imoveis.* FROM Imoveis
            JOIN Favoritos ON Imoveis.idImovel = Favoritos.idImovel
            WHERE Favoritos.idCliente = ?;
        `;
        db.query(query, [idCliente], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }
    static getById(idImovel, callback){
        const query = 'SELECT * FROM Imoveis WHERE idImovel = ?;';
        db.query(query, [idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results[0]);
        });
    }
        
}

module.exports = Imovel;