/* 
    @description  layout/action
    @autor        cheng liang
    @create       2020-10-21 16:26"
    @params       
    @return       
*/
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
let routerTagId = 2;
export const addRouterTag = (routerItem) => {
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
export const judgeRouterRepeat = (routerItem, tagsData) => {
  return (dispatch) => {
    if (tagsData.some((item) => item.pathname === routerItem.pathname)) {
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
export const deleteRouterTag = (id) => {
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
export const afterDeleteRouterTag = (router, history, tagsData) => {
  return (dispatch) => {
    if (router.pathname === history.location.pathname) {
      const index = tagsData.findIndex(
        (item) => item.pathname === router.pathname
      );
      if (index - 1 >= 0) {
        history.push(tagsData[index - 1]);
      }
    }
    dispatch(deleteRouterTag(router.id));
  };
};

//=====================================关闭其它tag====================================//
export const deleteOtherTag = (id) => {
  return {
    type: 'DELETE_OTHER_TAG',
    id,
  };
};

export const afterDeleteOtherTag = (router, history, tagsData) => {
  return (dispatch) => {
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
