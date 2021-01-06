import React from 'react';
// import Footer from './footer';
// import Header from './header';
import Content from './content';
import { routerConfigItemTypes } from '../../index.d';
import { RouteChildrenProps } from 'react-router-dom';

type props = { routes: routerConfigItemTypes[] } & RouteChildrenProps;
export default class Layout extends React.Component<props> {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Content {...this.props} />
        {/* <Footer /> */}
      </div>
    );
  }
}
