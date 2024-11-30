const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const detalhesRoutes = require('./routes/detalhesRoutes');
const buscarRoutes = require('./routes/buscarRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');

const Usuario = require('./models/Usuario');

//Configurações
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variável global de sessão
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
}, (email, senha, done) => {
    if(!email || !senha){
        return done(null, false, { message: 'Credenciais ausentes.'});
    }
    Usuario.findByEmail(email, (usuario) => {
        //não está exibindo esta mensagem quando coloca as informações erradas no login
        if(!usuario) return done(null, false, { message: 'Usuário não encontrado' });
        
        //verifica a senha 
        /*bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
            if(err) return done(err);
            if(isMatch){ 
                // Verificar tipo de usuário
                //if (['admin', 'vendedor', 'cliente'].includes(usuario.tipo)) {
                    //return done(null, usuario);
                //}
                //return done(null, false, { message: 'Tipo de usuário inválido.' });
                return done(null, usuario);
            }  else{
                return done(null, false, { message: 'Senha incorreta!' });
            }
        });*/
        //
        // opção sem hash de senha...
        if(senha === usuario.senha){
            return done(null, usuario);
        }else{
            return done(null, false, { message: 'Senha incorreta!' });
        }
        //
    });
}));

// Middleware para redirecionar com base no tipo do usuário após autenticação
app.post('/login', (req, res, next) => {
    console.log('Tipo de usuario: ', req.user);
    console.log('Dados do formulário:', req.body);
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user){
            req.flash('error', info ? info.message : 'Erro ao fazer login');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if(err) return next(err);

            // Redireciona com base no tipo de usuário
            switch(user.tipo){
                case 'admin':
                    return res.redirect('/admin');
                case 'vendedor':
                    return res.redirect('/vendedor');
                case 'cliente':
                    return res.redirect('/cliente');
                default:
                    req.flash('error', 'Tipo de usuário inválido.');
                    return res.redirect('/login');
            }
        });
    })(req, res, next);
})

passport.serializeUser((user, done) => done(null, user.idUsuario));
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        if(err) return done(err);
        console.log('Usuário recuperado da sessão:', user);
        return done(null, user);
    });
});

app.set('view engine', 'ejs');

//Estilos
app.use(express.static('public'));

//Rotas
app.use('/', mainRoutes);
app.use('/', adminRoutes);
app.use('/', clienteRoutes);
app.use('/', detalhesRoutes);
app.use('/', buscarRoutes);
app.use('/', vendedorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na port ${PORT}`);
})
