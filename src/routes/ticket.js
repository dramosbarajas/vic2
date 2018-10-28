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
router.post('/ticket', async (req, res, next) => {
    await Ticket.update({},{rol:'Cerrado'},{multi:true}); //Cambia el rol del ticket para que solo haya uno abierto.
    let ticketsOpen = await Ticket.find({rol:"Abierto"}); //Comprueba si hay algún ticket abierto
    if(ticketsOpen.length === 0){
        let newTicket = new Ticket();
        newTicket.descripcion = req.body.descripcion;
        await newTicket.save (async (err, ticket) => {

            if (err) {
                res.json({
                    ok:false,
                    msj: "Algo ha fallado",
                })
            }
            if(ticket){
                let tickets =  await Ticket.find().sort({fechaCreacion:-1});
                res.json({
                    ok:true,
                    ticket,
                    tickets
                })
            }
        });
    }

});

router.put('/ticket', async (req, res, next) => {
    await Ticket.update({},{rol:'Cerrado'},{multi:true}); //Cierra todos los tickets que haya
    await Ticket.findByIdAndUpdate({_id:req.body.id},{rol:"Abierto"}, async (err, ticket) => {
        if(err){
            res.json({
                ok:false,
                msj: "Algo ha fallado",
            })
        }
        if(ticket){
            let tickets =  await Ticket.find().sort({fechaCreacion:-1});
            res.json({
                ok:true,
                tickets
            })
        }
    })
});

router.delete('/ticket', (req, res, next) => {
    res.send("Eliminar tickets")
});

module.exports = router;