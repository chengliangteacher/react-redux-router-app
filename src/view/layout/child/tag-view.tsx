import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
interface props {
  location: Location;
  history: any;
  dispatch: any;
  tagDatas: any;
}
class TagView extends React.Component<props> {
  public tagview: any;
  public interval: any;
  componentDidMount() {
    this.handleAddRouter(this.props.location);
    this.handleListenRouter();
    this.tagview = React.createRef();
    this.interval = null;
  }
  //=====================================监听路由变化====================================//
  handleListenRouter = () => {
    this.props.history.listen((data: any) => {
      this.handleAddRouter(data);
    });
  };
  //=====================================新增路由到redux====================================//
  handleAddRouter = (data: any) => {
    let routerData = data;
    //=====================================获取当前页面name====================================//
    model.forEach((item) => {
      if (item.path === data.pathname) {
        routerData.name = item.title;
      }
    });
    this.props.dispatch(judgeRouterRepeat(routerData, this.props.tagDatas));
  };
  //=====================================关闭标签====================================//
  handleCloseTag = (val: any) => {
    this.props.dispatch(
      afterDeleteRouterTag(val, this.props.history, this.props.tagDatas)
    );
  };
  //=====================================关闭其它标签====================================//
  handleCloseOtherTag = (val: any) => {
    this.props.dispatch(
      afterDeleteOtherTag(val, this.props.history, this.props.tagDatas)
    );
  };
  //=====================================关闭所有标签====================================//
  handleCloseAllTag = () => {
    this.props.dispatch(deleteAllTag());
    this.props.history.push('/v/home');
  };
  //=====================================滚动条向左滚动====================================//
  handleTurnScrollLeft = () => {
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
  handleTurnScrollRight = () => {
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
