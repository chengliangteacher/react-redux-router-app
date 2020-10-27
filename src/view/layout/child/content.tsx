import React from 'react';
import RouterItems from '../../../components/RouterItems';

interface routerConfig {
  path: string;
  children: routerConfig[];
  component: any;
  redirect: boolean;
}
interface props {
  routes: routerConfig[];
}
export default class Content extends React.Component<props> {
  render() {
    return (
      <div className="content">
        <div className="w-100 h-100 bg-white">
          <RouterItems routes={this.props.routes} />
        </div>
      </div>
    );
  }
}
