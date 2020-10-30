import { lazy } from 'react';
const test = [
  {
    title: '表格测试',
    path: '/v/test-table',
    component: lazy(() => import('../../view/model/test/test-table')),
  },
  {
    title: '表单测试',
    path: '/v/test-form',
    component: lazy(() => import('../../view/model/test/test-form')),
  },
];
export default test;
