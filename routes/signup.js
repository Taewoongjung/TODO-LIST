const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/signup.html'));
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/check-signup', isNotLoggedIn, async (req, res, next) => {
    const { name, password, check_psw } = req.body;
    try {
        const exUser = await User.findOne({ where: { name } });
        if( exUser ){
            return res.redirect('/signup/?error=same is exist');
        }
        else if(password !== check_psw){
            return res.redirect('/signup/?error=password not matched');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            name,
            password: hash,
        });
        return res.redirect('/?success=signup success');
    } catch(err){
        console.error(err);
        return next(err);
    }
});

module.exports = router;