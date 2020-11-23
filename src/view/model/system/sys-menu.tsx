import React, { Fragment } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Space, Modal } from 'antd';
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
  menuTitle: string;
  deleteVisible: boolean;
  delLoading: boolean;
  delId: undefined | null | number;
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
    id: null,
  };
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
      tableData: [], //-------表格数据
      loading: false, //-------加载圈圈
      addVisible: false, //--------新增抽屉变量
      currentRows: null, //--------当前行数据
      btnLoading: false, //--------提交表单loading
      menuTitle: '新增菜单',
      delId: null,
      delLoading: false,
      deleteVisible: false,
    };
  }
  public getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    this.setState({
      loading: true,
    });
    axios
      .get('/menu/all', { params: { pageNum, pageSize } })
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
  //=====================================提交表单--验证成功====================================//
  public onFinish = (values: any) => {
    this.setState({
      btnLoading: true,
    });
    let url = '/menu';
    const data = { ...this.formInfo };
    if (this.state.menuTitle === '新增菜单') {
      data.parentId = this.state.currentRows ? this.state.currentRows.id : 0;
    }
    if (this.state.menuTitle === '编辑菜单') {
      url = `/menu/${this.formInfo.id}`;
    }
    axios
      .post(url, data)
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
      menuTitle: '新增菜单',
    });
  };
  //=====================================编辑菜单====================================//
  public handleEditMenu = (record: dataItem) => {
    this.setState({
      addVisible: true,
      menuTitle: '编辑菜单',
    });
    this.formInfo = JSON.parse(JSON.stringify(record));
  };
  //=====================================form表单数据====================================//
  public handleChangeForm = (key: string, e: any) => {
    if (e.target) {
      this.formInfo[key] = e.target.value;
    } else {
      this.formInfo[key] = e;
    }
  };
  //=====================================删除====================================//
  public handleDeleteMenu = () => {
    this.setState({
      delLoading: true,
    });
    axios
      .delete(`/menu/${this.state.delId}`)
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
  }
  render() {
    return (
      <Fragment>
        <Button
          type="primary"
          className="mb-1"
          onClick={() => {
            this.setState({
              addVisible: true,
              menuTitle: '新增菜单',
            });
          }}
        >
          新增菜单
        </Button>
        <Table
          loading={this.state.loading}
          dataSource={this.state.tableData}
          rowKey="id"
          pagination={false}
        >
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
              return (
                <Space>
                  {record.type === 'group' ? (
                    <Button
                      onClick={() => {
                        this.handleOpenAddModal(record);
                      }}
                      type="primary"
                      size="small"
                    >
                      新增下级菜单
                    </Button>
                  ) : (
                    ''
                  )}
                  <Button
                    onClick={() => {
                      this.handleEditMenu(record);
                    }}
                    type="primary"
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
              );
            }}
            align="center"
          />
        </Table>
        <Drawer
          title={this.state.menuTitle}
          placement="right"
          width={500}
          visible={this.state.addVisible}
          onClose={() => {
            this.setState({
              addVisible: false,
              currentRows: null,
              menuTitle: '新增菜单',
            });
            this.formInfo = {
              text: '',
              type: '',
              url: '',
              icon: '',
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
              <Form.Item label="菜单路径" name="url">
                <Input
                  allowClear
                  disabled={this.state.btnLoading}
                  onChange={(e) => {
                    this.handleChangeForm('url', e);
                  }}
                />
              </Form.Item>
              <Form.Item label="菜单图标" name="icon">
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
            this.formInfo = {
              text: '',
              type: '',
              url: '',
              icon: '',
              id: null,
            };
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
                this.handleDeleteMenu();
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
