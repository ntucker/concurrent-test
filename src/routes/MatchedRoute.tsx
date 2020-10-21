import React from 'react';
import { useCurrentMatch } from 'pojo-router';

export default function MatchedRoute() {
  const match = useCurrentMatch();
  return match ? <match.component /> : '';
}
