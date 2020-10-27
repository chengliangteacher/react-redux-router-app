import React from 'react';
import { connect } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { setCollapsed } from '../../../redux/action/layout';
interface props {
  history: any;
}
class Header extends React.Component<props> {
  public handleLoginOut = (e: any): void => {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push('/login');
  };
  render() {
    const { dispatch, collapsed }: any = this.props;
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
                  dispatch(setCollapsed());
                }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => {
                  dispatch(setCollapsed());
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
export default connect(({ layout }: layoutTypes) => {
  return {
    collapsed: layout.collapsed,
  };
})(Header);
