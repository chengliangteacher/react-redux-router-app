import React from 'react';
import RouterItems from '../../../components/RouterItems';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Card } from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { routerConfigItemTypes } from '../../../index.d';
interface routerConfigtypes {
  routes: routerConfigItemTypes[];
}
type props = routerConfigtypes & RouteChildrenProps;
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
  componentDidMount() {
    this.props.history.listen((data: any) => {
      this.setState((state: stateTypes) => {
        return {
          title: data.name ? data.name : '',
          key: state.key++,
        };
      });
    });
    // this.setState({
    //     title: this.props.location.name ? this.props.location.name : ""
    // });
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
