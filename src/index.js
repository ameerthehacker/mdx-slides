const webpack = require('webpack');
const path = require('path');
const { logError, logInfo } = require('./utils');

function generateWebpackConfig(entryMDX) {
  const cwd = process.cwd();
  const entryPath = path.join(cwd, entryMDX);
  const outputPath = path.join(cwd, 'dist');

  return {
    entry: entryPath,
    output: {
      path: outputPath,
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
              },
            },
            {
              loader: '@mdx-js/loader',
              options: {
                remarkPlugins: [],
              },
            },
          ],
        },
      ],
    },
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
