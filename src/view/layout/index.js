import React from 'react';
import Header from './child/header';
import Banner from './child/banner';
import Content from './child/content';
import TagView from './child/tag-view';
import './layout.scss';
export default class LayoutView extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Banner />
        <div>
          <TagView {...this.props} />
          <Content {...this.props} />
        </div>
      </div>
    );
  }
}
