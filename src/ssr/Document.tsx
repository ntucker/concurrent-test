import React from 'react';

type Props = {
  children: React.ReactNode;
  assets: { href: string; as?: string; rel?: string }[];
};

export default function Document({ assets, children }: Props) {
  return (
    <html>
      <head></head>
      <body>
        <div id="root">{children}</div>
        {assets.map((asset, i) => (
          <link key={i} rel="preload" {...asset} />
        ))}
      </body>
    </html>
  );
}
