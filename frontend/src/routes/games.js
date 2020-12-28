const express = require('express');
const router = express.Router();

const Game = require('../models/Game');
const { isAuthenticated } = require('../helpers/auth');

router.get('/games', isAuthenticated, async(req, res) => {
    const games = await Game.find({user: req.user.id}).lean();
    res.render('videojuegos/mis-juegos', { games });
});

module.exports = router;