'use strict';

const verifier = require('../lib/verifier');
const logger = require('../lib/logger');

function parseArgs(argv) {
  let target = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--target' && argv[i + 1]) {
      target = argv[++i];
      continue;
    }
    if (argv[i].startsWith('-')) {
      throw new Error(`Unknown flag: ${argv[i]}`);
    }
  }
  return { target };
}

function printReport(result) {
  logger.line('');
  logger.line(`Verification: ${result.label}`);
  logger.line(`Root: ${result.root}`);
  if (result.error) {
    logger.error(result.error);
    return;
  }
  for (const c of result.checks) {
    const status = c.ok ? 'PASS' : 'FAIL';
    logger.line(`  [${status}] ${c.file}`);
  }
  logger.line('');
  if (result.ok) {
    logger.ok('All required checks passed.');
  } else {
    logger.error('Some checks failed.');
  }
}

function run(argv) {
  try {
    const opts = parseArgs(argv);
    let result;
    if (opts.target) {
      result = verifier.verifyTargetProject(opts.target);
      result.label = 'target project';
    } else {
      result = verifier.verifyThisPackage();
      result.label = 'this package (repository)';
    }
    printReport(result);
    return result.ok ? 0 : 1;
  } catch (e) {
    logger.error(e.message || String(e));
    return 1;
  }
}

module.exports = { run, parseArgs };
