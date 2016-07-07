/* global describe, it */

const expect = require('chai').expect;
import {actions} from '../src/actions/actions';
import * as types from '../src/actions/types';

describe('Actions', function () {
  it('should exist', function () {
    expect(actions).to.be.an('object');
  });

  describe('actions.requestTodoList', function () {
    it('should be a method', function () {
      expect(actions.requestTodoList).to.be.a('function');
    });
    it('should return the correct action', function () {
      expect(actions.requestTodoList()).to.eql({
        type: types.REQUEST_TODO_LIST
      });
    });
  });

  describe('actions.receiveTodoList', function () {
    it('should be a method', function () {
      expect(actions.receiveTodoList).to.be.a('function');
    });
    it('should return the correct action', function () {
      expect(actions.receiveTodoList('data')).to.eql({
        type: types.RECEIVE_TODO_LIST,
        todos: 'data'
      });
    });
  });

  describe('actions.cannotGetList', function () {
    it('should be a method', function () {
      expect(actions.cannotGetList).to.be.a('function');
    });
    it('should return the correct action', function () {
      expect(actions.cannotGetList('error message')).to.eql({
        type: types.CANNOT_GET_LIST,
        error: 'error message'
      });
    });
  });

  describe('actions.postSuccess', function () {
    it('should be a method', function () {
      expect(actions.postSuccess).to.be.a('function');
    });
    it('should return the correct action', function () {
      expect(actions.postSuccess({todo: 'sample'})).to.eql({
        type: types.POST_SUCCESS,
        todo: {todo: 'sample'}
      });
    });
  });

  describe('actions.submitError', function () {
    it('should be a method', function () {
      expect(actions.submitError).to.be.a('function');
    });
    it('should return the correct action', function () {
      expect(actions.submitError('error message')).to.eql({
        type: types.SUBMIT_ERROR,
        error: 'error message'
    });
    });
  });
});
