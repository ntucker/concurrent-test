import BrowserPathname from '@pojo-router/react-browser-pathname';
import { useMatchFinder } from 'pojo-router';
import React, { useCallback } from 'react';
import { createContext, unstable_useTransition as useTransition } from 'react';

export const PendingContext = createContext(false);

export default function TransitionBrowserProvider({
  children,
  timeoutMs,
  preloadMatch,
  initialPath,
}: {
  children: React.ReactNode;
  timeoutMs: number;
  preloadMatch: (match: any) => any;
  initialPath: string;
}) {
  const [startTransition, isPending] = useTransition({ timeoutMs });
  const allMatches = useMatchFinder();

  const transitionPathname = useCallback(
    (url: string, callback: () => void) => {
      // fetch as transition/render
      const match = allMatches(url)[0];
      if (match) {
        preloadMatch(match);
      }

      // transition begins
      startTransition(callback);
    },
    [allMatches, preloadMatch],
  );
  return (
    <BrowserPathname initialPath={initialPath} onChange={transitionPathname}>
      <PendingContext.Provider value={isPending}>
        {children}
      </PendingContext.Provider>
    </BrowserPathname>
  );
}
TransitionBrowserProvider.defaultProps = {
  timeoutMs: 5000,
};
