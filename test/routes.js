var request = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
var todos = require('../models/todos');


describe('Todo routes', function() {
  beforeEach(function() {
    todos.reset();
  });

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
          expect(res.body).to.eql([]);
        });
    });

    xit('responds with a person after a task has been added', function() {
      todos.add('zeke', { content: 'a task' });
      return request
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql(['zeke']);
        });
    });

  });

  describe('/:person', function() {
    xit('lists tasks for a user with a get request', function() {
      todos.add('bob', { content: 'task for bob' });
      return request
        .get('/bob')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.have.length(1);
          expect(res.body[0].content).to.equal('task for bob');
          expect(res.body[0].complete).to.equal(false);
        });
    });

    xit('adds to the person\'s task list with a post request', function() {
      return request
        .post('/sarah')
        .send({ content: 'one of sarah\'s tasks'})
        .expect(201)
        .expect(function(res) {
          expect(res.body.content).to.equal('one of sarah\'s tasks');
          expect(todos.list('sarah')).to.have.length(1);
          expect(todos.list('sarah')[0].content).to.equal('one of sarah\'s tasks');
        });
    });

    describe('filtering by status', function () {
      beforeEach(function () {
        todos.add('billy', {content: 'learn about req.query'});
        todos.complete('billy', 0);
        todos.add('billy', {content: 'enable requests for specific todos'});
      });

      xit('can get only completed tasks', function () {
        return request
          .get('/billy?status=complete')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            expect(res.body).to.have.length(1);
            expect(res.body[0].content).to.equal('learn about req.query');
          });
      });

      xit('can get only active tasks', function () {
        return request
          .get('/billy?status=active')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            expect(res.body).to.have.length(1);
            expect(res.body[0].content).to.equal('enable requests for specific todos');
          });
      });
    });

    describe('/:index', function() {
      xit('marks a task as complete with a put request', function() {
        todos.add('seema', {});
        todos.add('seema', {});
        todos.add('seema', {});

        return request
          .put('/seema/2')
          .expect(200)
          .expect(function() {
            expect(todos.list('seema')[2].complete).to.be.true;
          });
      });

      xit('removes a task with a delete request', function() {
        todos.add('david', {});
        todos.add('david', {});
        todos.add('david', {});

        return request
          .delete('/david/2')
          .expect(204)
          .expect(function() {
            expect(todos.list('david')).to.have.length(2);
          });
      });
    });

    describe('errors', function() {
      xit('sends back a 404 if a user does not exist', function () {
        return request
          .get('/obama')
          .expect(404);
      });

      xit('sends back a 400 if you attempt to add a todo with non-standard field', function () {
        return request
          .post('/bob')
          .send({thisField: 'is neither `content` nor `complete` and so is not allowed'})
          .expect(400);
      });
    });
  });
 });
