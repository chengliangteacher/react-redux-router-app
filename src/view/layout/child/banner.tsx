import React, { Fragment } from 'react';
import { Menu, Spin } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { MenuItemTypes } from '../../../index.d';
import { Store } from 'antd/lib/form/interface';
import { Link, RouteChildrenProps } from 'react-router-dom';
import { findMenuInfo } from '../../../utils/untils';
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
    selectedKeys: string[],
    openKeys: string[]
}
class Banner extends React.Component<props, stateTypes> {
    constructor(props: props) {
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }
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
    }

    //=====================================改变菜单展示方式====================================//
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

    //=====================================选中菜单====================================//
    public handleOnSelect = (data: any) => {
        console.log(data)
        this.setState({
            selectedKeys: data.selectedKeys
        })
    }

    //=====================================打开/关闭菜单====================================//
    public handleOnOpenChange = (data: any) => {
        this.setState({
            openKeys: data
        })
    }

    //=====================================更新后声明周期====================================//
    componentDidUpdate(props:props, state:stateTypes) {
        if (props.menuData.length && !state.selectedKeys.length) {
            const data = findMenuInfo(this.props.location.pathname, this.props.menuData);
            this.setState({
                selectedKeys: [(data.id + "")],
                openKeys: [(data.parentId + "")]
            })
        }
    }

    render() {
        const { collapsed, menuData } = this.props;
        return (
            <Fragment>
                <Menu
                    id="banner"
                    style={{ width: collapsed ? 80 : 220, height: (this.props.isLayoutX ? "100vh" : "calc(100vh - 60px)") }}
                    mode="inline"
                    className="banner"
                    inlineCollapsed={this.props.collapsed}
                    onSelect={this.handleOnSelect}
                    selectedKeys={this.state.selectedKeys}
                    onOpenChange={this.handleOnOpenChange}
                    openKeys={this.state.openKeys}
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
