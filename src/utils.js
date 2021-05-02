const pkg = require('../package.json');
const chalk = require('chalk');

function logError(message) {
  console.error(chalk.red(`${pkg.name}: ${message}`));
}

function logInfo(message) {
  console.log(chalk.blue(`${pkg.name}: ${message}`));
}

module.exports = { logError, logInfo };
