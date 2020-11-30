import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import RouterConfig from './router/index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import "./less/index.less"
export default function App() {
  return (
    <ConfigProvider locale={zhCN} componentSize="middle">
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </ConfigProvider>
  );
}
