/* 
    @description  thunkMiddleware,loggerMiddleware => 异步action
    @autor        cheng liang
    @create       2020-10-23 15:53"
    @params       
    @return       
*/
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import storeApp from './reducers';
const loggerMiddleware = createLogger();
let store = createStore(
  storeApp,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export default store;
