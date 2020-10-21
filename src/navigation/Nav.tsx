import { Menu } from 'antd';
import React from 'react';
import { useContext } from 'react';

import Loading from 'components/Loading';
import { PendingContext } from 'routes/lib/Transitioner';

export default function Nav() {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">Concurrent Mode</Menu.Item>
      <Menu.Item key="2">
        {useContext(PendingContext) ? <Loading /> : null}
      </Menu.Item>
    </Menu>
  );
}
