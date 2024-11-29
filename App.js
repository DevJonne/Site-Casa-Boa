const express = require('express');
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

const Usuario = require('./models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
}, (email, senha, done) => {
    Usuario.findByEmail(email, (usuario) => {
        if(!usuario) return done(null, false, { message: 'Usuário não encontrado' });

        //verifica a senha 
        bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
            if(err) return done(err);
            if(isMatch) return done(null, usuario);
            return done(null, false, { message: 'Senha incorreta'});
        });
        /*
        // opção sem hash de senha...
        if(senha === usuario.senha){
            return done(null, usuario);
        }else{
            return done(null, false, { message: 'Senha incorreta!' });
        }
        */
    });
}));

passport.serializeUser((user, done) => done(null, user.idUsuario));
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => done(err, user));
});

//Configurações
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Variável global de sessão
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    res.locals.user = req.user || null;
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Estilos
app.use(express.static('public'));

//Rotas
app.use('/', mainRoutes);
app.use('/', clienteRoutes);
app.use('/', adminRoutes);
app.use('/', clienteRoutes);
app.use('/', detalhesRoutes);
app.use('/', buscarRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na port ${PORT}`);
})
