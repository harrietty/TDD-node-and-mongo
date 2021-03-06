var Todo = require('../models/todo');

const todoCtrl = {
  GetTodos: function (req, res) {
    Todo.find({}, function (err, todos) {
      if (err) {
        res.json({status: false, error: 'Oops!'});
        return;
      } else {
        res.status(200).json({status: true, todos: todos});
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
        res.status(201).json(todo);
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
        res.json({id: req.params.id});
      }
    });
  }
};

module.exports = todoCtrl;
