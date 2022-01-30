import React from 'react';
import { Menu } from 'antd';

import {
  AppstoreOutlined,
  UserAddOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const NavigationBar = () => {
  return (
    <div style={{ width: 140 }}>
      <Menu
        className='myNavbar'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        theme='light'
        style={{ height: '100vh', backgroundColor: '#e6e6e6', margin: '0px' }}
        inlineCollapsed={true}
      >
        <Menu.Item key='1' icon={<UserAddOutlined />}>
          <a href='/newClient'>New Client</a>
        </Menu.Item>
        <Menu.Item key='2' icon={<AppstoreOutlined />}>
          <a href='/newInvoice'>Invoice</a>
        </Menu.Item>
        <Menu.Item key='3' icon={<ContainerOutlined />}>
          <a href='/clientList'>Client List</a>
        </Menu.Item>
        <Menu.Item
          key='8'
          icon={<LogoutOutlined />}
          // style={{ marginTop: '65vh' }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavigationBar;
