const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try{
            const users = await User.findAll();
            res.render('index', { users });
        } catch (err) {
            console.log(err);
            next(err);
        }
    });

module.exports = router;