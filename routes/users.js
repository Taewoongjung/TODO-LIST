const express = require('express');
const User = require('../models/user');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {name, password} = req.body;
    const paramID = name;
    const psw = password;
    console.log(paramID, psw);
    req.session.user = {
        name: paramID,
        password: psw,
        authorized: true
    };
    console.log(req.session);
    res.redirect(307, '/profile');
});
module.exports = router;