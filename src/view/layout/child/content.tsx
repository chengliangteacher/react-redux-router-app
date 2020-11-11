import React from 'react';
import RouterItems from '../../../components/RouterItems';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Card, Space } from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { routerConfigItemTypes } from '../../../index.d';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { findRouterInfo } from '../../../utils/untils';
type props = { routes: routerConfigItemTypes[] } & RouteChildrenProps;
interface stateTypes {
  title: string;
  key: number;
}
export default function Content(props: props) {
  return (
    <TransitionGroup>
      <CSSTransition key={1} timeout={1000} classNames="star" unmountOnExit>
        <div className="content">
          <Card
            title={
              <Space>
                {findRouterInfo(props.location.pathname).isBack ? (
                  <ArrowLeftOutlined
                    className="cursor-pointer"
                    onClick={() => {
                      props.history.goBack();
                    }}
                  />
                ) : (
                  ''
                )}
                <span>{findRouterInfo(props.location.pathname).title}</span>
              </Space>
            }
            className="content-child"
          >
            <RouterItems routes={props.routes} />
          </Card>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
