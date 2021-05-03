const { logError, logInfo } = require('./utils');
const vite = require('vite');
const buildViteConfig = require('./vite');

function build(entryMDX) {
  logInfo('generating a optimised production build...');

  const viteConfig = buildViteConfig({ entryMDX, isDev: false });

  vite.build(viteConfig).catch((err) => {
    logError('build failed...');

    console.error(err);
  });
}

module.exports = build;
