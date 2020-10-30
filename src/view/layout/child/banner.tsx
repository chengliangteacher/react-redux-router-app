import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { MenuItemTypes } from '../../../index.d';
import { Store } from 'antd/lib/form/interface';
const menuData = JSON.parse(sessionStorage.resources);
const { SubMenu } = Menu;
interface props {
  collapsed: boolean;
}
function Banner(props: props) {
  const { collapsed } = props;
  //=====================================无限递归菜单====================================//
  const handleRenderSubMenu = (menuItem: MenuItemTypes) => {
    return (
      <SubMenu
        key={menuItem.id}
        icon={<AppstoreOutlined />}
        title={menuItem.text}
      >
        {menuItem.children.map((item: MenuItemTypes) => {
          if (item.type === 'group' && menuItem.hasChildren) {
            return handleRenderSubMenu(item);
          } else {
            return <Menu.Item key={item.id}>{item.text}</Menu.Item>;
          }
        })}
      </SubMenu>
    );
  };
  //=====================================reactnode====================================//
  return (
    <Menu
      style={{ width: collapsed ? 80 : 220 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      className="banner"
      inlineCollapsed={collapsed}
    >
      {menuData.map((item: MenuItemTypes) => {
        if (item.type === 'group' && item.hasChildren) {
          return handleRenderSubMenu(item);
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
export default connect(({ layout }: Store) => {
  return {
    collapsed: layout.collapsed,
  };
})(Banner);
