var todos = {}

module.exports = {
  add: function(person, todo) {
    todo.complete = false
    if(!todos[person])
      todos[person] = [todo]
    else
      todos[person].push(todo)
  },
  remove: function(person, index) {
    todos[person].splice(index, 1)
  },
  complete: function(person, index) {
    todos[person][index].complete = true
  },
  list: function(person) {
    return todos[person] || []
  },
  listPeople: function() {
    return Object.keys(todos)
  },
  reset: function() {
    todos = {}
  }
}
