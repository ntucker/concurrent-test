import React from 'react';
import { useResource } from 'rest-hooks';

import { PostResource } from 'resources';

import AssetPrice from './AssetPrice';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        margin: '-8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <nav style={{ position: 'fixed', top: '18px' }}>Anansi</nav>
      <main>
        <p style={{ fontSize: '30px' }}>
          Congrats! You&apos;ve created concurrent-test!
        </p>
        <p style={{ marginTop: '20px', fontSize: '15px' }}>
          Check out the generated ReadMe for instructions on how to use this
          library
        </p>
        <p>
          <PostList />
        </p>
        <p style={{ marginTop: '20px', fontSize: '24px' }}>
          <AssetPrice symbol="BTC" />
        </p>
      </main>
    </div>
  );
}
function PostList() {
  const posts = useResource(PostResource.list(), {});
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
