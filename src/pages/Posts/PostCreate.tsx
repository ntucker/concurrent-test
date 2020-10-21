import { Typography, PageHeader } from 'antd';
import { useFetcher } from 'rest-hooks';
import React from 'react';
import { usePushPath } from '@pojo-router/react-browser-pathname';

import itemRender from 'navigation/breadcrumbItemRenderer';
import { PostResource } from 'resources';

import PostForm from './PostForm';

export default function PostCreate() {
  const create = useFetcher(PostResource.create());
  const pushPath = usePushPath();
  const routes = [
    {
      path: '/posts',
      breadcrumbName: 'Post List',
    },
    {
      path: `/posts/new`,
      breadcrumbName: 'New Post',
    },
  ];
  return (
    <PageHeader
      breadcrumb={{ routes, itemRender }}
      title={<Typography.Title level={2}>New Post</Typography.Title>}
    >
      <PostForm
        initialValues={{ userId: 1 }}
        onSubmit={async (data: object) => {
          const res = await create({}, data, [
            [
              PostResource.list(),
              {},
              (postID: string, postList: string[] | undefined) => [
                postID,
                ...(postList || []),
              ],
            ],
          ]);
          pushPath(`/post/${res.id}`);
        }}
      />
    </PageHeader>
  );
}
