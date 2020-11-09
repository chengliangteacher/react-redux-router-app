import React from 'react';
import { connect } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { requesGlobalData, setCollapsed } from '../../../redux/action/layout';
import { RouteChildrenProps } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
interface otherTypes {
  handleChangeCollapsed: () => void;
  handleRequesGlobalData: () => void;
  collapsed: boolean;
}
type props = RouteChildrenProps & otherTypes;
function Header(props: props) {
  let handleLoginOut = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    sessionStorage.clear();
    props.history.push('/login');
  };
  const {
    handleChangeCollapsed,
    collapsed,
    handleRequesGlobalData,
    history,
  } = props;
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="//#region "
          onClick={(e) => handleLoginOut(e)}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header">
      <div className="header-left">
        <h2
          className="cursor-pointer mx-1"
          onClick={() => {
            handleRequesGlobalData();
            history.push('/v/home');
          }}
        >
          react后台管理系统模版
        </h2>
        <div>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => {
                handleChangeCollapsed();
              }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => {
                handleChangeCollapsed();
              }}
            />
          )}
        </div>
      </div>
      <div className="header-right">
        <Dropdown overlay={menu}>
          <a
            href="//#region"
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            张卫健 <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

const mapStateToProps = ({ layout }: Store) => {
  return {
    collapsed: layout.collapsed,
  };
};
const MapDispatchToPropsFunction = (dispatch: any) => {
  return {
    handleChangeCollapsed: () => {
      dispatch(setCollapsed());
    },
    handleRequesGlobalData: () => {
      dispatch(requesGlobalData(true));
    },
  };
};
export default connect(mapStateToProps, MapDispatchToPropsFunction)(Header);
