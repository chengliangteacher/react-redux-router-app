import React, { Fragment } from 'react';
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Modal,
} from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
import { RouteChildrenProps } from 'react-router-dom';
const { Column } = Table;
const { Option } = Select;
//=====================================表格数据类型====================================//
interface dataItem {
  id: number;
  name: string;
  username: string;
  status: boolean;
  sex: boolean;
  QQ: string | undefined;
  roleIds: number[];
}
//=====================================state数据类型====================================//
interface stateTypes {
  loading: boolean;
  tableData: Array<dataItem>;
  pagination: TablePaginationConfig;
  addVisible: boolean;
  btnLoading: boolean;
  roleData: any;
  editId: number | null | undefined;
  deleteVisible: boolean;
  delId: number | null | undefined;
  delLoading: boolean;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

export default class TestTable extends React.Component<
  RouteChildrenProps,
  stateTypes
> {
  public formInfo: any = {
    name: '',
    username: '',
    status: null,
    sex: null,
    QQ: '',
    password: '',
    roleIds: [],
  }; //-----------form数据
  constructor(props: RouteChildrenProps) {
    super(props);
    this.state = {
      //=====================================分页参数====================================//
      pagination: {
        current: 1,
        pageSize: 20,
        defaultCurrent: 1,
        defaultPageSize: 20,
        total: 0,
        showSizeChanger: true,
        showTitle: true,
        showQuickJumper: true,
        onChange: (page: number, pageSize?: number | undefined) => {
          this.getTableData(page, pageSize);
        },
        onShowSizeChange: (page: number, pageSize: number) => {
          this.getTableData(page, pageSize);
        },
      },
      tableData: [], //-------表格数据变量
      loading: false, //-------全局夹杂圈圈
      addVisible: false, //-------新增抽屉变量
      btnLoading: false, //-------提交后台加载动画
      roleData: [], //-------角色数据
      editId: null, //-------编辑所需id
      deleteVisible: false, //-------删除弹框变量
      delLoading: false, //-------删除提交后台加载动画
      delId: null, //-------删除所需id
    };
  }
  //=====================================请求后台加载数据====================================//
  public getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    this.setState({
      loading: true,
    });
    axios
      .get('/user', { params: { pageNum, pageSize } })
      .then((res: any) => {
        this.setState((state) => {
          state.pagination.total = res.total;
          state.pagination.current = pageNum;
          state.pagination.pageSize = pageSize;
          let tempData = res.data;
          return {
            tableData: tempData.map((item: dataItem, index: number) =>
              Object.assign(item, { index: index + 1 })
            ),
            pagination: state.pagination,
          };
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };
  //=====================================提交表单到后台--验证成功====================================//
  public onFinish = (values: any) => {
    this.setState({
      btnLoading: true,
    });
    const data = { ...this.formInfo };
    let url = '/user';
    if (this.state.editId) {
      url = `/user/${this.state.editId}`;
    }
    axios
      .post(url, data)
      .then((res) => {
        this.setState({
          addVisible: false,
        });
        this.getTableData();
      })
      .finally(() => {
        this.setState({
          btnLoading: false,
        });
      });
  };
  //=====================================提交表单失败====================================//
  public onFinishFailed = (errorInfo: any) => {
    console.log('Failed', errorInfo);
  };
  //=====================================form表单数据====================================//
  public handleChangeForm = (key: string, e: any) => {
    if (e.target) {
      this.formInfo[key] = e.target.value;
    } else {
      this.formInfo[key] = e;
    }
  };
  //=====================================打开新增抽屉====================================//
  public handleOpenAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };
  //=====================================编辑用户====================================//
  public handleEditUser = (val: any) => {
    this.setState({
      addVisible: true,
      editId: val.id,
    });
    this.formInfo = val;
  };
  //=====================================获取角色数据====================================//
  public getRoleData = () => {
    axios.get('/role').then((res) => {
      this.setState({
        roleData: res.data,
      });
    });
  };
  //=====================================删除====================================//
  public handleDeleteUser = () => {
    this.setState({
      delLoading: true,
    });
    axios
      .delete(`/user/${this.state.delId}`)
      .then((res) => {
        this.setState({
          deleteVisible: false,
          delId: null,
        });
        this.getTableData();
      })
      .finally(() => {
        this.setState({
          delLoading: false,
        });
      });
  };
  componentDidMount() {
    this.getTableData();
    this.getRoleData();
  }
  render() {
    return (
      <Fragment>
        <Button
          type="primary"
          className="mb-1"
          onClick={() => {
            this.handleOpenAddModal();
          }}
        >
          新增用户
        </Button>
        <Table
          loading={this.state.loading}
          dataSource={this.state.tableData}
          rowKey="id"
          pagination={this.state.pagination}
        >
          <Column
            ellipsis={{ showTitle: true }}
            title="序号"
            dataIndex="index"
            key="index"
            align="center"
            width={80}
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="用户名称"
            dataIndex="name"
            key="name"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="登录名称"
            dataIndex="username"
            key="username"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="用户性别"
            dataIndex="sex"
            key="sex"
            align="center"
            render={(text) => <span>{text === 1 ? '男' : '女'}</span>}
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="是否启用"
            dataIndex="status"
            key="status"
            align="center"
            render={(text) => <span>{text === 1 ? '是' : '否'}</span>}
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="qq号码"
            dataIndex="QQ"
            key="QQ"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="创建时间"
            dataIndex="create_time"
            key="create_time"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="更新时间"
            dataIndex="update_time"
            key="update_time"
            align="center"
          />
          <Column
            ellipsis
            title="操作"
            key="action"
            render={(text, record: any) => (
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    this.handleEditUser(record);
                  }}
                  size="small"
                >
                  编辑
                </Button>
                <Button
                  onClick={() => {
                    this.setState({ deleteVisible: true, delId: record.id });
                  }}
                  danger
                  size="small"
                >
                  删除
                </Button>
              </Space>
            )}
            align="center"
          />
        </Table>
        <Drawer
          title={this.state.editId ? '编辑用户' : '新增用户'}
          placement="right"
          width={500}
          visible={this.state.addVisible}
          onClose={() => {
            this.setState({ addVisible: false, editId: null });
            this.formInfo = {
              name: '',
              username: '',
              status: null,
              sex: null,
              QQ: '',
              password: '',
              roleIds: [],
              id: null,
            };
          }}
        >
          {this.state.addVisible ? (
            <Form
              {...layout}
              name="basic"
              initialValues={this.formInfo}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="用户名称"
                name="name"
                rules={[{ required: true, message: '请输入用户名称' }]}
              >
                <Input
                  allowClear
                  disabled={this.state.btnLoading}
                  onChange={(e) => {
                    this.handleChangeForm('name', e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="登录名称"
                name="username"
                rules={[{ required: true, message: '请输入登录名称' }]}
              >
                <Input
                  allowClear
                  disabled={this.state.btnLoading}
                  onChange={(e) => {
                    this.handleChangeForm('username', e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password
                  allowClear
                  disabled={this.state.btnLoading}
                  onChange={(e) => {
                    this.handleChangeForm('password', e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="用户性别"
                name="sex"
                rules={[{ required: true, message: '请选择用户性别' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    this.handleChangeForm('sex', e);
                  }}
                >
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="是否启用"
                name="status"
                rules={[{ required: true, message: '请选择是否启用' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    this.handleChangeForm('status', e);
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="qq号码" name="QQ">
                <Input
                  allowClear
                  disabled={this.state.btnLoading}
                  onChange={(e) => {
                    this.handleChangeForm('QQ', e);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="角色"
                name="roleIds"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  onChange={(val) => {
                    this.handleChangeForm('roleIds', val);
                  }}
                >
                  {this.state.roleData.map((item: any) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.btnLoading}
                >
                  保存
                </Button>
              </Form.Item>
            </Form>
          ) : (
            ''
          )}
        </Drawer>
        <Modal
          width={350}
          title="确认删除"
          visible={this.state.deleteVisible}
          onCancel={() => {
            this.setState({ deleteVisible: false });
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                this.setState({ deleteVisible: false });
              }}
              disabled={this.state.delLoading}
            >
              关闭
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                this.handleDeleteUser();
              }}
              type="primary"
              loading={this.state.delLoading}
            >
              确定
            </Button>,
          ]}
        >
          <p className="text-center">删除后数据将无法找回</p>
          <p className="text-center">是否删除?</p>
        </Modal>
      </Fragment>
    );
  }
}