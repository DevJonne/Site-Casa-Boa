const Imovel = require('../models/Imovel');
const Cliente = require('../models/Cliente');
const Favorito = require('../models/Favorito');
const Imagem = require('../models/Imagem');
const { detectarFormatoImagem } = require('../public/utils/imageUtils');

exports.renderHome = (req, res) => {
    const user = req.user; // Usuário logado
    console.log('Renderizando home para o usuário:', user);

    //Função auxiliar para renderizar a página
    const renderizarPagina = (imoveisFavoritos = []) => {
        //console.log('Renderizando com favoritos:', imoveisFavoritos);
        Imovel.getCategoriasComImoveis()
            .then((categoriasComImoveis) => {
                categoriasComImoveis.forEach(item => {
                    item.imoveis.forEach(imovel => {
                        if(imovel.imagem_principal){
                            //imovel.imagemURL = `data:image/${detectarFormatoImagem(imovel.imagem_principal)};base64, ${imovel.imagem_principal.toString('base64')}`;
                            imovel.imagemURL = `data:image/jpeg;base64, ${imovel.imagem_principal.toString('base64')}`;
                        }else {
                            // URL padrão para quando não houver imagem
                            imovel.imagemURL = '../assets/images/imagem-padrao02.svg';
                        }
                    });
                });
                //console.log('Categorias com imóveis carregadas:', categoriasComImoveis);
                res.render('home', { categoriasComImoveis, imoveisFavoritos, user });
            })
            .catch((err) => {
                //console.error('Erro ao buscar dados: ', err);
                res.status(500).send('Erro ao carregar imóveis.');
            });
    };

    //Se o usuáiro for cliente, busca os favoritos
    if(user && user.tipo === 'cliente'){
        console.log('Usuário cliente detectado.');
        Cliente.getIdClienteByUsuario(user.idUsuario, (err, idCliente) => {
            if(err){
                console.error('Erro ao buscar cliente: ', err);
                return res.status(500).send('Erro ao carregar imóveis.');
            } 
            console.log('ID do cliente encontrado: ', idCliente);
            Favorito.getFavoritosPorCliente(idCliente, (err, favoritos) => {
                if(err){
                    console.error('Erro ao buscar favoritos: ', err);
                    return res.status(500).send('Erro ao carregar imóveis.');
                }   
                console.log('Favoritos encontrados: ', favoritos);             
                renderizarPagina(favoritos);
            });
        });
    }else{
        console.log('Usuário não é cliente ou não está logado.');
        renderizarPagina();
    }
};

exports.renderImovelDetalhes = (req, res) => {
    const idImovel = parseInt(req.params.idImovel);

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

        Imagem.getBayImovelId(idImovel, (err, imagens) => {
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
            res.render('visitar', { imovel, imagens });
        });
    });
}

