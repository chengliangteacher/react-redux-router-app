import { Col } from 'antd';
import React, { ReactNode } from 'react';

interface propTypes {
  children: ReactNode;
}

export default function GgridCol(props: propTypes) {
  return (
    <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24} className="mb-1">
      {props.children}
    </Col>
  );
}
