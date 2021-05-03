const path = require('path');
const mdx = require('vite-plugin-mdx').default;

function buildViteConfig({ entryMDX, isDev = false }) {
  const cwd = process.cwd();
  const outDir = path.join(cwd, 'dist');
  const entryMDXPath = path.resolve(cwd, entryMDX);

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
    clearScreen: false,
    configFile: false,
    plugins: [mdx()],
  };
}

module.exports = buildViteConfig;
