const pkg = require('../package.json');
const chalk = require('chalk');

function logError(message) {
  console.error(chalk.red(`${pkg.name}: ${message}`));
}

module.exports = { logError };
