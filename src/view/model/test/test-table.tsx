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
            tableData: res.data,
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
          title="计划名称"
          dataIndex="name"
          key="name"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="食品类型"
          dataIndex="foodTypeName"
          key="foodTypeName"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划类型"
          dataIndex="planTypeName"
          key="planTypeName"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划年份"
          dataIndex="year"
          key="year"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="检验单位"
          dataIndex="detectionCompanyName"
          key="detectionCompanyName"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="计划截止时间"
          dataIndex="endDate"
          key="endDate"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="创建时间"
          dataIndex="createDate"
          key="createDate"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="预算总费用(万元)"
          dataIndex="total"
          key="total"
        />
        <Column
          ellipsis
          title="操作"
          key="action"
          render={() => {
            return <Button type="text"></Button>;
          }}
        />
      </Table>
    );
  }
}
