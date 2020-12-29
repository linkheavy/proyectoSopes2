const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

router.post('/games', async(req, res) => {
    const { id } = req.body;
    const games = await Game.find({user: id}).lean();
    res.json(games);
});


module.exports = router;