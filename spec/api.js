/* global describe, it */

const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
require('sinon-mongoose');
const Todo = require('../models/todo.js');

describe('Get all todos', function () {
  it('should return all todos', function (done) {
    var TodoMock = sinon.mock(Todo);
    var expected = {status: true, todo: []};
    TodoMock.expects('find').yields(null, expected);
    Todo.find(function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if it fails to return todos', function (done) {
    var TodoMock = sinon.mock(Todo);
    var expected = {status: false, error: 'Oops!'};
    TodoMock.expects('find').yields(expected, null);
    Todo.find(function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Post new todo', function () {
  it('should save a new todo', function (done) {
    var TodoMock = sinon.mock(new Todo({todo: 'Sample todo'}));
    var todo = TodoMock.object;
    var expected = {status: true};
    TodoMock.expects('save').yields(null, expected);
    todo.save(function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if post not saved', function (done) {
    var TodoMock = sinon.mock(new Todo({todo: 'Test todo'}));
    var todo = TodoMock.object;
    var expected = {status: false};
    TodoMock.expects('save').yields(expected, null);
    todo.save(function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Update a todo based on ID', function () {
  it('should update the todo', function (done) {
    var TodoMock = sinon.mock(new Todo({todo: 'a thing'}));
    var todo = TodoMock.object;
    var expected = {status: true};
    TodoMock.expects('save').withArgs({_id: 12345}).yields(null, expected);
    todo.save({_id: 12345}, function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if todo is not updated', function (done) {
    var TodoMock = sinon.mock(new Todo({completed: true}));
    var todo = TodoMock.object;
    var expected = {status: false};
    TodoMock.expects('save').withArgs({_id: 12345}).yields(expected, null);
    todo.save({_id: 12345}, function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Delete a todo based on ID', function () {
  it('should delete the todo', function (done) {
    var TodoMock = sinon.mock(Todo);
    var expected = {status: true};
    TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expected);
    Todo.remove({_id: 12345}, function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
  it('should error if delete action fails', function (done) {
    var TodoMock = sinon.mock(Todo);
    var expected = {status: false};
    TodoMock.expects('remove').withArgs({_id: 12345}).yields(expected, null);
    Todo.remove({_id: 12345}, function (err, result) {
      TodoMock.verify();
      TodoMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
