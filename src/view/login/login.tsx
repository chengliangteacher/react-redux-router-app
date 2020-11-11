import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import md5 from 'md5';
import './login.scss';
import axios from '../../api';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
interface props {
  history: any;
}
export default function Login(props: props) {
  const [imageCode, setImageCode] = useState(new Date().getTime());
  const [loading, setLoading] = useState(false);
  let formInfo: any = {
    username: 'cl',
    password: '',
    code: '',
  };
  //=====================================文本框取值====================================//
  let handleChange = (e: any, key: any): void => {
    formInfo[key] = e.target.value;
  };
  //=====================================登录====================================//
  let handleLogin = (): void => {
    setLoading(true);
    formInfo.password = md5(formInfo.password);
    axios({
      method: 'post',
      url: `/login?username=${
        formInfo.username
      }&password=${'96E79218965EB72C92A549DD5A330112'}&code=${formInfo.code}`,
      headers: {
        codeKey: imageCode,
        source: 'pc',
      },
    })
      .then((res): void => {
        //=====================================储存用户信息与菜单====================================//
        sessionStorage.token = res.data.userInfo.token;
        sessionStorage.resources = JSON.stringify(res.data.resources.children);
        props.history.push('/v/test-form');
      })
      .finally((): void => {
        setLoading(false);
      });
  };
  return (
    <div className="login vh-100 w-100 d-flex center">
      <Form
        initialValues={formInfo}
        className="login-form px-1 py-2"
        name="LoginForm"
        {...layout}
        labelAlign="right"
      >
        <h3 className="text-center mb-1">登录</h3>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            disabled={loading}
            onChange={(e) => {
              handleChange(e, 'username');
            }}
            onPressEnter={handleLogin}
            allowClear
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            disabled={loading}
            onChange={(e) => {
              handleChange(e, 'password');
            }}
            onPressEnter={handleLogin}
            allowClear
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          label="验证码"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Form.Item
            className="w-60 d-inline-block"
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              className="w-100"
              disabled={loading}
              onChange={(e) => {
                handleChange(e, 'code');
              }}
              onPressEnter={handleLogin}
              allowClear
              placeholder="请输入验证码"
            />
          </Form.Item>
          <img
            className="w-40"
            src={`/inspection/gifCode?d=${imageCode}`}
            onClick={() => {
              setImageCode(new Date().getTime());
            }}
            alt="logo"
          />
        </Form.Item>
        <Button
          className="w-100"
          loading={loading}
          type="primary"
          onClick={handleLogin}
        >
          登录
        </Button>
      </Form>
    </div>
  );
}
