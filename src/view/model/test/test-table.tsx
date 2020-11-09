import React, { useEffect, useState } from 'react';
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
export default function TestTable() {
  let getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    setLoading(true);
    axios
      .get('/plans', { params: { pageNum, pageSize } })
      .then((res: any) => {
        pagination.total = res.total;
        pagination.current = pageNum;
        pagination.pageSize = pageSize;
        setPagination(pagination);
        setTableData(
          res.data.map((item: dataItem, index: number) =>
            Object.assign(item, { index: index + 1 })
          )
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const pageData: any = {
    current: 1,
    pageSize: 20,
    defaultCurrent: 1,
    defaultPageSize: 20,
    total: 0,
    showSizeChanger: true,
    showTitle: true,
    showQuickJumper: true,
    onChange: (page: number, pageSize: number) => {
      getTableData(page, pageSize);
    },
    onShowSizeChange: (page: number, pageSize: number) => {
      getTableData(page, pageSize);
    },
  };
  const [pagination, setPagination] = useState(pageData);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //=====================================表格数据====================================//
  return (
    <Table
      loading={loading}
      dataSource={tableData}
      bordered
      rowKey="id"
      pagination={pagination}
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
