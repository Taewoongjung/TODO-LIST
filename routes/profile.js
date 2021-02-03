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
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.render('profile', {me: name});
        });
    })(req, res, next);
});

router.get('/', async (req, res, next) => {
    const { name } = req.user;
    res.render('profile', {me: name});
})

router.get('/home', async (req, res, next) => {
    try{
        if(req.session && req.session.user) {
            req.session.destroy(
                function (err) {
                    if (err){
                        console.log('세션 삭제시 에러');
                        return;
                    }
                res.clearCookie('cookie-session');
                console.log('세션, 쿠키 삭제 성공');
                res.redirect('/');
                }
            )
        }
    } catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/gotolist', async (req, res, next) => {
    const id = req.user.id;
    console.log('>>>');
    console.log('여기서 보내기 : ', id);
    res.redirect('/todo');
})

module.exports = router;