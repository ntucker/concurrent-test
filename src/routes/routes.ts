import lazyPage from 'routes/lib/lazyPage';
import { PostResource, UserResource } from 'resources';

import useRouteContext from './useRouteContext';

type RouteProps = ReturnType<typeof useRouteContext>;

export const namedPaths = {
  posts: '',
};
export const routes = [
  [
    'posts',
    {
      component: lazyPage('Posts'),
      resolveData: async ({ dispatchFetch }: RouteProps) => {
        const posts = await dispatchFetch(PostResource.list(), {}, undefined);
        await Promise.all(
          posts.map((post) =>
            dispatchFetch(
              UserResource.detail(),
              {
                id: post.userId,
              },
              undefined,
            ),
          ),
        );
      },
    },
  ],
  [
    '/post/:id',
    {
      component: lazyPage('PostDetail'),
      resolveData: async (
        { dispatchFetch }: RouteProps,
        match: { id: string },
      ) => {
        if (match) {
          const post = await dispatchFetch(
            PostResource.detail(),
            { id: match.id },
            undefined,
          );
          await dispatchFetch(
            UserResource.detail(),
            post.userId ? { id: post.userId } : (null as any),
            undefined,
          );
        }
      },
    },
  ],
] as const;
