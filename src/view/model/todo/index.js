import React from 'react';
import AddTodo from './com/AddTodo';
import FooterTodo from './com/FooterTodo';
import TodoList from './com/TodoList';

class Todo extends React.Component {
  render() {
    return (
      <div>
        <AddTodo />
        <TodoList />
        <FooterTodo />
      </div>
    );
  }
}
export default Todo;
