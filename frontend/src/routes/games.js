const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const { isAuthenticated } = require('../helpers/auth');

router.post('/games', isAuthenticated, async(req, res) => {
    console.log('usuario: ');
    console.log(req.user.id);
    var Request = require("request");
    let promise = new Promise((resolve, reject) => {
        Request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://34.70.68.14:8000/games",
            "body": JSON.stringify({
                "id": req.user.id
            })
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve("correcto");
        });
    });
    promise.then((games) => {
        req.flash('success_msg', 'Juego descargado satisfactoriamente');
        res.render('/videojuegos/mis-juegos',{ games });
    }).catch(() => {
        req.flash('error_msg', 'No se pudo descargar el videojuego');
        res.send('error');
    });
});

module.exports = router;