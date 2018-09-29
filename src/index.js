/**
 * @author David Ramos
 * @email dramosbarajas@gmail.com
 * @create date 2018-09-12 10:35:06
 * @modify date 2018-09-12 10:35:06
 * @desc Servidor Node.js
*/

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require ('connect-flash');


//Inicializamos
const app = express();
require('./database');
require('./passport/local');

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('port', process.env.port || 3000);

// Middlewares 
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret: 'stringSecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname + '/public')));

app.use((req,res,next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes/index'));

//Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server', app.get('port'));
});

