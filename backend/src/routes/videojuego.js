const express = require('express');
const router = express.Router();

const Videojuego = require('../models/Videojuego');
const Game = require('../models/Game');

router.post('/videojuegos/new-game', async (req, res) => {
    const { nombre, descripcion, genero, descargas } = req.body;
    const newGame = new Videojuego({ nombre, descripcion, genero, descargas });
    await newGame.save();
    res.json({ "estado": "true" });
});

router.get('/videojuegos', async (req, res) => {
    const games = await Videojuego.find().lean();
    //console.log(games);
    res.json(games);
});

router.delete('/videojuegos/eliminar/:id', async (req, res) => {
    await Videojuego.findByIdAndDelete(req.params.id);
    res.json('Eliminación finalizada');
});

router.post('/videojuegos/descargar', async (req, res) => {
    const { id, usuario } = req.body;
    const descargas = await Videojuego.findById(id);
    descargas.descargas = descargas.descargas + 1;
    await Videojuego.findByIdAndUpdate(id, descargas);
    var nombre = descargas.nombre;
    var descripcion = descargas.descripcion;
    var genero = descargas.genero;
    const newGame = new Game({ nombre, descripcion, genero });
    newGame.user = usuario;
    await newGame.save();
    res.json('descarga finalizada');
});

module.exports = router;