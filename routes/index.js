'use strict';

var express = require('express');
var router = express.Router();
let todos = require('../models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  res.json(todos.listPeople());
});

router.get('/:name/tasks', (req, res, next) => {
  res.json(todos.list(req.params.name));
});

router.post('/:name/tasks', (req, res, next) => {
  todos.add(req.params.name, req.body);
  res.json(todos.list.filter(task => task.content === req.body.content));
})