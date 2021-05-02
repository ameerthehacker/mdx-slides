const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const fs = require('fs');

function buildWebpackConfig({ entryMDX, isDev = false }) {
  const cwd = process.cwd();
  const outputPath = path.join(cwd, 'dist');
  const entryFilePath = path.join(__dirname, 'entry.js');
  const entryMDXPath = path.relative(cwd, entryMDX);
  const entryFileContent = fs
    .readFileSync(entryFilePath, { encoding: 'utf-8' })
    .replace(/{entryMDX}/g, `./${entryMDXPath}`);
  const entryFile = './index.js';
  const htmlTemplatePath = path.join(__dirname, 'index.html');

  return {
    entry: [
      entryFile,
      isDev && 'webpack-hot-middleware/client?reload=true&overlay=true',
    ].filter(Boolean),
    output: {
      path: outputPath,
      clean: true,
    },
    mode: isDev ? 'development' : 'production',
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
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
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
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'MDX Slides',
        template: htmlTemplatePath,
      }),
      new NodePolyfillPlugin(),
      new VirtualModulesPlugin({
        [entryFile]: entryFileContent,
      }),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
}

module.exports = buildWebpackConfig;
