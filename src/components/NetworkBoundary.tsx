import React, { memo, Suspense } from 'react';
import { NetworkErrorBoundary } from 'rest-hooks';

import Loading from './Loading';

function NetworkBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: NonNullable<React.ReactNode>;
}) {
  return (
    <Suspense fallback={fallback}>
      <NetworkErrorBoundary>{children}</NetworkErrorBoundary>
    </Suspense>
  );
}
NetworkBoundary.defaultProps = {
  fallback: <Loading />,
};
export default memo(NetworkBoundary);
