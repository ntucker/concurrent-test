import { CacheProvider } from 'rest-hooks';

let SSRCache;

if (process.env.APP_ENV === 'browser') {
  SSRCache = CacheProvider;
} else {
  SSRCache = CacheProvider;
}

export default SSRCache;
