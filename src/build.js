const { logError, logInfo } = require('./utils');
const buildWebpackConfig = require('./webpack');
const webpack = require('webpack');

function build(entryMDX) {
  const webpackConfig = buildWebpackConfig({ entryMDX, isDev: false });
  const webpackCompiler = webpack(webpackConfig);

  logInfo('generating a optimised production build...');

  webpackCompiler.run((err, stats) => {
    if (!err) {
      if (stats.hasErrors()) {
        logError('build failed');

        console.error(stats.toString({ colors: true }));
      } else {
        console.log(stats.toString({ colors: true }));
      }
    } else {
      logError(
        'something went wrong, this is most likely an issue from our side so please raise an issue'
      );
    }
  });
}

module.exports = build;
