const webpack = require('webpack');
const { logInfo } = require('./utils');
const express = require('express');
const buildWebpackConfig = require('./webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function startDevServer(entryMDX) {
  const webpackConfig = buildWebpackConfig({ entryMDX, isDev: true });
  const webpackCompiler = webpack(webpackConfig);
  const app = express();

  logInfo(`starting webpack dev server`);

  app.use(webpackHotMiddleware(webpackCompiler, { heartbeat: 500 }));
  app.use(webpackDevMiddleware(webpackCompiler));

  app.listen(process.env.PORT || 3000);
}

module.exports = startDevServer;
