import React from 'react';
import Header from './child/header';
import Banner from './child/banner';
import Content from './child/content';
import TagView from './child/tag-view';
import './layout.scss';
interface routerConfig {
  path?: string;
  children?: routerConfig[];
  component?: any;
  redirect?: boolean;
  title?: string;
}
interface props {
  location: Location;
  history: History;
  routes: routerConfig[];
}
export default class LayoutView extends React.Component<props> {
  render() {
    return (
      <div className="layout">
        <Header {...this.props} />
        <Banner />
        <div>
          <TagView {...this.props} />
          <Content {...this.props} />
        </div>
      </div>
    );
  }
}
