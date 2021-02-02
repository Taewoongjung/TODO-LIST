const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const { name } = req.body;
    res.render('todo', {me: name});
})

router.get('/showlist', async (req, res, next) => {
    console.log('@@@');
    const id = req.user.id;
    console.log('이거 : ', id);
    const lists = await Todo.findAll({
        where: {commenter: id},
        // order: ['order'],
    });
    res.send(JSON.stringify({ len: lists.length, todo: lists }));
})

router.post('/', async (req, res, next) => {
    const id = req.user.id;
    console.log('this : ', id);
    try{
        const todo = await Todo.create({
            commenter: req.user.id,
            comment: req.body.todo,
        });
        console.log(todo);
        res.status(201).json(todo);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;