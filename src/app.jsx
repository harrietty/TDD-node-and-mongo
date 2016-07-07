import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/index';
import TodoList from './components/todolist';
import AddTodo from './components/add';

let store = createStore(reducer, applyMiddleware(thunkMiddleware));

const App = (props) => {
    return (
      <div className='main'>
        <h2>Todo App</h2>
        <TodoList />
        <AddTodo />
      </div>
    );
};

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('app'));
