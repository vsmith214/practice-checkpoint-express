var express = require('express')
var router = express.Router({ mergeParams: true }) 
//mergeparams true means that we can access req.params that were defined in the parent router
module.exports = router

var todos = require('../models/todos')

router.get('/', function(req, res, next) {
  res.json(todos.list(req.params.person))
})

router.post('/', function(req, res, next) {
  todos.add(req.params.person, req.body)
})

router.put('/:index', function(req, res, next) {
  todos.complete(req.params.person, Number(req.params.index))
})

router.delete('/:index', function(req, res, next) {
  todos.remove(req.params.person, Number(req.params.index))
})
