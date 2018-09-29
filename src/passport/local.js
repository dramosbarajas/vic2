const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user , done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id , done) => {
    const user = await User.findById(id);
    done(null, user);
});
//Registro
passport.use('local-signup', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
} , async (req, email, password, done) => {

    const user = await User.findOne({email:email});
    if(user){
        return done(null, null, req.flash('signupMessage' , 'El email ya existe'));
    }
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);
}));

passport.use('local-signin', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
} , async (req, email, password, done) => {

    const user = await User.findOne({email:email});
    if(!user){
        return  done(null, null, req.flash('signinMessage', 'Error en la autenticación'));
    }

    if(!user.comparePassword(password)){
        return  done(null, null, req.flash('signinMessage', 'Error en la autenticación'));
    }

    done(null, user);
}));