const path = require('path');
const mdx = require('vite-plugin-mdx').default;
const remarkEmojiPlugin = require('remark-emoji');

function buildViteConfig({ entryMDX, isDev = false }) {
  const cwd = process.cwd();
  const outDir = path.join(cwd, 'dist');
  const entryMDXPath = path.resolve(cwd, entryMDX);
  const prebundleDeps = [
    'react',
    'react-dom',
    '@mdx-js/react',
    'react-router-dom',
    '@rooks/use-key',
    'theme-ui',
  ];

  return {
    mode: isDev ? 'development' : 'production',
    root: __dirname,
    build: {
      outDir,
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@entry-mdx': entryMDXPath,
      },
    },
    optimizeDeps: {
      include: prebundleDeps,
    },
    clearScreen: false,
    configFile: false,
    plugins: [
      mdx({
        remarkPlugins: [remarkEmojiPlugin],
      }),
    ],
  };
}

module.exports = buildViteConfig;
