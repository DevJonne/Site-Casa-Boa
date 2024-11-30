exports.dashboard = (req, res) => {
    if(!req.user || req.user.tipo !== 'vendedor'){
        return res.redirect('/login');
    }
    console.log('Usuário vendedor autenticado:', req.user); 
    //if(req.user && req.user.tipo === 'vendedor'){
        res.render('vendedor');
    //}
}