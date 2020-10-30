import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteChildrenProps } from 'react-router-dom';
import { Tag } from 'antd';
import {
  judgeRouterRepeat,
  afterDeleteRouterTag,
  afterDeleteOtherTag,
  deleteAllTag,
} from '../../../redux/action/layout';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import model from '../../../router/model';
import ContextMenu from '../../../components/context-menu';
import { routerItemTypes, TypeProps } from '../../../index.d';
class TagView extends React.Component<TypeProps> {
  public tagview: any;
  public interval: any;
  componentDidMount() {
    this.handleAddRouter(this.props.location);
    this.handleListenRouter();
    this.tagview = React.createRef();
    this.interval = null;
  }
  //=====================================监听路由变化====================================//
  public handleListenRouter = (): void => {
    this.props.history.listen((data: RouteChildrenProps) => {
      this.handleAddRouter(data);
    });
  };
  //=====================================新增路由到redux====================================//
  public handleAddRouter = (data: any): void => {
    let routerData = data;
    //=====================================获取当前页面name====================================//
    model.forEach((item) => {
      if (item.path === data.pathname) {
        routerData.name = item.title;
      }
    });
    this.props.dispatch(judgeRouterRepeat(data, this.props.tagDatas));
  };
  //=====================================关闭标签====================================//
  public handleCloseTag = (val: routerItemTypes): void => {
    this.props.dispatch(
      afterDeleteRouterTag(val, this.props.history, this.props.tagDatas)
    );
  };
  //=====================================关闭其它标签====================================//
  public handleCloseOtherTag = (val: any): void => {
    this.props.dispatch(
      afterDeleteOtherTag(val, this.props.history, this.props.tagDatas)
    );
  };
  //=====================================关闭所有标签====================================//
  public handleCloseAllTag = (): void => {
    this.props.dispatch(deleteAllTag());
    this.props.history.push('/v/home');
  };
  //=====================================滚动条向左滚动====================================//
  public handleTurnScrollLeft = (): void => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    let step = 0;
    this.interval = setInterval(() => {
      if (step >= 80) {
        clearInterval(this.interval);
        return;
      }
      step = step + 5;
      this.tagview.current.scrollLeft -= 5;
    }, 20);
  };
  //=====================================滚动条向左滚动====================================//
  public handleTurnScrollRight = (): void => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    let step = 0;
    this.interval = setInterval(() => {
      if (step >= 80) {
        clearInterval(this.interval);
      } else {
        step = step + 5;
        this.tagview.current.scrollLeft += 5;
      }
    }, 20);
  };
  render() {
    const { tagDatas } = this.props;
    return (
      <div id="tag-view" className="tag-view">
        <StepBackwardOutlined onClick={this.handleTurnScrollLeft} />
        <div ref={this.tagview} className="tag-item">
          {tagDatas.map((item: any, index: number) => {
            return (
              <Tag
                key={index}
                visible
                closable={item.isDel}
                color={
                  this.props.location.pathname === item.pathname
                    ? 'processing'
                    : ''
                }
                onClose={() => {
                  this.handleCloseTag(item);
                }}
                className="cursor-pointer"
              >
                <Link data-item={JSON.stringify(item)} to={item.pathname}>
                  {item.name}
                </Link>
              </Tag>
            );
          })}
        </div>
        <StepForwardOutlined onClick={this.handleTurnScrollRight} />
        <ContextMenu
          handleCloseTag={this.handleCloseTag}
          handleCloseOtherTag={this.handleCloseOtherTag}
          handleCloseAllTag={this.handleCloseAllTag}
        ></ContextMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }: any) => {
  return {
    tagDatas: layout.tagDatas,
  };
};

export default connect(mapStateToProps)(TagView);
