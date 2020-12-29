const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.json('indice');
});

router.get('/about',(req, res) => {
    res.json('acerca de');
});

module.exports = router;