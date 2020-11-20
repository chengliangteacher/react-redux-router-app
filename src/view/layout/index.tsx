import React from 'react';
import Header from './child/header';
import Banner from './child/banner';
import Content from './child/content';
import TagView from './child/tag-view';
import { connect } from 'react-redux';
import './layout.scss';
import { requesGlobalData, requestMenuData } from '../../redux/action/layout';
import { routerConfigItemTypes } from '../../index.d';
import { RouteChildrenProps } from 'react-router-dom';
interface othersTypes {
  routes: routerConfigItemTypes[];
  handleRequestGlobalData: () => void;
  handleRequestMenuData: () => void;
}
type props = othersTypes & RouteChildrenProps;
class LayoutView extends React.Component<props> {
  componentDidMount() {
    this.props.handleRequestGlobalData();
    this.props.handleRequestMenuData();
  }
  public handleChangeBannerWith = () => {};
  render() {
    return (
      <div className="layout">
        <Header
          handleChangeBannerWith={() => this.handleChangeBannerWith()}
          {...this.props}
        />
        <Banner
          handleChangeBannerWith={(callback: any) => {
            this.handleChangeBannerWith = callback;
          }}
          {...this.props}
        />
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
    handleRequestMenuData: () => {
      dispatch(requestMenuData());
    },
  };
};

export default connect(null, MapDispatchToPropsFunction)(LayoutView);
