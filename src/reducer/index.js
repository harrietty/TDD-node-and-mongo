import deepFreeze from 'deep-freeze';
import _ from 'lodash';
import * as types from '../actions/types';

export const initialState = {
  isUpdatingTodoList: false,
  todos: [],
  fetchError: false,
  submitError: false
};

export const reducer = (state = initialState, action = {}) => {
  deepFreeze(state);
  deepFreeze(action);
  const newState = _.cloneDeep(state);

  if (action.type === types.REQUEST_TODO_LIST) {
    newState.isUpdatingTodoList = true;
    return newState;
  }

  if (action.type === types.RECEIVE_TODO_LIST) {
    newState.isUpdatingTodoList = false;
    newState.todos = action.todos;
    return newState;
  }

  if (action.type === types.CANNOT_GET_LIST) {
    newState.isUpdatingTodoList = false;
    newState.fetchError = action.error;
    return newState;
  }

  if (action.type === types.POST_SUCCESS) {
    newState.todos.push(action.todo);
    return newState;
  }

  if (action.type === types.SUBMIT_ERROR) {
    newState.submitError = action.error;
    return newState;
  }

  if (action.type === types.UPDATE_SUCCESS) {
    const index = _.findIndex(newState.todos, todo => {
      return todo._id === action.todo._id;
    });
    newState.todos[index].completed = action.todo.completed;
    return newState;
  }

  if (action.type === types.DELETE_SUCCESS) {
    const index = _.findIndex(newState.todos, todo => {
      return todo._id === action.id;
    });
    newState.todos.splice(index, 1);
    return newState;
  }

  return state;
};
