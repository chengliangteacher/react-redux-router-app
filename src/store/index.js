import { createStore } from 'redux';
import storeApp from './reducers';
let store = createStore(storeApp);
export default store;
