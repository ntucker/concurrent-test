import { useFetchDispatcher } from '@rest-hooks/core';
import { useMemo } from 'react';

export default function useRouteContext() {
  const dispatchFetch = useFetchDispatcher(true);
  return useMemo(() => ({ dispatchFetch }), [dispatchFetch]);
}
