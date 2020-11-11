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
  {
    title: '用户测试',
    path: '/v/test-users',
    component: lazy(() => import('../../view/model/test/test-users')),
  },
  {
    title: '添加用户',
    path: '/v/add-test-users',
    component: lazy(() => import('../../view/model/test/child/add-users')),
    isBack: true,
  },
];
export default test;
