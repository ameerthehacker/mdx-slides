const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

function buildWebpackConfig({ entryMDX, isDev = false }) {
  const cwd = process.cwd();
  const outputPath = path.join(cwd, 'dist');
  const entryFile = `
    import React from 'react';
    import ReactDOM  from 'react-dom';
    import MDXDocument from './${entryMDX}';
    import { MDXProvider } from "@mdx-js/react";

    ReactDOM.render(
      <MDXProvider>
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
        './index.js': entryFile,
      }),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
}

module.exports = buildWebpackConfig;
