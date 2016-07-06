/* global describe, it */

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
require('sinon-mongoose');
const Todo = require('../models/todo.js');

desrcibe('Get all todos', function () {
  it('should return all todos', function (done) {
    var todoMock = sinon.mock(Todo);
    var expected = {status: true, todo: []};
    todoMock.expects('find').yields(null, expected);
    Todo.find(function (err, result) {
      todoMock.verify();
      todoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if it fails to return todos', function (done) {
    var todoMock = sinon.mock(Todo);
    var expected = {status: false, error: 'Oops!'};
    todoMock.expects('find').yields(expected, null);
    Todo.find(function (err, result) {
      todoMock.verify();
      todoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Post new todo', function () {
  it('should save a new todo', function (done) {
    var todoMock = sinon.mock(new Todo({todo: 'Sample todo'}));
    var todo = todoMock.object;
    var expected = {status: true};
    todoMock.expect('save').yields(null, expected);
    todo.save(function (err, result) {
      todoMock.verify();
      todoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if post not saved', function (done) {
    var todoMock = sinon.mock(new Todo({todo: 'Test todo'}));
    var todo = todoMock.object;
    var expected = {status: false};
    todoMock.expect('save').yields(expected, null);
    todo.save(function (err, result) {
      todoMock.verify();
      todoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Update a todo based on ID', function () {
  it('should update the todo', function (done) {
    var todoMock = sinon.mock(new Todo({completed: true}));
    var todo = todoMock.object;
    var expected = {status: true};
    todoMock.expects('save').withArgs({_id: 12345}).yields(null, expected);
    todo.save(function (err, result) {
      todoMock.verify();
      todoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if todo is not updated', function (done) {
    
  });
});
