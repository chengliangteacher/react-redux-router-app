import React from 'react';
import { Table, Button } from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
const { Column } = Table;
interface dataItem {
  id: number;
  name: string;
  foodTypeName: string;
  planTypeName: string;
  year: number;
  detectionCompanyName: string;
  endDate: string;
  createDate: string;
  total: string | null;
  index?: number;
}
interface stateTypes {
  loading: boolean;
  tableData: Array<dataItem>;
  pagination: TablePaginationConfig;
}
export default class TestTable extends React.Component<any, stateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      tableData: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        defaultCurrent: 1,
        defaultPageSize: 20,
        total: 0,
        showSizeChanger: true,
        showTitle: true,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
          this.getTableData(page, pageSize);
        },
        onShowSizeChange: (page, pageSize) => {
          this.getTableData(page, pageSize);
        },
      },
    };
  }
  componentDidMount() {
    this.getTableData();
  }
  //=====================================表格数据====================================//
  public getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    this.setState({ loading: true });
    axios
      .get('/plans', { params: { pageNum, pageSize } })
      .then((res: any) => {
        this.setState((state) => {
          state.pagination.total = res.total;
          state.pagination.current = pageNum;
          state.pagination.pageSize = pageSize;
          return {
            tableData: res.data.map((item: dataItem, index: number) =>
              Object.assign(item, { index })
            ),
            pagination: state.pagination,
          };
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <Table
        loading={this.state.loading}
        dataSource={this.state.tableData}
        bordered
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
          title="计划名称"
          dataIndex="name"
          key="name"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="食品类型"
          dataIndex="foodTypeName"
          key="foodTypeName"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划类型"
          dataIndex="planTypeName"
          key="planTypeName"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划年份"
          dataIndex="year"
          key="year"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="检验单位"
          dataIndex="detectionCompanyName"
          key="detectionCompanyName"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划截止时间"
          dataIndex="endDate"
          key="endDate"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="创建时间"
          dataIndex="createDate"
          key="createDate"
          align="center"
        />
        <Column
          ellipsis
          title="操作"
          key="action"
          render={() => {
            return (
              <Button type="primary" size="small">
                提交
              </Button>
            );
          }}
          align="center"
        />
      </Table>
    );
  }
}
