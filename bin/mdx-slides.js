#!/usr/bin/env node
const minimist = require('minimist');
const { startDevServer, build } = require('../src');
const { logError } = require('../src/utils');
const pkg = require('../package.json');

const argv = minimist(process.argv.slice(2));
const args = argv._;

if (argv.version) {
  console.log(pkg.version);

  return;
}

if (args.length === 1) {
  const [entryMDX] = args;

  startDevServer(entryMDX);
} else if (args.length === 2) {
  const [command, entryMDX] = args;

  switch (command) {
    case 'build': {
      build(entryMDX);

      break;
    }
    default: {
      logError(`unknown command ${command}`);
    }
  }
} else {
  logError('invalid number of arguments provided');
}
