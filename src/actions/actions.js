import axios from 'axios';
import * as types from './types';

export const actions = {
  requestTodoList: () => {
    return {
      type: types.REQUEST_TODO_LIST
    };
  },
  receiveTodoList: (data) => {
    return {
      type: types.RECEIVE_TODO_LIST,
      todos: data
    };
  },
  cannotGetList: (error) => {
    return {
      type: types.CANNOT_GET_LIST,
      error
    };
  },
  postSuccess: (todo) => {
    return {
      type: types.POST_SUCCESS,
      todo
    };
  },
  updateSuccess: (todo) => {
    return {
      type: types.UPDATE_SUCCESS,
      todo
    };
  },
  deleteSuccess: (id) => {
    return {
      type: types.DELETE_SUCCESS,
      id
    };
  },
  submitError: (error) => {
    return {
      type: types.SUBMIT_ERROR,
      error
    };
  },
  fetchTodos: () => {
    return (dispatch) => {
      dispatch(actions.requestTodoList());
      return axios.get('/api/todos')
      .then(response => {
        dispatch(actions.receiveTodoList(response.data.todos));
      })
      .catch(error => {
        dispatch(actions.cannotGetList('Cannot fetch todos at this time.'));
      });
    }
  },
  postTodo: (todo) => {
    return (dispatch) => {
      return axios.post('/api/todo', todo)
      .then(response => {
        dispatch(actions.postSuccess(response.data));
      })
      .catch(error => {
        dispatch(actions.submitError(error));
      });
    }
  },
  updateTodo: (id, completed) => {
    return (dispatch) => {
      return axios.put(`/api/todo/${id}`, {completed})
      .then(response => {
        dispatch(actions.updateSuccess(response.data));
      })
      .catch(error => {
        dispatch(actions.submitError(error));
      })
    }
  },
  deleteTodo: (id) => {
    return (dispatch) => {
      return axios.delete(`/api/todo/${id}`)
      .then(response => {
        dispatch(actions.deleteSuccess(response.data.id));
      })
      .catch(error => {
        dispatch(actions.submitError(error));
      });
    }
  }
};
