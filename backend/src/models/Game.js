const mongoose = require('mongoose');
const { schema }  = mongoose;

const GameSchema = new mongoose.Schema({
    nombre: { type: String},
    descripcion: { type: String},
    genero: {type: String},
    user:{ type: String}
});

module.exports = mongoose.model('Game', GameSchema);