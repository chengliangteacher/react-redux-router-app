import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux';
import RouterConfig from './router/index';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    );
  }
}
