const { logInfo, logError } = require('./utils');
const buildViteConfig = require('./vite');
const vite = require('vite');

function startDevServer(entryMDX) {
  const viteConfig = buildViteConfig({ entryMDX, isDev: true });

  logInfo(`starting vite dev server`);

  vite
    .createServer({
      ...viteConfig,
      server: {
        port: process.env.PORT || 3000,
      },
      optimizeDeps: {
        include: [
          'prop-types',
          'hoist-non-react-statics',
          'react-is',
          'path-to-regexp',
          'react-dom',
        ],
      },
    })
    .then((server) => server.listen())
    .catch((err) => {
      logError('failed to start vite dev server');

      console.err(err);
    });
}

module.exports = startDevServer;
