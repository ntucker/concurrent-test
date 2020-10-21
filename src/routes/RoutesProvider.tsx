import React, { memo } from 'react';
import { useBrowserPathname } from '@pojo-router/react-browser-pathname';
import PojoRouter from 'pojo-router';

import NotFound from 'components/NotFound';

import { routes, namedPaths } from './routes';

function RoutesProvider({ children }: { children: React.ReactChild }) {
  const currentPath = useBrowserPathname();
  return (
    <PojoRouter
      namedPaths={namedPaths}
      routes={routes}
      currentPath={currentPath}
      notFound={{ component: NotFound }}
    >
      {children}
    </PojoRouter>
  );
}
export default memo(RoutesProvider);
