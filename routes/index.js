'use strict';

var express = require('express');
var router = express.Router();
let todos = require('../models/todos');
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/', (req, res, next) => {
  res.json(todos.listPeople());
  next();
});

router.post('/:name/tasks', (req, res, next) => {
  if (req.body.content === '') res.sendStatus(400);
  else {
    let task = todos.add(req.params.name, req.body);
    res.status(201).json(task);
  }
});

router.get('/:name/tasks', (req, res, next) => {
  res.json(todos.list(req.params.name));
  next();
});

