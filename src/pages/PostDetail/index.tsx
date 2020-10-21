import { useResource } from 'rest-hooks';
import { RouteChildrenProps } from 'react-router';
import { Link } from '@pojo-router/react-browser-pathname';
import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, PageHeader } from 'antd';
import React from 'react';

import itemRender from 'navigation/breadcrumbItemRenderer';
import { PostResource, UserResource } from 'resources';
import NetworkBoundary from 'components/NetworkBoundary';

import CommentList from './CommentList';

export type Props = { match: { id: string } };

export default function PostDetail({ match }: Props) {
  let id = 0;
  if (match && match.id) {
    id = Number.parseInt(match.id);
  }
  const post = useResource(PostResource.detail(), { id });
  const author = useResource(
    UserResource.detail(),
    post.userId ? { id: post.userId } : null,
  );
  const routes = [
    {
      path: '/',
      breadcrumbName: 'Post List',
    },
    {
      path: `/post/${id}`,
      breadcrumbName: post.title,
    },
  ];
  return (
    <PageHeader
      title={<Typography.Title level={2}>{post.title}</Typography.Title>}
      subTitle={author ? `by ${author.name}` : ''}
      breadcrumb={{ routes, itemRender }}
      extra={[
        <Link to={`/post/${post.id}/edit`} key="edit">
          <Button shape="circle" icon={<EditOutlined />} size="large" />
        </Link>,
      ]}
    >
      <Typography.Paragraph>{post.body}</Typography.Paragraph>
      <NetworkBoundary>
        <CommentList postId={id} />
      </NetworkBoundary>
    </PageHeader>
  );
}
