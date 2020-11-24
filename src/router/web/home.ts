import { lazy } from 'react';
const home = [
  {
    title: '首页',
    path: '/webview/home',
    component: lazy(() => import('../../web-view/modal/home')),
  },
];
export default home;
