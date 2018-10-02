/**
 * @author David Ramos
 * @email dramosbarajas@gmail.com
 * @create date 2018-09-12 10:44:01
 * @modify date 2018-09-12 10:44:01
 * @desc Controlador de rutas para el perfil.
 */

const express = require('express');
const router =  express.Router();


//Ruta para actualizar los datos del usuario

/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', yourExactHostname);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});*/
router.put('/profile/editProfile', isAuthenticated , (req, res, next )=>{
    console.log(req.body);
    //TODO Logica para la actualización.
    res.json({
        status:200,
        msj:"Elemento modificado",
    })
});

function isAuthenticated(req, res, next ){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}

module.exports = router;