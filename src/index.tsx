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
