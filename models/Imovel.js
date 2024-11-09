const db = require('../config/database');

class Imovel {
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