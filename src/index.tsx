import React from 'react';
import ReactDOM from 'react-dom';
import 'style/main.scss';

import RootProvider from './RootProvider';
import App from './App';

const content = (
  <RootProvider>
    <App />
  </RootProvider>
);
ReactDOM.unstable_createRoot(document.body /*, { hydrate: true }*/).render(
  content,
);
/*
const root = document.getElementById('root');
if (root) {
  ReactDOM.unstable_createRoot(root /*, { hydrate: true }*).render(content);
} else {
  throw new Error('Root element not found, cannot init app');
  document.body.innerHTML = 'Failure to load application';
}
*/
