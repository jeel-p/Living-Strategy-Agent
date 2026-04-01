'use strict';

const path = require('path');
const paths = require('../lib/paths');
const verifier = require('../lib/verifier');
const logger = require('../lib/logger');

function parseArgs(argv) {
  let target = process.cwd();
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

function run(argv) {
  try {
    const opts = parseArgs(argv);
    const packageRoot = paths.getPackageRoot();
    const skillSrc = paths.getSkillSourceDir(packageRoot);
    const cwd = path.resolve(opts.target);

    logger.line('living-strategy-agent doctor');
    logger.line('');

    const node = process.version;
    const major = parseInt(node.slice(1).split('.')[0], 10);
    if (major < 16) {
      logger.warn(`Node ${node} — Node 16.7+ recommended (fs.cpSync).`);
    } else {
      logger.ok(`Node ${node}`);
    }

    if (!paths.pathExists(packageRoot)) {
      logger.error(`Package root not found: ${packageRoot}`);
      return 1;
    }
    logger.ok(`CLI package root: ${packageRoot}`);

    if (!paths.pathExists(skillSrc) || !paths.isDirectory(skillSrc)) {
      logger.error(`Skill source directory missing: ${skillSrc}`);
      logger.info('Fix: run from a full clone of Living-Strategy-Agent; reinstall npm package.');
      return 1;
    }
    logger.ok(`Skill source present: ${skillSrc}`);

    logger.line('');
    logger.line(`Current working directory (for install target): ${cwd}`);
    if (!paths.pathExists(cwd)) {
      logger.error('Target path does not exist.');
      return 1;
    }

    const destSkill = paths.getSkillDestDir(cwd);
    if (paths.pathExists(destSkill)) {
      const v = verifier.verifyTargetProject(cwd);
      if (v.ok) {
        logger.ok(`Install looks complete under: ${destSkill}`);
      } else {
        logger.warn('Skill folder exists but verification failed (missing files).');
        logger.info('Run: living-strategy-agent verify --target ' + JSON.stringify(cwd));
      }
    } else {
      logger.info(`No skill installed at ${destSkill} (expected if you have not run install here).`);
    }

    logger.line('');
    logger.ok('Doctor finished.');
    return 0;
  } catch (e) {
    logger.error(e.message || String(e));
    return 1;
  }
}

module.exports = { run, parseArgs };
