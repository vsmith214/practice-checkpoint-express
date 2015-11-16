var expect = require('chai').expect;

var todos = require('../models/todos');
describe('Todo model', function() {

  beforeEach(function() {
    todos.reset();
  });

  describe('listPeople and add', function() {
    xit('starts as an empty array', function() {
      expect(todos.listPeople()).to.eql([]);
    });

    xit('lists people after they have todos', function() {
      todos.add('zeke', { content: 'clean room' });
      expect(todos.listPeople()).to.eql(['zeke']);
    });
  });

  describe('add and list', function() {
    xit('remembers who does what', function() {
      todos.add('zeke', { content: 'clean bath room' });
      expect(todos.list('zeke')).to.have.length(1);
      todos.add('omri', { content: 'clean living room' });
      expect(todos.list('omri')).to.have.length(1);
    });
  });

  describe('complete', function() {
    xit('has a complete boolean set to false after adding tasks', function() {
      todos.add('zeke', { content: 'clean self' });
      expect(todos.list('zeke')[0].complete).to.be.false;
    });

    xit('sets the task\'s complete property to true when complete is called', function() {
      todos.add('zeke', { content: 'go to store' });
      todos.complete('zeke', 0);
      expect(todos.list('zeke')[0].complete).to.be.true;
    });
  });

  describe('remove', function() {
    xit('removes a person\'s task', function() {
       todos.add('zeke', { content: 'task 0' });
       todos.add('zeke', { content: 'task 1' });
       todos.add('zeke', { content: 'task 2' });
       todos.remove('zeke', 1);
       expect(todos.list('zeke')[1].content).to.equal('task 2');
    });
  });
});
