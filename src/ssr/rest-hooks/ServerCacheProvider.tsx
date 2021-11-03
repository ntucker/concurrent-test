import React from 'react';
import {
  CacheProvider,
  ExternalCacheProvider,
  PromiseifyMiddleware,
} from 'rest-hooks';
import { reducer, initialState } from '@rest-hooks/core';
import { createStore, applyMiddleware } from 'redux';

import ServerDataComponent from './ServerDataComponent';

type Props = {
  children: React.ReactNode;
};
export default function createPersistedCacheProvder(
  managers = CacheProvider.defaultProps.managers,
) {
  const store = {
    ...createStore(
      reducer,
      initialState,
      applyMiddleware(
        ...managers.map((manager) => manager.getMiddleware()),
        PromiseifyMiddleware,
      ),
    ),
    subscribe() {
      return () => {
        return;
      };
    },
  };
  const selector = (state: any) => state;
  return function ServerCacheProvider({ children }: Props) {
    return (
      <ExternalCacheProvider store={store} selector={selector}>
        <ServerDataComponent data={store.getState()} />
        {children}
      </ExternalCacheProvider>
    );
  };
}
