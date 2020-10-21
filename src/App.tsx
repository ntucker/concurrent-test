import React, { memo } from 'react';
import { Layout } from 'antd';

import NetworkBoundary from 'components/NetworkBoundary';
import MatchedRoute from 'routes/MatchedRoute';
import Nav from 'navigation/Nav';

const App = () => (
  <Layout>
    <Layout.Header className="header">
      <Nav />
    </Layout.Header>
    <Layout.Content
      style={{
        background: '#fff',
        padding: 0,
        margin: 0,
        minHeight: 280,
      }}
    >
      <NetworkBoundary>
        <MatchedRoute />
      </NetworkBoundary>
    </Layout.Content>
  </Layout>
);

export default memo(App);
