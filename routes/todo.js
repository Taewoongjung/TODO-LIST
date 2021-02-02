const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
    const { name } = req.body;
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?todoError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }  
            return res.render('todo', {me: name});
        });
    })(req, res, next);
});


module.exports = router;