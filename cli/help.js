'use strict';

const logger = require('../lib/logger');

function run() {
  logger.line('living-strategy-agent — install and verify the Living Strategy Agent skill');
  logger.line('');
  logger.line('Commands:');
  logger.line('  help              Show this message');
  logger.line('  install           Copy skill files into a project (.claude/skills/living-strategy-agent/)');
  logger.line('  verify            Check that required skill files exist (this package or --target)');
  logger.line('  doctor            Diagnose common install/path issues');
  logger.line('  export            Write a clean bundle under dist/living-strategy-agent/');
  logger.line('');
  logger.line('Examples:');
  logger.line('  living-strategy-agent help');
  logger.line('  living-strategy-agent install');
  logger.line('  living-strategy-agent install --target /path/to/my-project');
  logger.line('  living-strategy-agent install --dry-run');
  logger.line('  living-strategy-agent verify');
  logger.line('  living-strategy-agent verify --target /path/to/my-project');
  logger.line('  living-strategy-agent doctor');
  logger.line('  living-strategy-agent export --out ./dist/living-strategy-agent');
  logger.line('');
  logger.line('GitHub via npx (needs network; requires npm that supports github: spec, e.g. npm 7+):');
  logger.line('  npx github:jeel-p/Living-Strategy-Agent help');
  logger.line('  npx github:jeel-p/Living-Strategy-Agent install --target .');
  logger.line('If that fails, clone the repo and run: node bin/living-strategy-agent.js help');
  logger.line('');
  logger.line('npm registry (after package is published):');
  logger.line('  npx living-strategy-agent help');
}

module.exports = { run };
