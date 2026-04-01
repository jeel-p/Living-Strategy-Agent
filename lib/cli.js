'use strict';

const help = require('../cli/help.js');
const install = require('../cli/install.js');
const verify = require('../cli/verify.js');
const doctor = require('../cli/doctor.js');
const exportCmd = require('../cli/export.js');

async function run(argv) {
  const cmd = (argv[0] || 'help').toLowerCase();
  const rest = argv.slice(1);

  const commands = {
    help: () => Promise.resolve(help.run()),
    '-h': () => Promise.resolve(help.run()),
    '--help': () => Promise.resolve(help.run()),
    install: () => install.run(rest),
    verify: () => Promise.resolve(verify.run(rest)),
    doctor: () => Promise.resolve(doctor.run(rest)),
    export: () => Promise.resolve(exportCmd.run(rest)),
  };

  const fn = commands[cmd];
  if (!fn) {
    const logger = require('./logger');
    logger.error(`Unknown command: ${cmd}`);
    logger.info('Run: living-strategy-agent help');
    return 1;
  }

  const code = await fn();
  return typeof code === 'number' ? code : 0;
}

function main() {
  run(process.argv.slice(2))
    .then((code) => process.exit(code))
    .catch((e) => {
      const logger = require('./logger');
      logger.error(e.message || String(e));
      process.exit(1);
    });
}

module.exports = { run, main };
