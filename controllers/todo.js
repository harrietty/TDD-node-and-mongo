var Todo = require('../models/todo');

const todoCtrl = {
  GetTodos: function (req, res) {
    Todo.find({}, function (err, todos) {
      if (err) {
        res.json({status: false, error: 'Oops!'});
        return;
      } else {
        res.json({status: true, todos: todos});
      }
    });
  },
  PostTodo: function (req, res) {
    var todo = new Todo(req.body);
    todo.save(function (err, todo) {
      if (err) {
        res.json({status: false, error: 'Oops!'});
        return;
      } else {
        res.json(todo);
      }
    });
  },
  UpdateTodo: function (req, res) {
    var completed = req.body.completed;
    Todo.findById(req.params.id, function (err, todo) {
      todo.completed = completed;
      todo.save(function (err, todo) {
        if (err) {
          res.json({status: false, error: 'Oops!'});
          return;
        } else {
          res.json(todo);
        }
      });
    });
  },
  DeleteTodo: function (req, res) {
    Todo.remove({_id: req.params.id}, function (err, todos) {
      if (err) {
        res.json({status: false, error: 'Oops!'});
        return;
      } else {
        res.json({status: true, message: 'Deleted successfully'});
      }
    });
  }
};

module.exports = todoCtrl;
