import React, { memo, useCallback } from 'react';
import { useBrowserPathname } from '@pojo-router/react-browser-pathname';
import PojoRouter from 'pojo-router';

import NotFound from 'components/NotFound';

import TransitionProvider from './lib/TransitionProvider';
import { routes, namedPaths } from './routes';
import usePageContext from './usePageContext';

function RoutesProvider({
  children,
  initialPath,
}: {
  children: React.ReactNode;
  initialPath: string;
}) {
  const pageContext = usePageContext();
  const preloadMatch = useCallback(
    (match: any) => {
      if (match.component) match.component?.preload?.();
      if (match.resolveData) match.resolveData(pageContext, match);
    },
    [pageContext],
  );
  return (
    <TransitionProvider preloadMatch={preloadMatch} initialPath={initialPath}>
      <PojoBrowserBridge>{children}</PojoBrowserBridge>
    </TransitionProvider>
  );
}

function PojoBrowserBridge({ children }: { children: React.ReactNode }) {
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
