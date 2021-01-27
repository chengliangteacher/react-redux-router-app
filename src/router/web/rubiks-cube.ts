import { lazy } from 'react';
const rubiksCube = [
  {
    title: '魔方',
    path: '/webview/rubiks-cube',
    component: lazy(() => import('../../web-view/modal/simple-rubiks-cube')),
  },
];
export default rubiksCube;
