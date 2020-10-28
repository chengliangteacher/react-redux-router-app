import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux';
import RouterConfig from './router/index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <RouterConfig />
        </Provider>
      </ConfigProvider>
    );
  }
}
