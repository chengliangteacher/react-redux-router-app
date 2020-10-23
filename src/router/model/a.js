import { lazy } from 'react';
const a = [
  {
    title: '页面a',
    path: '/v/a',
    component: lazy(() => import('../../view/model/a')),
  },
];
export default a;
