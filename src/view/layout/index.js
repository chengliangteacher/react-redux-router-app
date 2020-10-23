import React from 'react';
import Header from './child/header';
import Banner from './child/banner';
import Content from './child/content';
import './layout.scss';
export default class LayoutView extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Banner />
        <Content {...this.props} />
      </div>
    );
  }
}
