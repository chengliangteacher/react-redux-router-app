import React, { useEffect, useState, Fragment } from 'react';
import { Table, Button } from 'antd';
import axios from '../../../api';
import { TablePaginationConfig } from 'antd/lib/table';
import { RouteChildrenProps } from 'react-router-dom';
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
export default function TestTable(props: RouteChildrenProps) {
  let getTableData = (pageNum: number = 1, pageSize: number = 20): void => {
    setLoading(true);
    axios
      .get('/users', { params: { pageNum, pageSize } })
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
    <Fragment>
      <Button
        type="primary"
        className="mb-1"
        onClick={() => {
          props.history.push('/v/add-test-users');
        }}
      >
        新增用户
      </Button>
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
          title="用户名称"
          dataIndex="user_name"
          key="user_name"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="电话"
          dataIndex="tele_phone"
          key="tele_phone"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="机构名称"
          dataIndex="orgName"
          key="orgName"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="登录名称"
          dataIndex="login_name"
          key="login_name"
          align="center"
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="是否锁定"
          dataIndex="lock_state"
          key="lock_state"
          align="center"
          render={(text) => {
            return <span>{text ? '是' : '否'}</span>;
          }}
        />
        <Column
          ellipsis={{ showTitle: true }}
          title="创建时间"
          dataIndex="create_time"
          key="create_time"
          align="center"
        />
        <Column
          ellipsis
          title="操作"
          key="action"
          render={() => {
            return (
              <Button danger size="small">
                删除
              </Button>
            );
          }}
          align="center"
        />
      </Table>
    </Fragment>
  );
}
