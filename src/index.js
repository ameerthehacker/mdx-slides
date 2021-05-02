const webpack = require('webpack');
const path = require('path');
const { logError, logInfo } = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');

function generateWebpackConfig(entryMDX) {
  const entryFile = `
    import React from 'react';
    import ReactDOM  from 'react-dom';
    import MDXDocument from './${entryMDX}';

    ReactDOM.render(<MDXDocument />, document.getElementById('root'));
  `;
  const cwd = process.cwd();
  const entryPath = path.join(cwd, './index.js');
  const outputPath = path.join(cwd, 'dist');
  const htmlTemplatePath = path.join(__dirname, 'template.html');

  return {
    entry: entryPath,
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
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/preset-react'],
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
    ],
  };
}

function startDevServer(mdxSlide) {
  console.log(`Staring dev server for slide ${mdxSlide}`);
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
