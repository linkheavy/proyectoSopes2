const express = require('express');
const router = express.Router();

const Videojuego = require('../models/Videojuego');
const Game = require('../models/Game');

router.get('/videojuegos/agregar', (req, res) =>{
    res.render('videojuegos/new-game');
});

router.post('/videojuegos/new-game', async(req,res) => {
    const {nombre, descripcion, genero, descargas} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({text: 'Agrega un nombre para el videojuego'});
    }
    if(!descripcion){
        errors.push({text: 'Agregue una descripción para el videojuego'});
    }
    if(!genero){
        errors.push({text: 'Agregue un genero'});
    }
    if(errors.length>0){
        res.render('videojuegos/new-game', {
            errors,
            nombre,
            descripcion,
            genero
        });
    } else {
        const newGame = new Videojuego({nombre,descripcion,genero,descargas});
        await newGame.save();
        req.flash('success_msg', 'Videojuego creado satisfactoriamente');
        res.redirect('/videojuegos');
    }
});

router.get('/videojuegos', async(req,res)=>{
    const games = await Videojuego.find().lean();
    res.render('videojuegos/all-games', { games });
});

router.get('/videojuegos/descargas', async(req,res) => {
    const games = await Videojuego.find().lean();
    res.render('videojuegos/download-game', { games });
});

router.delete('/videojuegos/eliminar/:id', async(req, res) => {
    await Videojuego.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Videojuego eliminado');
    res.redirect('/videojuegos');
});

router.post('/videojuegos/descargar/:id', async(req,res) =>{
    const descargas = await Videojuego.findById(req.params.id);
    descargas.descargas = descargas.descargas+1;
    await Videojuego.findByIdAndUpdate(req.params.id, descargas);
    var nombre = descargas.nombre;
    var descripcion = descargas.descripcion;
    var genero = descargas.genero;
    const newGame = new Game({nombre, descripcion, genero});
    newGame.user = req.user.id;
    await newGame.save();
    req.flash('success_msg', 'Juego descargado satisfactoriamente');
    res.redirect('/videojuegos/descargas');
});

module.exports = router;