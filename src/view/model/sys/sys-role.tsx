import React, { Fragment } from 'react';
import { Table, Button, Drawer, Form, Input, Tree, Space, Modal } from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
import { RouteChildrenProps } from 'react-router-dom';
const { Column } = Table;
interface dataItem {
  id?: number;
  title: string;
  note: string;
  create_time?: string;
  update_time?: string;
  menuIds: number[];
}
interface stateTypes {
  loading: boolean;
  tableData: Array<dataItem>;
  pagination: TablePaginationConfig;
  addVisible: boolean;
  currentRows: dataItem | null;
  btnLoading: boolean;
  menuData: any;
  formInfo: any;
  delVisible: boolean;
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
  public delId: number | null | undefined = null;
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
      tableData: [], //-----------表格数据
      loading: false, //-----------表格loading
      addVisible: false, //-----------新增编辑弹框
      currentRows: null, //-----------当前行数据
      btnLoading: false, //-----------新增编辑按钮锁定及loading
      menuData: [], //-----------新增编辑表单中菜单数据
      formInfo: {
        title: '',
        note: '',
        menuIds: [],
      }, //-----------新增编辑表单
      delVisible: false, //-----------删除弹框
      delLoading: false, //-----------删除按钮loading
    };
    this.handleChangeForm.bind(this);
  }
  //=====================================列表数据====================================//
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
            tableData: res.data.map((item: any, index: any) =>
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
  //=====================================提交表单====================================//
  public onFinish = (values: any) => {
    this.handleDellFinallymenu(this.state.formInfo.menuIds).then(() => {
      this.setState({
        btnLoading: true,
      });
      let url = '/role';
      if (this.state.formInfo.id) {
        url = `/role/${this.state.formInfo.id}`;
      }
      const data = { ...this.state.formInfo };
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
    e.persist();
    this.setState((state) => {
      if (e.target) {
        state.formInfo[key] = e.target.value;
      } else {
        state.formInfo[key] = e;
      }
      return {
        formInfo: state.formInfo,
      };
    });
  };
  //=====================================获取menu====================================//
  public getMenuData = () => {
    axios.get('/menu/all').then((res) => {
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
  public selectKeys: any = {};
  //=====================================点击菜单树触发====================================//
  public handleTreeOnCheck = (checkedKeys: any) => {
    this.setState((state) => {
      state.formInfo.menuIds = checkedKeys;
      return {
        formInfo: state.formInfo,
      };
    });
  };
  //=====================================处理选中菜单数据====================================//
  public deelTreeKeys = (id: any, data: any) => {
    this.selectKeys[id] = id;
    data.forEach((item: any) => {
      if (item.id === id) {
        if (item.hasParent && item.parentId) {
          this.selectKeys[item.parentId] = item.parentId;
          this.deelTreeKeys(item.parentId, this.state.menuData);
        }
      } else {
        if (item.hasChildren && item.children.length) {
          this.deelTreeKeys(id, item.children);
        }
      }
    });
  };
  //=====================================编辑====================================//
  public handleEditRole = (val: dataItem) => {
    this.setState(
      {
        addVisible: true,
        formInfo: JSON.parse(JSON.stringify(val)),
      },
      () => {
        this.handleDellDdfaultChecks(this.state.menuData);
      }
    );
  };
  //=====================================处理menu值====================================//
  public handleDellFinallymenu = (data: number[]) => {
    return new Promise((resolve, reject) => {
      this.setState((state) => {
        this.selectKeys = {};
        state.formInfo.menuIds = [];
        data.forEach((item: number) => {
          this.deelTreeKeys(item, this.state.menuData);
        });
        for (let key in this.selectKeys) {
          state.formInfo.menuIds.push(Number(key));
        }
        resolve();
        return {
          formInfo: state.formInfo,
        };
      });
    });
  };
  //=====================================处理tree节点默认值====================================//
  public handleDellDdfaultChecks = (data: any) => {
    let menuIds = this.state.formInfo.menuIds;
    data.forEach((item: any) => {
      if (menuIds.some((item2: number) => item2 === item.id)) {
        if (item.hasChildren) {
          menuIds = menuIds.filter((item3: number) => item3 !== item.id);
        }
      } else {
        if (item.hasChildren && item.children.length) {
          this.handleDellDdfaultChecks(item.children);
        }
      }
    });
    this.setState((state) => {
      state.formInfo.menuIds = menuIds;
      return {
        formInfo: state.formInfo,
      };
    });
  };
  //=====================================删除====================================//
  public handleDeleteRole = () => {
    this.setState({
      delLoading: true,
    });
    axios
      .delete(`/role/${this.delId}`)
      .then((res) => {
        this.setState({
          delVisible: false,
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
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.handleEditRole(record);
                    }}
                    size="small"
                  >
                    编辑
                  </Button>
                  <Button
                    danger
                    size="small"
                    onClick={() => {
                      this.setState({ delVisible: true });
                      this.delId = record.id;
                    }}
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
          title={this.state.formInfo.id ? '编辑角色' : '新增角色'}
          placement="right"
          width={500}
          visible={this.state.addVisible}
          onClose={() => {
            this.setState({
              addVisible: false,
              currentRows: null,
              formInfo: { id: null, title: '', note: '', menuIds: [] },
            });
          }}
        >
          {this.state.addVisible ? (
            <Form
              {...layout}
              initialValues={this.state.formInfo}
              name="addrole"
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
                  checkedKeys={this.state.formInfo.menuIds}
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
          visible={this.state.delVisible}
          onCancel={() => {
            this.setState({ delVisible: false });
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                this.setState({ delVisible: false });
              }}
              disabled={this.state.delLoading}
            >
              关闭
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                this.handleDeleteRole();
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
