import React from 'react';
import ReactDOM from 'react-dom/server';
import type { Request, Response } from 'express';

import Document from './Document';

export type Asset = { href: string; as?: string; rel?: string };
export type Generater = (
  req: any,
) => {
  Provider: React.ComponentType<{ children: React.ReactNode }>;
  preloadMatch: () => Promise<Asset[]>;
};

export default function generateMiddleware(
  generateProvider: Generater,
  Application: React.ComponentType,
) {
  return async function SSRMiddleware(req: Request, res: Response) {
    const { Provider, preloadMatch } = generateProvider(req);

    try {
      const rendered = ReactDOM.renderToString(
        <Provider>
          <Application />
        </Provider>,
      );
    } catch (e) {
      console.warn('Rendering first pass threw error');

      console.error(e);
    }

    try {
      // preload can also send down assets to be primed like js/css bundles, etc
      // these can be pushed via http/2 server push or embeded via link
      const assetsToPush = await preloadMatch();

      const rendered = ReactDOM.renderToString(
        <Document assets={assetsToPush}>
          <Provider>
            <Application />
          </Provider>
        </Document>,
      );

      res.send(rendered);
    } catch (e) {
      console.warn('error during rendering');

      console.error(e);

      res.status(500);

      // TODO(actual error page)
      res.send('uh-oh');
    }
  };
}
