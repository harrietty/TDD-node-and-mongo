import React from 'react';
import {connect} from 'react-redux';
import {actions} from '../actions/actions';

const AddTodo = (props) => {
  let input;
  return (
    <div className='add-todo'>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) return;
        props.addTodo(input.value);
        input.value = '';
      }}>
        <input type='text' ref={node => {
          input = node;
        }} />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => {
      dispatch(actions.postTodo({
      todo: value}));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
