import React from 'react';
import Header from './child/header';
import Banner from './child/banner';
import Content from './child/content';
import TagView from './child/tag-view';
import { connect } from 'react-redux';
import './layout.scss';
import { requesGlobalData } from '../../redux/action/layout';
import { routerConfigItemTypes } from '../../index.d';
import { RouteChildrenProps } from 'react-router-dom';
interface othersTypes {
  routes: routerConfigItemTypes[];
  handleRequestGlobalData: () => void;
}
type props = othersTypes & RouteChildrenProps;
class LayoutView extends React.Component<props> {
  componentDidMount() {
    this.props.handleRequestGlobalData();
  }
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

const MapDispatchToPropsFunction = (dispatch: any) => {
  return {
    handleRequestGlobalData: () => {
      dispatch(requesGlobalData());
    },
  };
};

export default connect(null, MapDispatchToPropsFunction)(LayoutView);
