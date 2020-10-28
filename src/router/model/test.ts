import { lazy } from 'react';
const test = [
  {
    title: '表格测试',
    path: '/v/test-table',
    component: lazy(() => import('../../view/model/test/test-table')),
  },
];
export default test;
