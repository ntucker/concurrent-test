import React, { memo, Suspense } from 'react';
import { NetworkErrorBoundary } from 'rest-hooks';

import Loading from './Loading';

function NetworkBoundary({ children }: { children: React.ReactChild }) {
  return (
    <Suspense fallback={<Loading />}>
      <NetworkErrorBoundary>{children}</NetworkErrorBoundary>
    </Suspense>
  );
}
export default memo(NetworkBoundary);
