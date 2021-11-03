import React, { memo, Suspense } from 'react';
import { CacheProvider } from 'rest-hooks';

import NetworkBoundary from 'components/NetworkBoundary';
import RoutesProvider from 'routes/RoutesProvider';
import ErrorBoundary from 'components/ErrorBoundary';

function getDatafromDOM(index: number) {
  const element = document.querySelector(`#server-data-${index}`);
  return JSON.parse(element?.innerHTML || '{}');
}

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <CacheProvider>
        <RoutesProvider initialPath={window.location.pathname}>
          <ErrorBoundary>
            <NetworkBoundary>{children}</NetworkBoundary>
          </ErrorBoundary>
        </RoutesProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}
export default memo(RootProvider);
