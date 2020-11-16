import model from '../router/model';
import { routerConfigItemTypes } from '../index.d';

/* 
    @description  找出路径匹配的路由信息
    @autor        cheng liang
    @create       2020-11-10 14:45"
    @params       path 路由路径
    @return       
*/
export function findRouterInfo(
  path: string,
  list = model
): routerConfigItemTypes {
  let data = {};
  list.forEach((item: routerConfigItemTypes) => {
    if (item.path === path) {
      data = item;
    }
  });
  return data;
}
