import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../../../../redux/action/todo';

function TodoList({ todoList, handleToggleTodo }: any) {
  return (
    <div>
      {todoList.map((item: any, index: number) => {
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

function getfiltertodolist(data: any, filter: any) {
  switch (filter) {
    case 'all': {
      return data;
    }
    case 'completed': {
      return data.filter((item: any) => item.completed);
    }
    case 'nocompleted': {
      return data.filter((item: any) => !item.completed);
    }
    default: {
      return data;
    }
  }
}

const mapStateToProps = ({ todos }: any) => {
  const { todoList, visibilityFilter } = todos;
  return {
    todoList: getfiltertodolist(todoList, visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleTodo: (id: number) => {
      dispatch(toggleTodo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
