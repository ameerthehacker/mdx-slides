const webpack = require('webpack');
const path = require('path');
const { logError, logInfo } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const cwd = process.cwd();
const outputPath = path.join(cwd, 'dist');

function generateWebpackConfig(entryMDX) {
  const entryFile = `
    import React from 'react';
    import ReactDOM  from 'react-dom';
    import MDXDocument from './${entryMDX}';
    import { MDXProvider } from "@mdx-js/react";

    ReactDOM.render(
      <MDXProvider components={{
        h1: (props) => <h1 {...props} style={{ color: 'red' }} />
      }}>
        <MDXDocument />
      </MDXProvider>
      , document.getElementById('root')
    );

    if (module && module.hot) {
      module.hot.accept()
    }
  `;
  const entryPath = path.join(cwd, './index.js');
  const htmlTemplatePath = path.join(__dirname, 'template.html');

  return {
    entry: [
      entryPath,
      'webpack-hot-middleware/client?reload=true&overlay=true',
    ],
    output: {
      path: outputPath,
      clean: true,
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/preset-react'],
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
            {
              loader: '@mdx-js/loader',
            },
          ],
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/preset-react'],
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hello',
        template: htmlTemplatePath,
      }),
      new NodePolyfillPlugin(),
      new VirtualModulesPlugin({
        './index.js': entryFile,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  };
}

function startDevServer(entryMDXSlide) {
  const webpackConfig = generateWebpackConfig(entryMDXSlide);
  const webpackCompiler = webpack(webpackConfig);
  const app = express();

  logInfo(`starting dev server`);

  app.use(webpackHotMiddleware(webpackCompiler, { heartbeat: 500 }));
  app.use(webpackDevMiddleware(webpackCompiler));

  app.listen(process.env.PORT || 3000);
}

function build(entryMDXSlide) {
  const webpackConfig = generateWebpackConfig(entryMDXSlide);
  const webpackCompiler = webpack(webpackConfig);

  logInfo('generating a production build...');

  webpackCompiler.run((err, stats) => {
    if (!err) {
      if (stats.hasErrors()) {
        logError('build failed');

        console.error(stats.toString());
      }
    }
  });
}

module.exports = { startDevServer, build };
