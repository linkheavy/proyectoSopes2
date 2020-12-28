const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

router.get('/games', async(req, res) => {
    var id = req.query.id;
    const games = await Game.find({user: id}).lean();
    res.json(games);
});


module.exports = router;