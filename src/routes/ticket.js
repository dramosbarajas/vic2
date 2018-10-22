/**
 * @author David Ramos
 * @email dramosbarajas@gmail.com
 * @create date 2018-10-21 19:44:01
 * @modify date 2018-10-21 19:44:01
 * @desc Controlador de rutas para la parte de tickets
 */

//TODO implementar la parte de la session

const express = require('express');
const router =  express.Router();
const Ticket = require('../models/ticket');
const helper = require('../helpers/helpers');

router.get('/tickets', async (req, res, next) => {
    //Saca los tickets ordenados por fecha.
    let tickets =  await Ticket.find().sort({fechaCreacion:-1});
    res.render('tickets/tickets',{tickets});
});

//Metodo para la creacion de un nuevo post.
//TODO faltaria por comprobar las que esten activas y cerrarlas
router.post('/ticket', async (req, res, next) => {
    //Comprueba si existe algun ticket con estado abierto
    let ticketsOpen = await Ticket.find({rol:"Abierto"});
    Ticket.update({active:true},{active:false},{multi:true});
    let newTicket = new Ticket();
    newTicket.descripcion = "Yo soy el ultimo";
    await newTicket.save((err, ticket) => {
        if (err) {
            res.json({
                ok:false,
                msj: "Algo ha fallado",
            })
        }
        if(ticket){
            res.json({
                ok:true,
                ticket
            })
        }
    });
});

router.put('/ticket', (req, res, next) => {
    res.send("Actualizar tickets")
});

router.delete('/ticket', (req, res, next) => {
    res.send("Eliminar tickets")
});

module.exports = router;