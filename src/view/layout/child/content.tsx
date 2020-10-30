import React from 'react';
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
export default class Content extends React.Component<props, stateTypes> {
  constructor(props: props) {
    super(props);
    this.state = {
      title: '',
      key: 1,
    };
  }
  //=====================================监听路由变化设置路由对应逻辑页面title====================================//
  listenRouterSetTitle = () => {
    this.props.history.listen((data: RouteChildrenProps['location']) => {
      this.setState((state: stateTypes) => {
        let title = '';
        this.props.routes.forEach((item) => {
          if (item.path === data.pathname) {
            title = item.title ? item.title : '';
          }
        });
        return {
          title,
          key: state.key++,
        };
      });
    });
    let title = '';
    this.props.routes.forEach((item) => {
      if (item.path === this.props.location.pathname) {
        title = item.title ? item.title : '';
      }
    });
    this.setState({
      title,
    });
  };
  componentDidMount() {
    this.listenRouterSetTitle();
  }
  render() {
    const { title, key } = this.state;
    return (
      <TransitionGroup>
        <CSSTransition key={key} timeout={1000} classNames="star" unmountOnExit>
          <div className="content">
            <Card title={title} className="content-child">
              <RouterItems routes={this.props.routes} />
            </Card>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
