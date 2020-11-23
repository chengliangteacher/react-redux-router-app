import { lazy } from 'react';
const test = [
  {
    title: '用户管理',
    path: '/v/sys-user',
    component: lazy(() => import('../../view/model/system/sys-users')),
  },
  {
    title: '菜单管理',
    path: '/v/sys-menu',
    component: lazy(() => import('../../view/model/system/sys-menu')),
  },
  {
    title: '角色管理',
    path: '/v/sys-role',
    component: lazy(() => import('../../view/model/system/sys-role')),
  },
];
export default test;
