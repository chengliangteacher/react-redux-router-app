import React from 'react';
import { Table } from 'antd';
const { Column } = Table;
export default class Gtable extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <Table dataSource={[]}>
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
      </Table>
    );
  }
}
