import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { MenuItemTypes } from '../../../index.d';
import { Store } from 'antd/lib/form/interface';
const menuData = JSON.parse(sessionStorage.resources);
const { SubMenu } = Menu;
interface props {
  collapsed: boolean;
  handleChangeBannerWith: (val: () => void) => void;
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
  useEffect(() => {
    props.handleChangeBannerWith(handleChangeBannerWith);
  });
  let handleChangeBannerWith = () => {
    const element = document.getElementById('banner');
    if (element) {
      if (element.style.left === '' || element.style.left === '-220px') {
        element.style.left = '0px';
        element.style.boxShadow = '10px 0px 6px #b6b6b6';
      } else {
        element.style.left = '-220px';
        element.style.boxShadow = 'none';
      }
    }
  };
  //=====================================reactnode====================================//
  return (
    <Menu
      id="banner"
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
