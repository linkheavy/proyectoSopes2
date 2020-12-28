const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/videojuegos',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Ingrese un nombre' });
    }
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe ser mayor a 4 caracteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        var Request = require("request");
        let promise = new Promise((resolve, reject) => {
            Request.post({
                "headers": { "content-type": "application/json" },
                "url": "http://localhost:8000/users/signup",
                "body": JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "confirm_password": confirm_password
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
            req.flash('success_msg', 'Registrado satisfactoriamente!');
            res.redirect('/users/signin');
        }).catch(() =>{
            req.flash('error_msg', 'El email ya esta registrado');
            res.redirect('/users/signup');
        });
    }
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;