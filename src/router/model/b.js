import { lazy } from 'react';
const b = [
  {
    title: 'react页面b-one',
    path: '/v/b-one',
    component: lazy(() => import('../../view/model/b/b-one')),
  },
  {
    title: 'react页面b-two',
    path: '/v/b-two',
    component: lazy(() => import('../../view/model/b/b-two')),
  },
  {
    title: 'react页面b-three',
    path: '/v/b-three',
    component: lazy(() => import('../../view/model/b/b-three')),
  },
  {
    title: 'react页面b-four',
    path: '/v/b-four',
    component: lazy(() => import('../../view/model/b/b-four')),
  },
  {
    title: 'react页面b-five',
    path: '/v/b-five',
    component: lazy(() => import('../../view/model/b/b-five')),
  },
  {
    title: 'react页面b-sex',
    path: '/v/b-sex',
    component: lazy(() => import('../../view/model/b/b-sex')),
  },
  {
    title: 'react页面b-seven',
    path: '/v/b-seven',
    component: lazy(() => import('../../view/model/b/b-seven')),
  },
];
export default b;
