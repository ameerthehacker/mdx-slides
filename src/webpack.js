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
  const componentsPath = path.join(__dirname, './components');

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
        '@components': componentsPath,
        '@entry-mdx': entryMDXPath,
      },
    },
    module: {
      rules: [
        {
          test: /\.mdx?$/,
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
