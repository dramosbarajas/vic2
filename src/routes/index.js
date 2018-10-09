/**
 * @author David Ramos
 * @email dramosbarajas@gmail.com
 * @create date 2018-09-12 10:44:01
 * @modify date 2018-09-12 10:44:01
 * @desc Fichero que contiene las rutas principales de la app.
*/

const express = require('express');
const router =  express.Router();
const passport = require('passport');
const userModel = require('../models/user');

router.get('/',(req, res, next) => {
    res.render('signin');
});

router.get('/signup',(req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    passReqToCallback : true,
}));


router.get('/signin',(req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect : '/app',
    failureRedirect : '/signin',
    passReqToCallback : true,
}));

router.get('/profile', isAuthenticated , async (req, res, next) => {
    console.log(req.user);
    let userLogged = await userModel.findById(req.user._id, '-password');
    res.render('profile',{
        userLogged
    });
});

router.get('/app', isAuthenticated ,(req, res, next) => {
    res.render('app');
});

router.get('/logout', isAuthenticated ,(req, res, next) => {
    req.logout();
    res.redirect('/');
});

function isAuthenticated(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/signin");
}

module.exports = router;