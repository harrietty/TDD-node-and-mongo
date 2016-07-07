const expect = require('chai').expect;
import _ from 'lodash';
import deepFreeze from 'deep-freeze';
import {reducer, initialState} from '../src/reducer/index';
import * as types from '../src/actions/types';

const testState = _.cloneDeep(initialState);
deepFreeze(testState);

describe('The reducer', function () {
  it('exists', function () {
    expect(reducer).to.be.a('function');
  });
  it('returns the initial state if no action passed', function() {
    expect(reducer(testState)).to.eql(testState);
  });

  describe('When passed REQUEST_TODO_LIST', function () {
    const action = {
      type: types.REQUEST_TODO_LIST
    };
    it('updates and returns the state', function () {
      expect(reducer(testState, action).isUpdatingTodoList).to.be.true;
    });
    it('does not mutate the original state or action', function () {
      expect(testState).to.eql(testState);
      expect(action).to.eql({
        type: types.REQUEST_TODO_LIST
      });
    });
  });

  describe('When passed RECEIVE_TODO_LIST', function () {
    const action = {
      type: types.RECEIVE_TODO_LIST,
      todos: 'list here'
    };
    it('updates and returns the state', function () {
      expect(reducer(testState, action).isUpdatingTodoList).to.not.be.true;
      expect(reducer(testState, action).todos).to.equal('list here');
    });
    it('does not mutate the original state or action', function () {
      expect(testState).to.eql(testState);
      expect(action).to.eql({
        type: types.RECEIVE_TODO_LIST,
        todos: 'list here'
      });
    });
  });

  describe('When passed CANNOT_GET_LIST', function () {
    const action = {
      type: types.CANNOT_GET_LIST,
      error: 'Oops'
    };
    it('updates and returns the state', function () {
      expect(reducer(testState, action).isUpdatingTodoList).to.be.false;
      expect(reducer(testState, action).fetchError).to.equal('Oops');
    });
    it('does not mutate the original state or action', function () {
      expect(testState).to.eql(testState);
      expect(action).to.eql({
        type: types.CANNOT_GET_LIST,
        error: 'Oops'
      });
    });
  });

  describe('When passed POST_SUCCESS', function () {
    const action = {
      type: types.POST_SUCCESS,
      todo: {todo: 'sample'}
    };
    it('updates and returns the state', function () {
      expect(reducer(testState, action).todos).to.eql([{todo: 'sample'}]);
    });
    it('does not mutate the original state or action', function () {
      expect(testState).to.eql(testState);
      expect(action).to.eql({
        type: types.POST_SUCCESS,
        todo: {todo: 'sample'}
      });
    });
  });

  describe('When passed SUBMIT_ERROR', function () {
    const action = {
      type: types.SUBMIT_ERROR,
      error: 'Oops'
    };
    it('updates and returns the state', function () {
      expect(reducer(testState, action).submitError).to.equal('Oops');
    });
    it('does not mutate the original state or action', function () {
      expect(testState).to.eql(testState);
      expect(action).to.eql({
        type: types.SUBMIT_ERROR,
        error: 'Oops'
      });
    });
  });
});
