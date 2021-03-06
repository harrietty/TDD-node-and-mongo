import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions/actions';
require('../scss/list.scss');

const TodoList = React.createClass({
  componentWillMount: function () {
    this.props.loadTodos();
  },
  render: function () {
    let classN = '';
    const todos = this.props.state.todos.map((todo, i) => {
      if (todo.completed) classN = 'completed';
      else classN = '';
      return (
        <li key={i}>
          <div className={classN + ' todo-text'}>{todo.todo}</div>
          <div className='todo-check'>
          {todo.completed === false && (
            <input type='checkbox' onChange={this.props.handleChange} id={todo._id} />
          )}
          {todo.completed && (
            <input type='checkbox' checked='checked' onChange={this.props.handleChange} id={todo._id} />
          )}
          <span id={todo._id} onClick={this.props.deleteTodo} className='todo-delete'>Delete</span>
          </div>
        </li>
      );
    });
    return (
      <ul className='todo'>
        {todos}
      </ul>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => {
      dispatch(actions.fetchTodos());
    },
    handleChange: (e) => {
      dispatch(actions.updateTodo(e.currentTarget.id, e.currentTarget.checked))
    },
    deleteTodo: (e) => {
      dispatch(actions.deleteTodo(e.currentTarget.id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
