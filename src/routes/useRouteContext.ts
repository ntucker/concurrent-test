import { useFetchDispatcher } from '@rest-hooks/core';

export default function useRouteContext() {
  const dispatchFetch = useFetchDispatcher();
  return { dispatchFetch };
}
