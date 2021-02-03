const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const { name, id } = req.user;

    console.log('todo에 들어와서 name: ', name);
    console.log('todo에 들어와서 id: ', id);
    res.render('todo', {me: name, id:id});
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
    console.log('여기 안들어온다고?');
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
})

router.delete('/delete', async (req, res, next) => {
    const id = req.body.todo_id;
    console.log('이거 : ', id);
    Todo.destroy({where: {id}});
    res.send();
})

router.get('/go-back', async (req, res) => {

    res.redirect('/profile');
});

module.exports = router;