var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var todoCtrl = require('../controllers/todo');

router.get('/todos', todoCtrl.GetTodos);

router.post('/todo', todoCtrl.PostTodo);

router.delete('/todo/:id', todoCtrl.DeleteTodo);

router.put('/todo/:id', todoCtrl.UpdateTodo);

module.exports = router;
