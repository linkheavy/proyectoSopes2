const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    console.log(req.body);
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.json('Usuario registrado');
});

module.exports = router;