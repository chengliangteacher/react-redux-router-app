import React from 'react';
import { connect } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { setCollapsed } from '../../../redux/action/layout';

class Header extends React.Component {
  render() {
    const { dispatch, collapsed } = this.props;
    return (
      <div className="header">
        <div className="header-left">
          <h3>react&react-redux&react-router-dom全家桶</h3>
          <div>
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => {
                  dispatch(setCollapsed());
                }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => {
                  dispatch(setCollapsed());
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ layout }) => {
  return {
    collapsed: layout.collapsed,
  };
})(Header);
