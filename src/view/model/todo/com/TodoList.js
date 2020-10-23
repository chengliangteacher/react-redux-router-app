import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../../../../store/action/todo';

function TodoList({ todoList, handleToggleTodo }) {
  return (
    <div>
      {todoList.map((item, index) => {
        return (
          <div
            style={{ textDecoration: item.completed ? 'line-through' : '' }}
            key={index}
            onClick={() => {
              handleToggleTodo(item.id);
            }}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
}

function getfiltertodolist(data, filter) {
  switch (filter) {
    case 'all': {
      return data;
    }
    case 'completed': {
      return data.filter((item) => item.completed);
    }
    case 'nocompleted': {
      return data.filter((item) => !item.completed);
    }
    default: {
      return data;
    }
  }
}

const mapStateToProps = ({ todos }) => {
  const { todoList, visibilityFilter } = todos;
  return {
    todoList: getfiltertodolist(todoList, visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
