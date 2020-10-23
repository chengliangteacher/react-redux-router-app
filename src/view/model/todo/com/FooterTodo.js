import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../../../store/action/todo';
function FooterTodo({ visibilityFilter, handleIsibilityFilter }) {
  return (
    <div>
      <Button
        onClick={() => {
          handleIsibilityFilter('all');
        }}
        type="link"
        disabled={visibilityFilter === 'all'}
      >
        all
      </Button>
      <Button
        onClick={() => {
          handleIsibilityFilter('completed');
        }}
        type="link"
        disabled={visibilityFilter === 'completed'}
      >
        completed
      </Button>
      <Button
        onClick={() => {
          handleIsibilityFilter('nocompleted');
        }}
        type="link"
        disabled={visibilityFilter === 'nocompleted'}
      >
        nocompleted
      </Button>
    </div>
  );
}

const mapStateToProps = ({ todos }) => {
  return {
    visibilityFilter: todos.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIsibilityFilter: (filter) => {
      dispatch(setVisibilityFilter(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterTodo);
