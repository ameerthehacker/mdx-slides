const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

function buildWebpackConfig({ entryMDX, isDev = false }) {
  const cwd = process.cwd();
  const outputPath = path.join(cwd, 'dist');
  const entryFilePath = path.join(__dirname, 'entry.js');
  const entryMDXPath = path.resolve(cwd, entryMDX);
  const htmlTemplatePath = path.join(__dirname, 'index.html');

  return {
    entry: [
      entryFilePath,
      isDev && 'webpack-hot-middleware/client?reload=true&overlay=true',
    ].filter(Boolean),
    output: {
      path: outputPath,
      clean: true,
    },
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',
    resolve: {
      alias: {
        '@entry-mdx': entryMDXPath,
      },
    },
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          exclude: /node_modules\/(?!(mdx-slides)\/).*/,
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
          exclude: /node_modules\/(?!(mdx-slides)\/).*/,
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
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
}

module.exports = buildWebpackConfig;
