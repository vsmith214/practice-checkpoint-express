
'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: () => Object.keys(tasks),
  add: (name, task) => {
    // saves a task for a given person
    if (!task.complete) task.complete = false;

    if (!tasks[name]) tasks[name] = [task];
    else {
      tasks[name] = [...tasks[name], task];
    }
  },
  list: name => tasks[name],
  complete: (name, idx) => tasks[name][idx].complete = true,
  remove: (name, idx) => {
    tasks[name] = tasks[name].filter(task => task.content !== tasks[name][idx].content);
  }
};