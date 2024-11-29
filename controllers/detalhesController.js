const Imovel = require('../models/Imovel');
const Imagem = require('../models/Imagem');

exports.renderImovelDetalhes = (req, res) => {
    const idImovel = parseInt(req.params.idImovel);
    const previousUrl = req.headers.referer || '/';

    if(isNaN(idImovel)){
        return res.status(400).send('ID do imóvel inválido.');
    }

    Imovel.getById(idImovel, (err, imovel) => {
        if(err){
            console.error('Erro ao buscar imóvel: ', err);
            return res.status(500).send('Erro ao buscar imóvel.');
        }

        if(!imovel){
            return res.status(404).send('Imóvel não encontrado.');
        }

        Imagem.getByImovelId(idImovel, (err, imagens) => {
            if(err){
                console.error('Erro ao buscar imagens do imóvel: ', err);
                return res.status(500).send('Erro ao carregar imagens do imóvel.');
            }

            imagens = imagens.map((imagem) => {
                return{
                    url: `data:image/jpeg;base64, ${imagem.dados.toString('base64')}`,
                    descricao: imagem.descricao || '',
                };
            });

            console.log('Imagens do imóvel:', imagens);
            res.render('visitar', { imovel, imagens, previousUrl });
        });
    });
}
