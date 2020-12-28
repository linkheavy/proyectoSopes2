const express = require('express');
const router = express.Router();

const Videojuego = require('../models/Videojuego');
const Game = require('../models/Game');

router.get('/videojuegos/agregar', (req, res) => {
    res.render('videojuegos/new-game');
});

router.post('/videojuegos/new-game', (req, res) => {
    const { nombre, descripcion, genero, descargas } = req.body;
    const errors = [];
    if (!nombre) {
        errors.push({ text: 'Agrega un nombre para el videojuego' });
    }
    if (!descripcion) {
        errors.push({ text: 'Agregue una descripción para el videojuego' });
    }
    if (!genero) {
        errors.push({ text: 'Agregue un genero' });
    }
    if (errors.length > 0) {
        res.render('videojuegos/new-game', {
            errors,
            nombre,
            descripcion,
            genero
        });
    } else {
        var Request = require("request");
        let promise = new Promise((resolve, reject) => {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": "http://localhost:8000/videojuegos/new-game",
                "body": JSON.stringify({
                    "nombre": nombre,
                    "descripcion": descripcion,
                    "genero": genero,
                    "descargas": descargas
                })
            }, (error, response, body) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve("correcto");
            });
        });
        promise.then((successMessage) => {
            req.flash('success_msg', 'Videojuego creado satisfactoriamente');
            res.redirect('/videojuegos');
        }).catch(() => {
            req.flash('error_msg', 'No se pudo agregar el videojuego');
            res.redirect('/videojuegos');
        });
    }
});

router.get('/videojuegos', (req, res) => {
    var Request = require("request");
    let promise = new Promise((resolve, reject) => {
        Request.get("http://localhost:8000/videojuegos", (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(JSON.parse(body))
        });
    });
    promise.then((games) => {
        res.render('videojuegos/all-games', { games });
    }).catch(() => {
        console.log("error");
        res.send('error');
    });

});

router.get('/videojuegos/descargas', (req, res) => {
    var Request = require("request");
    let promise = new Promise((resolve, reject) => {
        Request.get("http://localhost:8000/videojuegos", (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(JSON.parse(body))
        });
    });
    promise.then((games) => {
        res.render('videojuegos/download-game', { games });
    }).catch(() => {
        console.log("error");
        res.send('error');
    });
});

router.delete('/videojuegos/eliminar/:id', async (req, res) => {
    await Videojuego.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Videojuego eliminado');
    res.redirect('/videojuegos');
});

router.post('/videojuegos/descargar/:id', (req, res) => {
    var Request = require("request");
    let promise = new Promise((resolve, reject) => {
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:8000/videojuegos/descargar",
            "body": JSON.stringify({
                "id": req.params.id,
                "usuario": req.user.id
            })
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve("correcto");
        });
    });
    promise.then((successMessage) => {
        req.flash('success_msg', 'Juego descargado satisfactoriamente');
        res.redirect('/videojuegos/descargas');
    }).catch(() => {
        req.flash('error_msg', 'No se pudo descargar el videojuego');
        res.redirect('/videojuegos/descargas');
    });
});

module.exports = router;