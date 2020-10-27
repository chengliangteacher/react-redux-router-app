import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { addTodo } from '../../../../redux/action/todo';
interface props {
  handleAddTodoList: (value: string) => void;
}
interface stateTypes {
  value: string;
}
class AddTodo extends React.Component<props, stateTypes> {
  constructor(props: props) {
    super(props);
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleAddTodoList: (text: string) => {
      dispatch(addTodo(text));
    },
  };
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(AddTodo);
