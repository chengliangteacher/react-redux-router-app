import { lazy } from 'react';
const order = [
  {
    title: '订单页',
    path: '/webview/order',
    component: lazy(() => import('../../web-view/modal/order')),
  },
];
export default order;
