import React from 'react';
import RouterItems from '../../../components/RouterItems';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface routerConfig {
  path?: string;
  children?: routerConfig[];
  component?: any;
  redirect?: boolean;
}
interface props {
  routes: routerConfig[];
  location: Location;
  history: History;
}
export default class Content extends React.Component<props> {
  render() {
    return (
      <TransitionGroup>
        <CSSTransition
          key={this.props.location.pathname}
          timeout={1000}
          classNames="star"
        >
          <div className="content">
            <div className="w-100 h-100 bg-white">
              <RouterItems routes={this.props.routes} />
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
