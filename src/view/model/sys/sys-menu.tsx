import React, { Fragment } from 'react';
import { Table, Button, Drawer, Form, Input, Select } from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
import { RouteChildrenProps } from 'react-router-dom';
const { Column } = Table;
const { Option } = Select;
interface dataItem {
  id: number;
  text: string;
  type: string;
  hasChildren: boolean;
  hasParent: boolean;
  parentId: number;
  url: string | null;
  children: dataItem[] | null;
}
interface stateTypes {
  loading: boolean;
  tableData: Array<dataItem>;
  pagination: TablePaginationConfig;
  addVisible: boolean;
  currentRows: dataItem | null;
  btnLoading: boolean;
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
    text: '',
    type: '',
    url: '',
    icon: '',
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
    };
  }
  public getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    this.setState({
      loading: true,
    });
    axios
      .get('/menu', { params: { pageNum, pageSize } })
      .then((res: any) => {
        this.setState((state) => {
          state.pagination.total = res.total;
          state.pagination.current = pageNum;
          state.pagination.pageSize = pageSize;
          let tempData = res.data;
          this.handleDellTableData(tempData);
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
  public handleDellTableData = (data: dataItem[]) => {
    data.forEach((item) => {
      if (item.type === 'link') {
        item.children = null;
      }
      if (item.children && item.children.length) {
        this.handleDellTableData(item.children);
      }
    });
  };
  //=====================================提交表单失败====================================//
  public onFinish = (values: any) => {
    console.log('success', values);
    this.setState({
      btnLoading: true,
    });
    const data = { ...this.formInfo };
    data.parentId = this.state.currentRows?.id;
    axios
      .post('/menu', data)
      .then((res) => {
        this.setState({
          addVisible: false,
          currentRows: null,
        });
        this.getTableData();
      })
      .finally(() => {
        this.setState({
          btnLoading: false,
        });
      });
  };
  public onFinishFailed = (errorInfo: any) => {
    console.log('Failed', errorInfo);
  };
  //=====================================打开新增抽屉====================================//
  public handleOpenAddModal = (record: dataItem) => {
    this.setState({
      addVisible: true,
      currentRows: record,
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
  componentDidMount() {
    this.getTableData();
  }
  render() {
    return (
      <Fragment>
        <Button
          type="primary"
          className="mb-1"
          onClick={() => {
            this.props.history.push('/v/add-test-users');
          }}
        >
          新增菜单
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
            title="菜单名称"
            dataIndex="text"
            key="text"
            align="center"
          />
          <Column
            ellipsis={{ showTitle: true }}
            title="菜单类型"
            dataIndex="type"
            key="type"
            align="center"
          />
          <Column
            ellipsis
            title="操作"
            key="action"
            render={(text, record: dataItem, index) => {
              if (record.type === 'group') {
                return (
                  <Button
                    onClick={() => {
                      this.handleOpenAddModal(record);
                    }}
                    type="primary"
                    size="small"
                  >
                    新增
                  </Button>
                );
              }
            }}
            align="center"
          />
        </Table>
        <Drawer
          title="新增菜单"
          placement="right"
          width={500}
          visible={this.state.addVisible}
          onClose={() => {
            this.setState({ addVisible: false, currentRows: null });
          }}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{}}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item label="上级菜单">
              <Input
                value={
                  this.state.currentRows ? this.state.currentRows.text : ''
                }
                disabled
              />
            </Form.Item>
            <Form.Item
              label="菜单名称"
              name="text"
              rules={[{ required: true, message: '请输入菜单名称' }]}
            >
              <Input
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('text', e);
                }}
              />
            </Form.Item>
            <Form.Item
              label="菜单类型"
              name="type"
              rules={[{ required: true, message: '请选择菜单类型' }]}
            >
              <Select
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('type', e);
                }}
              >
                <Option value="group">group</Option>
                <Option value="link">link</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="菜单路径"
              name="url"
              rules={[{ required: true, message: '请输入菜单路径' }]}
            >
              <Input
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('url', e);
                }}
              />
            </Form.Item>
            <Form.Item
              label="菜单图标"
              name="icon"
              rules={[{ required: true, message: '请输入菜单图标' }]}
            >
              <Input
                allowClear
                disabled={this.state.btnLoading}
                onChange={(e) => {
                  this.handleChangeForm('icon', e);
                }}
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
