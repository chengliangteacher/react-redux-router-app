import React from 'react';
import { connect } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { setCollapsed } from '../../../redux/action/layout';
import { RouteChildrenProps } from 'react-router-dom';
interface otherTypes {
  handleChangeCollapsed: () => void;
  collapsed: boolean;
}
type props = RouteChildrenProps & otherTypes;
class Header extends React.Component<props> {
  public handleLoginOut = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push('/login');
  };
  render() {
    const { handleChangeCollapsed, collapsed } = this.props;
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
            onClick={(e: any) => this.handleLoginOut(e)}
          >
            退出登录
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="header-left">
          <h3>react&react-redux&react-router-dom全家桶</h3>
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
}
interface layoutTypes {
  layout: { collapsed: boolean };
}

const mapStateToProps = ({ layout }: layoutTypes) => {
  return {
    collapsed: layout.collapsed,
  };
};
const MapDispatchToPropsFunction = (dispatch: any) => {
  return {
    handleChangeCollapsed: () => {
      dispatch(setCollapsed());
    },
  };
};
export default connect(mapStateToProps, MapDispatchToPropsFunction)(Header);
