import React, { Fragment } from 'react';
import { Menu, Spin } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { MenuItemTypes } from '../../../index.d';
import { Store } from 'antd/lib/form/interface';
import { Link, RouteChildrenProps } from 'react-router-dom';
const { SubMenu } = Menu;
interface othersProps {
    collapsed: boolean;
    menuData: MenuItemTypes[];
    menuLoading: boolean;
    handleChangeBannerWith: (val: () => void) => void;
    isLayoutX: boolean;
}
type props = othersProps & RouteChildrenProps;
interface stateTypes {
    defaultSelectedKeys: string[];
    defaultOpenKeys: string[];
}
class Banner extends React.Component<props, stateTypes> {
    constructor(props: props) {
        super(props);
        this.state = {
            defaultSelectedKeys: [],
            defaultOpenKeys: [],
        };
    }
    public getInitMenuIds = (data: MenuItemTypes[]) => {
        const pathname = window.location.hash.replace('#', '');
        data.forEach((item: MenuItemTypes) => {
            if (item.url === pathname) {
                this.setState({
                    defaultSelectedKeys: [item.id + ''],
                    defaultOpenKeys: [item.parentId + ''],
                });
            } else {
                if (item.hasChildren && item.children.length > 0) {
                    this.getInitMenuIds(item.children);
                }
            }
        });
    };
    //=====================================无限递归菜单====================================//
    public handleRenderSubMenu = (menuItem: MenuItemTypes) => {
        return (
            <SubMenu
                key={menuItem.id + ''}
                icon={<AppstoreOutlined />}
                title={menuItem.text}
            >
                {menuItem.children.map((item: MenuItemTypes) => {
                    if (item.type === 'group' && menuItem.hasChildren) {
                        return this.handleRenderSubMenu(item);
                    } else {
                        return (
                            <Menu.Item key={item.id + ''}>
                                {item.url ? <Link to={item.url}>{item.text}</Link> : item.text}
                            </Menu.Item>
                        );
                    }
                })}
            </SubMenu>
        );
    };
    componentDidMount() {
        this.props.handleChangeBannerWith(this.handleChangeBannerWith);
        this.getInitMenuIds(this.props.menuData);
    }

    public handleChangeBannerWith = () => {
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

    render() {
        const { collapsed, menuData } = this.props;
        return (
            <Fragment>
                <Menu
                    id="banner"
                    style={{ width: collapsed ? 80 : 220, height: (!this.props.isLayoutX ? "calc(100vh - 60px)" : "100vh") }}
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    defaultOpenKeys={this.state.defaultOpenKeys}
                    mode="inline"
                    className="banner"
                    inlineCollapsed={this.props.collapsed}
                >
                    {menuData.map((item: MenuItemTypes) => {
                        if (item.type === 'group' && item.hasChildren) {
                            return this.handleRenderSubMenu(item);
                        } else {
                            return (
                                <Menu.Item icon={<MailOutlined />} key={item.id + ''}>
                                    {item.url ? (
                                        <Link to={item.url}>{item.text}</Link>
                                    ) : (
                                            item.text
                                        )}
                                </Menu.Item>
                            );
                        }
                    })}
                </Menu>
                <Spin spinning={this.props.menuLoading} delay={500}></Spin>
            </Fragment>
        );
    }
}
export default connect(({ layout }: Store) => {
    return {
        collapsed: layout.collapsed,
        menuData: layout.menuData,
        menuLoading: layout.menuLoading,
        isLayoutX: layout.isLayoutX
    };
})(Banner);
