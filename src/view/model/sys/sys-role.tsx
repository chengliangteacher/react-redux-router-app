import React, { Fragment } from 'react';
import { Table, Button, Drawer, Form, Input, Tree } from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
import { RouteChildrenProps } from 'react-router-dom';
const { Column } = Table;
interface dataItem {
  id: number;
  title: string;
  note: string;
  create_time: string;
  update_time: string;
}
interface stateTypes {
  loading: boolean;
  tableData: Array<dataItem>;
  pagination: TablePaginationConfig;
  addVisible: boolean;
  currentRows: dataItem | null;
  btnLoading: boolean;
  menuData: any;
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
    title: '',
    note: '',
    menuIds: [],
  };
  constructor(props: RouteChildrenProps) {
    super(props);
    this.state = {
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
      tableData: [],
      loading: false,
      addVisible: false,
      currentRows: null,
      btnLoading: false,
      menuData: [],
    };
  }
  public getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    this.setState({
      loading: true,
    });
    axios
      .get('/role', { params: { pageNum, pageSize } })
      .then((res: any) => {
        this.setState((state) => {
          state.pagination.total = res.total;
          state.pagination.current = pageNum;
          state.pagination.pageSize = pageSize;
          return {
            tableData: res.data,
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
  //=====================================提交表单====================================//
  public onFinish = (values: any) => {
    this.setState({
      btnLoading: true,
    });
    const data = { ...this.formInfo };
    axios
      .post('/role', data)
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
  //=====================================打开新增抽屉====================================//
  public handleOpenAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };
  //=====================================form表单数据====================================//
  public handleChangeForm = (key: string, e: any) => {
    if (e.target) {
      this.formInfo[key] = e.target.value;
    } else {
      this.formInfo[key] = e;
    }
  };
  //=====================================获取menu====================================//
  public getMenuData = () => {
    axios.get('/menu').then((res) => {
      const data = res.data;
      this.addKeyToMenuData(data);
      this.setState({
        menuData: data,
      });
    });
  };
  public addKeyToMenuData = (data: any) => {
    data.forEach((item: any) => {
      item.key = item.id;
      item.title = item.text;
      if (item.hasChildren && item.children.length) {
        this.addKeyToMenuData(item.children);
      }
    });
  };
  //=====================================点击菜单树触发====================================//
  public handleTreeOnCheck = (checkedKeys: any, halfCheckedKeys: any) => {
    console.log('checkedKeys', checkedKeys);
    console.log('halfCheckedKeys', halfCheckedKeys);
    this.formInfo.menuIds = checkedKeys;
  };
  componentDidMount() {
    this.getTableData();
    this.getMenuData();
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
          新增角色
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
            title="角色名称"
            dataIndex="title"
            key="title"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="角色说明"
            dataIndex="note"
            key="note"
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
            render={(text, record: dataItem, index) => {
              return (
                <Button danger size="small">
                  删除
                </Button>
              );
            }}
            align="center"
          />
        </Table>
        <Drawer
          title="新增角色"
          placement="right"
          width={500}
          visible={this.state.addVisible}
          onClose={() => {
            this.setState({ addVisible: false, currentRows: null });
          }}
        >
          <Form
            {...layout}
            name="addrole"
            initialValues={{}}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="角色名称"
              name="title"
              rules={[{ required: true, message: '请输入角色名称' }]}
            >
              <Input
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('title', e);
                }}
              />
            </Form.Item>
            <Form.Item
              label="角色备注"
              name="note"
              rules={[{ required: true, message: '请输入角色备注' }]}
            >
              <Input
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('note', e);
                }}
              />
            </Form.Item>
            <Form.Item
              label="菜单"
              name="menuIds"
              // rules={[{ required: true, message: '请选择菜单' }]}
            >
              <Tree
                checkable
                treeData={this.state.menuData}
                onCheck={this.handleTreeOnCheck}
              />
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
        </Drawer>
      </Fragment>
    );
  }
}
