/**
 * @author David Ramos
 * @email dramosbarajas@gmail.com
 * @create date 2018-09-12 10:44:01
 * @modify date 2018-09-12 10:44:01
 * @desc Controlador de rutas para el perfil.
 */

const express = require('express');
const router =  express.Router();
const User = require('../models/user');
const helper = require('../helpers/helpers');
//Ruta para actualizar los datos del usuario

/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', yourExactHostname);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});*/
router.put('/profile/editProfile', isAuthenticated ,async (req, res, next )=>{
    await User.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre , apellido: req.body.apellido }, {new:true} ,(err, usuario) => {
        if(err || !usuario){
            return res.json({
                status : 501,
                msj : "Se ha producido un error al procesar su solicitud."
            })
        }
        if(usuario){
            return res.json({
                status:200,
                msj:"Perfil modificado correctamente.",
                usuario : helper.editObject(usuario),
            })
        }
    });

});

//Ruta para el cambio de contraseña
router.get('/changePass', isAuthenticated, (req , res, next) =>{
    res.render('access.ejs');
});
router.put('/changePass', isAuthenticated, async (req , res, next) =>{
    let flagPass = true;
    let password = User.changePassword(req.body.pass);
    await User.findByIdAndUpdate(req.body.id,{password : password, passChanged : flagPass},(err,usuario) => {
        if(err) {
            res.json({
                status: 'Error',
                msj: "Algo ha fallado",
            });
        }
        if(usuario){
            res.json({
                status: 'Ok',
                msj:"Contraseña modificada",
            })
        }
    })
});
//TODO mover este metodo a otro controlador y la funcion de autenticacion implementarla dentro de un middleware para no repetir codigo

function isAuthenticated(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;