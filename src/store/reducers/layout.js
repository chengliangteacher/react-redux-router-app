const initState = {
  collapsed: false,
};

export default function layout(state = initState, action) {
  switch (action.type) {
    case 'SETCOLLAPSED': {
      return Object.assign({}, state, { collapsed: !state.collapsed });
    }
    default: {
      return state;
    }
  }
}
