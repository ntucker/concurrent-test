import React, { lazy, memo, Suspense } from 'react';
import { memoize } from 'lodash';

function lazyPage(
  pageName: string,
): React.ComponentType<any> & {
  preload: () => Promise<React.ComponentType>;
} {
  const importStatement = () =>
    import(/* webpackChunkName: '[request]' */ `pages/${pageName}`);
  let PageComponent: any = lazy(importStatement);
  PageComponent = memo(PageComponent);
  PageComponent.preload = importStatement;
  return PageComponent;
}
export default memoize(lazyPage);
