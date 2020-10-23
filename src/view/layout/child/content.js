import React from 'react';
import RouterItems from '../../../components/RouterItems';

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="w-100 h-100 bg-white">
          <RouterItems {...this.props} />
        </div>
      </div>
    );
  }
}
