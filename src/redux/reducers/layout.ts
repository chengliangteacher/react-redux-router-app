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
    default: {
      return state;
    }
  }
}
