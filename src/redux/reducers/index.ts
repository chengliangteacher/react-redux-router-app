import { combineReducers } from 'redux';
import todos from './todos';
import layout from './layout';
const storeApp = combineReducers({
  todos,
  layout,
});

export default storeApp;
