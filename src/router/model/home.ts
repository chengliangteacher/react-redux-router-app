import { lazy } from 'react';
const home = [
  {
    title: '首页',
    path: '/v/home',
    component: lazy(() => import('../../view/model/home')),
  },
];
export default home;
