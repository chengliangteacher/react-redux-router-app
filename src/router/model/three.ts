import { lazy } from 'react';
const three = [
  {
    title: 'three',
    path: '/v/three',
    component: lazy(() => import('../../view/model/three')),
  },
];
export default three;
