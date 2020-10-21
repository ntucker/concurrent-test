import React, { memo, useCallback } from 'react';
import { useBrowserPathname } from '@pojo-router/react-browser-pathname';
import PojoRouter from 'pojo-router';

import NotFound from 'components/NotFound';

import TransitionProvider from './lib/TransitionProvider';
import { routes, namedPaths } from './routes';
import useRouteContext from './useRouteContext';

function RoutesProvider({ children }: { children: React.ReactNode }) {
  const currentPath = useBrowserPathname();
  const routeContext = useRouteContext();
  const preloadMatch = useCallback(
    (match: any) => {
      if (match.component) match.component?.preload?.();
      if (match.resolveData) match.resolveData(routeContext, match);
    },
    [routeContext],
  );
  return (
    <PojoRouter
      namedPaths={namedPaths}
      routes={routes}
      currentPath={currentPath}
      notFound={{ component: NotFound }}
    >
      <TransitionProvider preloadMatch={preloadMatch}>
        {children}
      </TransitionProvider>
    </PojoRouter>
  );
}
export default memo(RoutesProvider);
