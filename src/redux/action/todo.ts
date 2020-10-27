let nextTodoId = 0;
//=====================================添加todo====================================//
export const addTodo = (text: any) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
  };
};
//=====================================过滤方法====================================//
export const setVisibilityFilter = (filter: any) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};
//=====================================todo项点击====================================//
export const toggleTodo = (id: any) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};
