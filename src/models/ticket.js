const mongoose = require('mongoose');
const { Schema } = mongoose;


const ticketSchema = new Schema({
    nombre : { type: String, lowercase: true,},
    fechaCreacion : { type: Date, trim: true , default : Date.now()},
    descripcion : { type: String, trim: true, default : ""},
    rol: { type : String, enum : ['Abierto', 'En Curso', 'Cerrado'], default:"Abierto"},
    active : { type : Boolean, default: true},
    importe : {type : Number, trim: true},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt' }});


module.exports = mongoose.model('tickets', ticketSchema);