import type { Request } from 'express';
import React, { memo, Suspense } from 'react';
import { CacheProvider } from 'rest-hooks';
import BrowserPathname from '@pojo-router/react-browser-pathname';

import NetworkBoundary from 'components/NetworkBoundary';
import RoutesProvider from 'routes/RoutesProvider';
import ErrorBoundary from 'components/ErrorBoundary';

import App from './App';
import generateMiddleware from './ssr/middleware';

const middleware = generateMiddleware((req: Request) => {
  function RootProvider({ children }: { children: React.ReactNode }) {
    return (
      <ErrorBoundary>
        <CacheProvider>
          <RoutesProvider initialPath={req.path}>
            <ErrorBoundary>
              <NetworkBoundary>{children}</NetworkBoundary>
            </ErrorBoundary>
          </RoutesProvider>
        </CacheProvider>
      </ErrorBoundary>
    );
  }
  const Provider = memo(RootProvider);
  function preloadMatch() {
    const path = req.path;
    return [] as any;
  }
  return {
    Provider,
    preloadMatch,
  };
}, App);

export default middleware;
