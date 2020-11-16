import React, { useEffect } from 'react';
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
function LayoutView(props: props) {
  useEffect(() => {
    props.handleRequestGlobalData();
    props.handleRequestMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let handleChangeBannerWith: () => void;
  return (
    <div className="layout">
      <Header
        handleChangeBannerWith={() => handleChangeBannerWith()}
        {...props}
      />
      <Banner
        handleChangeBannerWith={(callback: any) => {
          handleChangeBannerWith = callback;
        }}
        {...props}
      />
      <div>
        <TagView {...props} />
        <Content {...props} />
      </div>
    </div>
  );
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
