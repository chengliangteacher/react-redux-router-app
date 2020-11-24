import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { routerConfigItemTypes } from '../../index.d';
import RouterItems from '../../components/RouterItems';
type props = { routes: routerConfigItemTypes[] } & RouteChildrenProps;

export default class Content extends React.Component<props> {
  render() {
    return <RouterItems routes={this.props.routes} />;
  }
}
