const Imovel = require('../models/Imovel');

router.get('/buscar', (req, res) => {
    const termo = req.query.termo;

    const criterios = [];
    if(termo.match(/casa|apartamento|sitio/i)){
        criterios.push(`categoria LIKE '%${termo}%'`);
    }
    if(termo.match(/\b(quartos|banheiros|ampla)\b/i)){
        criterios.push(`Descricao_detalhada LIKE '%${termo}%'`);
    }
    if(termo.match(/abaixo de (\d+)/i)){
        const valor = parseFloat(RegExp.$1);
        criterios.push(`Preco < ${valor}`);
    }
    if(termo.match(/acima de (\d+)/i)){
        const valor = parseFloat(RegExp.$1);
        criterios.push(`Preco > ${valor}`);
    }
    if(termo.match(/entre (\d+) e (\d+)/i)){
        const min = parseFloat(RegExp.$1);
        const max = parseFloat(RegExp.$2);
        criterios.push(`Preco BETWEEN ${min} AND ${max}`);
    }

    const query = `SELECT * FROM Imoveis WHERE ${criterios.join(' AND ')}`;

    Imovel.query(query, (err, imoveis) => {
        if(err){
            console.error('Erro ao buscar imóveis: ', err);
            return res.status(500).json({ erro: 'Erro ao buscar imóveis. '});
        }
        res.json({ imoveis });
    });
});