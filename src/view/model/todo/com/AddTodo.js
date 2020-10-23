import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { addTodo } from '../../../../store/action/todo';

class AddTodo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
    };
  }
  render() {
    const { handleAddTodoList } = this.props;
    return (
      <div>
        <Input
          style={{ width: '200px' }}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            handleAddTodoList(this.state.value);
          }}
        >
          添加
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTodoList: (text) => {
      dispatch(addTodo(text));
    },
  };
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(AddTodo);
