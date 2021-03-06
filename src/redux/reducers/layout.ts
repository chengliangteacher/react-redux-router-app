const initState = {
    collapsed: false,
    tagDatas: [
        {
            name: '首页',
            pathname: '/v/home',
            id: 1,
            isDel: false,
        },
    ],
    globalLoading: false,
    areaData: [],
    foodTypesData: [],
    planTypesData: [],
    menuLoading: false,
    menuData: [],
    isLayoutX: false, //--------是否水平布局
};

export default function layout(state = initState, action: any) {
    switch (action.type) {
        case 'SETCOLLAPSED': {
            return Object.assign({}, state, { collapsed: !state.collapsed });
        }
        case 'ADD_ROUTER_TAG': {
            return Object.assign({}, state, {
                tagDatas: [...state.tagDatas, action.routerItem],
            });
        }
        case 'DELETE_ROUTER_TAG': {
            return Object.assign({}, state, {
                tagDatas: state.tagDatas.filter(
                    (item) => item.id !== action.id || item.id === 1
                ),
            });
        }
        case 'DELETE_OTHER_TAG': {
            return Object.assign({}, state, {
                tagDatas: state.tagDatas.filter(
                    (item) => item.id === action.id || item.id === 1
                ),
            });
        }
        case 'DELETE_ALL_TAG': {
            return Object.assign({}, state, {
                tagDatas: state.tagDatas.filter((item) => item.id === 1),
            });
        }
        case 'REQUEST_GLOBAL_LOADING': {
            return Object.assign({}, state, { globalLoading: action.loading });
        }
        case 'SET_MENU_LOADING': {
            return Object.assign({}, state, { menuLoading: action.loading });
        }
        case 'SET_MENU_DATA': {
            return Object.assign({}, state, { menuData: action.data });
        }
        case 'CHANGE_LAYOUTX': {
            return Object.assign({}, state, { isLayoutX: !state.isLayoutX});
        }
        case 'ADD_GLOBAL_DATA': {
            return Object.assign({}, state, {
                areaData: action.data[0],
                foodTypesData: action.data[1],
                planTypesData: action.data[2],
            });
        }
        
        default: {
            return state;
        }
    }
}
