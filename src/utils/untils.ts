import model from '../router/model';
import { MenuItemTypes, routerConfigItemTypes } from '../index.d';

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

/*
    @description  找出路径匹配的菜单信息
    @autor        cheng liang
    @create       2021-01-11 10:09"
    @params       path>路由 menuData>菜单数据
    @return
*/

function deepclonemenu(list: MenuItemTypes[], path: string, data: MenuItemTypes) {
    list.forEach((item: MenuItemTypes) => {
        if (item.url === path) {
            Object.assign(data, item)
        } else {
            if (item.hasChildren && item.children.length) {
                deepclonemenu(item.children, path, data);
            }
        }
    });
}

export function findMenuInfo(path: string, list: MenuItemTypes[]):MenuItemTypes {
    const data = {
        id: 0,
        text: "",
        hasChildren: false,
        type: "",
        children: [],
        url: "",
        parentId: 0,
    };
    deepclonemenu(list, path, data);
    return data;
}
