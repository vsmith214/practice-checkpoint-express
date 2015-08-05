var request = require('supertest-as-promised')(require('../app'))
var expect = require('chai').expect
var todos = require('../models/todos')


describe('Todo routes', function() {
  beforeEach(function() {
    todos.reset()
  })

  describe('/', function() {
    xit('responds with an empty array when app boots', function() {
      /*
       * when we make requests to `/` we will get back an empty array
       * */
       return request
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql([])
        })
    })

    xit('responds with a person after a task has been added', function() {
      todos.add('zeke', { name: 'a task' })
      return request
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql(['zeke'])
        })
    })

  })

  describe('/:person', function() {
    xit('lists tasks for a user with a get request', function() {
      todos.add('bob', { name: 'task for bob' })
      return request
        .get('/bob')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.have.length(1)
          expect(res.body[0].name).to.equal('task for bob')
          expect(res.body[0].complete).to.equal(false)
        })
    })

    xit('adds to the person\'s task list with a post request', function() {
      return request
        .post('/sarah')
        .send({ name: 'one of sarah\'s tasks'})
        .expect(201)
        .expect(function(res) {
          expect(res.body.name).to.equal('one of sarah\'s tasks')
          expect(todos.list('sarah')).to.have.length(1)
        })
    })

    describe('filtering by status', function () {
      beforeEach(function () {
        todos.add('billy', {name: 'learn about req.query'})
        todos.complete('billy', 0);
        todos.add('billy', {name: 'enable requests for specific todos'})
      });

      xit('can get only completed tasks', function () {
        return request
          .get('/billy?status=complete')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            expect(res.body).to.have.length(1)
            expect(res.body[0].name).to.equal('learn about req.query')
          })
      })

      xit('can get only not completed tasks', function () {
        return request
          .get('/billy?status=active')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            expect(res.body).to.have.length(1)
            expect(res.body[0].name).to.equal('enable requests for specific todos');
          })
      })
    })

    describe('/:index', function()  {
      xit('marks a task as complete with a put request', function() {
        todos.add('seema', {})
        todos.add('seema', {})
        todos.add('seema', {})

        return request
          .put('/seema/2')
          .expect(200)
          .expect(function() {
            expect(todos.list('seema')[2].complete).to.be.true
          })
      })

      xit('removes a task with a delete request', function() {
        todos.add('david', {})
        todos.add('david', {})
        todos.add('david', {})

        return request
          .delete('/david/2')
          .expect(204)
          .expect(function() {
            expect(todos.list('david')).to.have.length(2)
          })
      })
    })
  })
 })
