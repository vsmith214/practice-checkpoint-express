var express = require('express')
var router = express.Router()
module.exports = router

var todos = require('../models/todos')

// list all the people on the team
router.get('/', function(req, res, next) {
  res.json(todos.listPeople())
})

router.use('/:person', require('./person'))
