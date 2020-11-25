import React, { useEffect } from 'react';
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
import { Store } from 'antd/lib/form/interface';
function TagView(props: TypeProps) {
  let tagview: any = React.createRef();
  let interval: any = null;
  //=====================================监听路由变化====================================//
  let handleListenRouter = (): void => {
    props.history.listen((data: RouteChildrenProps['location']) => {
      handleAddRouter(data);
    });
  };
  //=====================================新增路由到redux====================================//
  let handleAddRouter = (data: RouteChildrenProps['location']): void => {
    let name = '';
    //=====================================获取当前页面name====================================//
    model.forEach((item) => {
      if (item.path === data.pathname) {
        name = item.title;
      }
    });
    props.dispatch(judgeRouterRepeat({ ...data, name }));
  };
  //=====================================关闭标签====================================//
  let handleCloseTag = (val: routerItemTypes): void => {
    props.dispatch(afterDeleteRouterTag(val, props.history));
  };
  //=====================================关闭其它标签====================================//
  let handleCloseOtherTag = (val: routerItemTypes): void => {
    props.dispatch(afterDeleteOtherTag(val, props.history));
  };
  //=====================================关闭所有标签====================================//
  let handleCloseAllTag = (): void => {
    props.dispatch(deleteAllTag());
    props.history.push('/v/home');
  };
  //=====================================滚动条向左滚动====================================//
  let handleTurnScrollLeft = (): void => {
    if (interval) {
      clearInterval(interval);
    }
    let step = 0;
    interval = setInterval(() => {
      if (step >= 80) {
        clearInterval(interval);
        return;
      }
      step = step + 5;
      tagview.current.scrollLeft -= 5;
    }, 20);
  };
  //=====================================滚动条向左滚动====================================//
  let handleTurnScrollRight = (): void => {
    if (interval) {
      clearInterval(interval);
    }
    let step = 0;
    interval = setInterval(() => {
      if (step >= 80) {
        clearInterval(interval);
      } else {
        step = step + 5;
        tagview.current.scrollLeft += 5;
      }
    }, 20);
  };
  useEffect(() => {
    handleAddRouter(props.location);
    handleListenRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { tagDatas } = props;
  return (
    <div id="tag-view" className="tag-view">
      <StepBackwardOutlined onClick={handleTurnScrollLeft} />
      <div ref={tagview} className="tag-item">
        {tagDatas.map((item: routerItemTypes, index: number) => {
          return (
            <Tag
              key={index}
              visible
              closable={item.isDel}
              color={
                props.location.pathname === item.pathname ? 'processing' : ''
              }
              onClose={() => {
                handleCloseTag(item);
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
      <StepForwardOutlined onClick={handleTurnScrollRight} />
      <ContextMenu
        handleCloseTag={handleCloseTag}
        handleCloseOtherTag={handleCloseOtherTag}
        handleCloseAllTag={handleCloseAllTag}
      ></ContextMenu>
    </div>
  );
}

const mapStateToProps = ({ layout }: Store) => {
  return {
    tagDatas: layout.tagDatas,
  };
};

export default connect(mapStateToProps)(TagView);
