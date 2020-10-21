import React, { lazy, memo, Suspense } from 'react';
import { memoize } from 'lodash';

import NetworkBoundary from './NetworkBoundary';

function lazyPage(
  pageName: string,
): React.ComponentType<any> & {
  preload: () => Promise<React.ComponentType>;
} {
  const importStatement = () =>
    import(/* webpackChunkName: '[request]' */ `pages/${pageName}`);
  const Page = lazy(importStatement);
  let PageComponent: any = (props: any) => (
    <NetworkBoundary>
      <Page {...props} />
    </NetworkBoundary>
  );
  PageComponent = memo(PageComponent);
  PageComponent.preload = importStatement;
  return PageComponent;
}
export default memoize(lazyPage);
