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

router.put('/edit', (req, res, next) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Wjdxodnd1@',
        database: 'mynode',
    });
    const prev_todo = req.body;
    connection.connect();
    let a = req.body;
    connection.query(
        `UPDATE todo SET comment="${a.new_todo}" WHERE id=${a.todo_id}`,
        (err, results, fields) => {
            console.log(err);
            console.log(results);
            console.log(fields);
        }
    )
    res.send(); 
})

router.delete('/delete', async (req, res, next) => {
    const id = req.body.todo_id;
    Todo.destroy({where: {id}});
    res.send();
})

router.put('/done', (req, res, next) => {
    const {todo_id, checked} = req.body;
    Todo.update({done: checked}, {where: {id: todo_id}})
        .then(res.send())
        .catch(err => {
            console.log(err);
            next(err);
        });
});

router.put('/order', async (req, res, next) => {
    try{
        const {
            prev_id,
            prev_order,
            new_id,
            new_order,
        } = req.body;
        console.log(prev_id, prev_order, new_id, new_order);
        await Todo.update({order: new_order}, {where: {id: prev_id}});
        await Todo.update({order: preve_order}, {where: {id: new_id}});
        res.send();
    }
    catch(err){
        consolel.log(err);
    }
})

router.get('/go-back', async (req, res) => {

    res.redirect('/profile');
});

module.exports = router;