/* 
    @description  layout/action
    @autor        cheng liang
    @create       2020-10-21 16:26"
    @params       
    @return       
*/
import axios from '../../api';
import { routerItemTypes } from '../../index.d';
//=====================================设置菜单折叠====================================//
export const setCollapsed = () => {
  return {
    type: 'SETCOLLAPSED',
  };
};
/* 
    @description  新增路由tag
    @autor        cheng liang
    @create       2020-10-23 16:09"
    @params       routerItem => 路由对象
    @return       
*/
//=====================================tagview菜单数据类型====================================//
// export interface routerItemTypes {
//     pathname: string;
//     name?: string;
//     isDel?: boolean;
//     id?: number;
// }
let routerTagId = 2;
export const addRouterTag = (routerItem: routerItemTypes) => {
  return {
    type: 'ADD_ROUTER_TAG',
    routerItem: { ...routerItem, id: routerTagId++, isDel: true },
  };
};
/* 
    @description  判断新增路由是否重复
    @autor        cheng liang
    @create       2020-10-26 10:47"
    @params       routerItem -> 当前路由 tagsData -> 路由数据
    @return       
*/
export const judgeRouterRepeat = (
  routerItem: routerItemTypes,
  tagsData: routerItemTypes[]
) => {
  return (dispatch: any) => {
    if (
      tagsData.some(
        (item: routerItemTypes) => item.pathname === routerItem.pathname
      )
    ) {
      return;
    } else {
      dispatch(addRouterTag(routerItem));
    }
  };
};
/* 
    @description  删除路由tag
    @autor        cheng liang
    @create       2020-10-23 16:12"
    @params       id => 路由唯一标识符
    @return       
*/
export const deleteRouterTag = (id?: number) => {
  return {
    type: 'DELETE_ROUTER_TAG',
    id,
  };
};
/* 
    @description  判断删除当前路由tag跳转到新路由
    @autor        cheng liang
    @create       2020-10-26 16:15"
    @params       router=>当前router history=>路由 tagsData=>所有路由
    @return       
*/
export const afterDeleteRouterTag = (
  router: routerItemTypes,
  history: any,
  tagsData: routerItemTypes[]
) => {
  return (dispatch: any) => {
    if (router.pathname === history.location.pathname) {
      const index = tagsData.findIndex(
        (item: any) => item.pathname === router.pathname
      );
      if (index - 1 >= 0) {
        history.push(tagsData[index - 1]);
      }
    }
    dispatch(deleteRouterTag(router.id));
  };
};

//=====================================关闭其它tag====================================//
export const deleteOtherTag = (id?: number) => {
  return {
    type: 'DELETE_OTHER_TAG',
    id,
  };
};

export const afterDeleteOtherTag = (
  router: routerItemTypes,
  history: any,
  tagsData: routerItemTypes[]
) => {
  return (dispatch: any) => {
    if (router.pathname !== history.location.pathname) {
      history.push(router);
    }
    dispatch(deleteOtherTag(router.id));
  };
};
//=====================================关闭所有tag====================================//
export const deleteAllTag = () => {
  return {
    type: 'DELETE_ALL_TAG',
  };
};
//=====================================添加全局数据====================================//
export const addGlobalData = (data: any) => {
  return {
    type: 'ADD_GLOBAL_DATA',
    data,
  };
};

//=====================================请求全局数据loading状态====================================//
export const requestGlobalLoading = (val: boolean) => {
  return {
    type: 'REQUEST_GLOBAL_LOADING',
    loading: val,
  };
};

export const requesGlobalData = () => {
  return (dispatch: any) => {
    dispatch(requestGlobalLoading(true));
    //=====================================地区====================================//
    const areaData = axios.get('/areas/allTwo');
    const foodTypesData = axios.get('/foodTypes/all');
    const planTypesData = axios.get('/planTasks/planTypes');
    Promise.allSettled([areaData, foodTypesData, planTypesData]).then((res) => {
      const data = res.map((item) => {
        let temp = [];
        if (item.status === 'fulfilled') {
          temp = item.value.data;
        }
        return temp;
      });
      dispatch(addGlobalData(data));
      dispatch(requestGlobalLoading(false));
    });
  };
};
