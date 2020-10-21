import { UpdateContext } from '@pojo-router/react-browser-pathname';
import { useMatchFinder } from 'pojo-router';
import React, { useCallback } from 'react';
import {
  createContext,
  useContext,
  unstable_useTransition as useTransition,
} from 'react';

export const PendingContext = createContext(false);

export default function TransitionProvider({
  children,
  timeoutMs,
  preloadMatch,
}: {
  children: React.ReactChild;
  timeoutMs: number;
  preloadMatch: (match: any) => any;
}) {
  const [startTransition, isPending] = useTransition({ timeoutMs });
  const allMatches = useMatchFinder();

  // known as 'context interceptor pattern' - we are intercepting context, injecting behavior, then setting it
  const setCurrentBrowserPathname = useContext(UpdateContext);
  const transitionPathname = useCallback(() => {
    // fetch as transition/render
    const match = allMatches(window.location.pathname)[0];
    if (match) {
      preloadMatch(match);
    }

    // transition begins
    startTransition(setCurrentBrowserPathname);
  }, [allMatches, setCurrentBrowserPathname, preloadMatch]);
  return (
    <UpdateContext.Provider value={transitionPathname}>
      <PendingContext.Provider value={isPending}>
        {children}
      </PendingContext.Provider>
    </UpdateContext.Provider>
  );
}
TransitionProvider.defaultProps = {
  timeoutMs: 5000,
};
