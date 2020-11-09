import React, { useEffect, useState } from 'react';
import RouterItems from '../../../components/RouterItems';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Card } from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { routerConfigItemTypes } from '../../../index.d';
type props = { routes: routerConfigItemTypes[] } & RouteChildrenProps;
interface stateTypes {
  title: string;
  key: number;
}
export default function Content(props: props) {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState(1);
  useEffect(() => {
    //=====================================监听路由变化设置路由对应逻辑页面title====================================//
    props.history.listen((data: RouteChildrenProps['location']) => {
      let text = '';
      props.routes.forEach((item) => {
        if (item.path === data.pathname) {
          text = item.title ? item.title : '';
        }
      });
      if (text) {
        setTitle(text);
        setKey(key + 1);
      }
    });
  });
  return (
    <TransitionGroup>
      <CSSTransition key={1} timeout={1000} classNames="star" unmountOnExit>
        <div className="content">
          <Card title={title} className="content-child">
            <RouterItems routes={props.routes} />
          </Card>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
