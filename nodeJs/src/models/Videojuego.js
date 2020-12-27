const mongoose = require('mongoose');
const { schema } = mongoose;

const VideojuegoSchema = new mongoose.Schema({
    nombre: {type: String},
    descripcion: {type: String},
    genero: {type: String},
    descargas: {type: Number}
})

module.exports = mongoose.model('Videojuego', VideojuegoSchema);

