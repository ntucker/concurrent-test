import React, { memo } from 'react';
import { useBrowserPathname } from '@pojo-router/react-browser-pathname';
import PojoRouter from 'pojo-router';

import NotFound from 'components/NotFound';

import TransitionProvider from './Transitioner';
import { routes, namedPaths } from './routes';
import useRouteContext from './useRouteContext';

function RoutesProvider({ children }: { children: React.ReactChild }) {
  const currentPath = useBrowserPathname();
  const routeContext = useRouteContext();
  return (
    <PojoRouter
      namedPaths={namedPaths}
      routes={routes}
      currentPath={currentPath}
      notFound={{ component: NotFound }}
    >
      <TransitionProvider routeContext={routeContext}>
        {children}
      </TransitionProvider>
    </PojoRouter>
  );
}
export default memo(RoutesProvider);
