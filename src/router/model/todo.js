import { lazy } from 'react';
const todo = [
  {
    title: 'todolist',
    path: '/v/todo',
    component: lazy(() => import('../../view/model/todo')),
  },
];
export default todo;
