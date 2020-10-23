import { lazy } from 'react';
import a from './model/a';
import todo from './model/todo';
const routes = [
  {
    title: '登录',
    path: '/login',
    component: lazy(() => import('../view/login/login.js')),
  },
  //=====================================默认初始页面====================================//
  {
    path: '/',
    redirect: true,
    to: '/login',
  },
  //=====================================项目逻辑页====================================//
  {
    path: '/v',
    component: lazy(() => import('../view/layout/index')),
    children: [...a, ...todo],
  },
  {
    title: '404',
    path: '',
    component: lazy(() => import('../view/NotFound')),
  },
];
export default routes;
