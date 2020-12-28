const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.json('index');
});

router.get('/about',(req, res) => {
    res.json('about');
});

module.exports = router;