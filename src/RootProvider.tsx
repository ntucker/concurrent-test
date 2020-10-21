import React, { memo, Suspense } from 'react';
import { CacheProvider } from 'rest-hooks';
import BrowserPathname from '@pojo-router/react-browser-pathname';

import NetworkBoundary from 'components/NetworkBoundary';
import RoutesProvider from 'routes/RoutesProvider';
import ErrorBoundary from 'components/ErrorBoundary';

function RootProvider({ children }: { children: React.ReactChild }) {
  return (
    <ErrorBoundary>
      <CacheProvider>
        <BrowserPathname>
          <RoutesProvider>
            <ErrorBoundary>
              <NetworkBoundary>{children}</NetworkBoundary>
            </ErrorBoundary>
          </RoutesProvider>
        </BrowserPathname>
      </CacheProvider>
    </ErrorBoundary>
  );
}
export default memo(RootProvider);
