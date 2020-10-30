/* 
    @description  interface/type
    @autor        cheng liang
    @create       2020-10-30 09:35"
    @params       
    @return       
*/

import { MapDispatchToProps } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';

//=====================================导航tag数据类型====================================//
export interface routerItemTypes {
  pathname: string;
  name?: string;
  isDel?: boolean;
  id?: number;
}

export interface TypeProps {
  location?: RouteChildrenProps.location;
  history?: RouteChildrenProps.history;
  dispatch?: MapDispatchToProps;
  tagDatas: routerItemTypes[];
}

//=====================================路由对象数据类型====================================//
export interface routerConfigItemTypes {
  path?: string;
  children?: routerConfigItemTypes[];
  component?: any;
  redirect?: boolean;
}

//=====================================菜单数据类型====================================//
export interface MenuItemTypes {
  id: number;
  text: string;
  hasChildren?: boolean;
  type: string;
  children: Array<MenuItemTypes>;
}

//=====================================layout redux state数据类型====================================//
export interface layoutReduxStateTypes {
  collapsed: boolean;
  tagDatas: routerItemTypes[];
  globalLoading: boolean;
}
