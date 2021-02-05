const express = require('express');
const path = require('path');
const Todo = require('../models/todo');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
      const todo = await Todo.create({
        commenter: req.body.id,
        comment: req.body.todo,
      });
      console.log(todo);
      res.status(201).json(todo);
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;