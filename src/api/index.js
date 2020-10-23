import axios from 'axios';
import * as ApiIp from './ApiIp';
import { notification } from 'antd';
//=====================================全局配置====================================//
axios.defaults.baseURL = ApiIp.developUrl; // 服务器地址
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.common['source'] = 'pc';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//=====================================请求拦截器====================================//
axios.interceptors.request.use(
  function (config) {
    if (sessionStorage.token) {
      config.headers.Authorization = sessionStorage.token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//=====================================响应拦截器====================================//
axios.interceptors.response.use(
  function (response) {
    if (response.data.code === 200) {
      if (response.config.method !== 'get') {
        notification.success({
          message: '操作成功',
          description: '',
        });
      }
      return response.data;
    } else if (response.data.code === 403 || response.data.code === 401) {
      notification.warning({
        message: '登录失效',
        description: '登录失效，将自动跳转到登录页以重新登录',
      });
      window.location.href = '/login';
    } else {
      notification.error({
        message: '错误信息',
        description: response.data.msg ? response.data.msg : '请联系管理员',
      });
    }
    return Promise.reject(response.data);
  },
  function (error) {
    // 对响应错误做点什么
    notification.error({
      message: '服务器错误',
      description: '请联系管理员',
    });
    return Promise.reject(error);
  }
);

export default axios;
