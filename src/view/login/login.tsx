import React from 'react';
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
interface stateTypes {
  imageCode: string | number;
  loading: boolean;
}
export default class Login extends React.Component<props, stateTypes> {
  public formInfo: any;
  constructor(props: props) {
    super(props);
    //=====================================form数据====================================//
    this.formInfo = {
      username: 'cl',
      password: '',
      code: '',
    };
    this.state = {
      imageCode: new Date().getTime(),
      loading: false,
    };
  }
  //=====================================文本框取值====================================//
  handleChange = (e: any, key: any): void => {
    this.formInfo[key] = e.target.value;
  };
  //=====================================登录====================================//
  handleLogin = (): void => {
    this.setState({
      loading: true,
    });
    this.formInfo.password = md5(this.formInfo.password);
    axios({
      method: 'post',
      url: `/login?username=${
        this.formInfo.username
      }&password=${'96E79218965EB72C92A549DD5A330112'}&code=${
        this.formInfo.code
      }`,
      headers: {
        codeKey: this.state.imageCode,
        source: 'pc',
      },
    })
      .then((res): void => {
        //=====================================储存用户信息与菜单====================================//
        sessionStorage.token = res.data.userInfo.token;
        sessionStorage.resources = JSON.stringify(res.data.resources.children);
        this.props.history.push('/v/a');
      })
      .finally((): void => {
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <div className="login vh-100 w-100 d-flex center">
        <Form
          initialValues={this.formInfo}
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
              disabled={this.state.loading}
              onChange={(e) => {
                this.handleChange(e, 'username');
              }}
              onPressEnter={this.handleLogin}
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
              disabled={this.state.loading}
              onChange={(e) => {
                this.handleChange(e, 'password');
              }}
              onPressEnter={this.handleLogin}
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
                disabled={this.state.loading}
                onChange={(e) => {
                  this.handleChange(e, 'code');
                }}
                onPressEnter={this.handleLogin}
                allowClear
                placeholder="请输入验证码"
              />
            </Form.Item>
            <img
              className="w-40"
              src={`/inspection/gifCode?d=${this.state.imageCode}`}
              onClick={() => {
                this.setState({ imageCode: new Date().getTime() });
              }}
              alt="logo"
            />
          </Form.Item>
          <Button
            className="w-100"
            loading={this.state.loading}
            type="primary"
            onClick={this.handleLogin}
          >
            登录
          </Button>
        </Form>
      </div>
    );
  }
}
