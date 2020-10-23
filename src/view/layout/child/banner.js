import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
const menuData = JSON.parse(sessionStorage.resources);
const { SubMenu } = Menu;
class Banner extends React.Component {
  constructor(props) {
    super();
  }
  //=====================================无限递归菜单====================================//
  handleRenderSubMenu = (menuItem) => {
    return (
      <SubMenu
        key={menuItem.id}
        icon={<AppstoreOutlined />}
        title={menuItem.text}
      >
        {menuItem.children.map((item) => {
          if (item.type === 'group' && menuItem.hasChildren) {
            return this.handleRenderSubMenu(item);
          } else {
            return <Menu.Item key={item.id}>{item.text}</Menu.Item>;
          }
        })}
      </SubMenu>
    );
  };
  render() {
    const { collapsed } = this.props;
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: collapsed ? 80 : 220 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        className="banner"
        inlineCollapsed={collapsed}
      >
        {menuData.map((item) => {
          if (item.type === 'group' && item.hasChildren) {
            return this.handleRenderSubMenu(item);
          } else {
            return (
              <Menu.Item icon={<MailOutlined />} key={item.id}>
                {item.text}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }
}
export default connect(({ layout }) => {
  return {
    collapsed: layout.collapsed,
  };
})(Banner);
