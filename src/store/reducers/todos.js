/* 
    @description  测试todolist/store
    @autor        cheng liang
    @create       2020-10-21 15:44"
    @params       
    @return       
*/
const initState = {
  todoList: [],
  visibilityFilter: 'all',
};
const todos = (state = initState, action) => {
  switch (action.type) {
    //=====================================新增todo====================================//
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todoList: [
          ...state.todoList,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      });
    //=====================================点击单个todo项====================================//
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      });
    //=====================================切换show type====================================//
    case 'SET_VISIBILITY_FILTER': {
      return Object.assign({}, state, { visibilityFilter: action.filter });
    }
    default:
      return state;
  }
};

export default todos;
