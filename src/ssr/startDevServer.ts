import { promisify} from 'util';
import webpack, { MultiCompiler} from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';

const webpackConfig = require('../../webpack.config');

const entrypoint = process.argv[2];

if (!entrypoint) {
  console.log(`Usage: ${process.argv[0]} <entrypoint>`);
  process.exit(-1)
}



const watcher = compiler.watch({}, (err, { states }) => {
  if (err) {
    console.error(err);
    process.exit(-1)
  }
  if (server) {
    loader.succeed('Webpack bundle updated')
    return
  }
  try {
    initializeApp(stats):

  } catch(e) {
    console.error(e)
  }
})
